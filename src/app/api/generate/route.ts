import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* Rate limiting */
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  if (rateLimit.size > 1000) {
    for (const [key, val] of rateLimit) {
      if (now > val.resetTime) rateLimit.delete(key);
    }
  }
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

/* Security */
const ALLOWED_ORIGINS = [
  "https://flashcardmaker.app",
  "https://www.flashcardmaker.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

function checkOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  if (!origin && !referer) return true;
  if (origin && ALLOWED_ORIGINS.includes(origin)) return true;
  if (referer) {
    for (const a of ALLOWED_ORIGINS) { if (referer.startsWith(a)) return true; }
  }
  return false;
}

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") || "unknown";
}

function sanitize(text: string, max: number): string {
  return text.slice(0, max).replace(/[<>]/g, "").trim();
}

/* POST /api/generate */
export async function POST(request: NextRequest) {
  try {
    if (!checkOrigin(request)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const { topic, text, count } = body;

    if (!topic && !text) {
      return NextResponse.json({ error: "Please provide a topic or text." }, { status: 400 });
    }

    const safeTopic = topic ? sanitize(topic, 200) : "";
    const safeText = text ? sanitize(text, 5000) : "";
    const cardCount = Math.min(Math.max(Number(count) || 10, 3), 20);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Service temporarily unavailable." }, { status: 503 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = safeText
      ? `Generate exactly ${cardCount} study flashcards from the following text. Each flashcard should have a clear question on the front and a concise, accurate answer on the back.

Text: "${safeText}"

${safeTopic ? `Focus on: ${safeTopic}` : ""}

Return ONLY a valid JSON array with no markdown, no code blocks, no extra text. Format:
[{"front":"question here","back":"answer here"}]`
      : `Generate exactly ${cardCount} study flashcards about "${safeTopic}". Cover the most important concepts, definitions, and facts that a student should know. Each flashcard should have a clear question on the front and a concise, accurate answer on the back.

Return ONLY a valid JSON array with no markdown, no code blocks, no extra text. Format:
[{"front":"question here","back":"answer here"}]`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from response
    let cards;
    try {
      // Try direct parse
      cards = JSON.parse(responseText);
    } catch {
      // Try extracting JSON from markdown code block
      const match = responseText.match(/\[[\s\S]*\]/);
      if (match) {
        cards = JSON.parse(match[0]);
      } else {
        return NextResponse.json({ error: "Failed to generate flashcards. Please try again." }, { status: 500 });
      }
    }

    // Validate structure
    if (!Array.isArray(cards) || cards.length === 0) {
      return NextResponse.json({ error: "Failed to generate flashcards. Please try again." }, { status: 500 });
    }

    const validCards = cards
      .filter((c: { front?: string; back?: string }) => c.front && c.back)
      .map((c: { front: string; back: string }) => ({
        front: c.front.slice(0, 500),
        back: c.back.slice(0, 1000),
      }));

    return NextResponse.json({ cards: validCards });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to generate flashcards. Please try again." }, { status: 500 });
  }
}
