import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flashcardmaker.app"),
  title: {
    default: "Free AI Flashcard Maker - Generate Study Flashcards Instantly",
    template: "%s | Free AI Flashcard Maker",
  },
  description:
    "Free AI Flashcard Maker generates study flashcards from any topic, text, or notes instantly. Create, flip, and study custom flashcards powered by AI. No sign-up required.",
  keywords: [
    "free flashcard maker",
    "ai flashcard generator",
    "flashcard maker online",
    "make flashcards free",
    "study flashcards",
    "flashcard app free",
    "create flashcards online",
    "ai study cards",
    "flashcard generator from text",
    "free flashcard maker no sign up",
    "quizlet alternative free",
    "anki alternative online",
    "study tool free",
    "exam flashcards",
  ],
  openGraph: {
    title: "Free AI Flashcard Maker - Generate Study Flashcards Instantly",
    description:
      "Type any topic and get AI-generated flashcards in seconds. Study, flip, and learn — completely free.",
    type: "website",
    url: "https://flashcardmaker.app",
    siteName: "Free AI Flashcard Maker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Flashcard Maker - Generate Study Flashcards Instantly",
    description:
      "Type any topic and get AI-generated flashcards in seconds. Study, flip, and learn — completely free.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://flashcardmaker.app" },
  icons: { icon: "/logo.svg", apple: "/logo.svg" },
  verification: {
    google: "8bAP1h-cQ1uuXxgt_uzSpwF01Rnl6484P9v-HL9eZw4",
  },
  other: { "mobile-web-app-capable": "yes" },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Free AI Flashcard Maker",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              description:
                "Free AI-powered flashcard generator that creates study cards from any topic or text instantly.",
              url: "https://flashcardmaker.app",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              creator: { "@type": "Organization", name: "Flashcard Maker" },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is Free AI Flashcard Maker really free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, completely free. Generate unlimited flashcards without any hidden fees, subscriptions, or sign-up requirements.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does the AI generate flashcards?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our AI analyzes your topic or text and automatically creates question-answer pairs that cover the key concepts, making it easy to study and retain information.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use it on my phone?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Free AI Flashcard Maker works on any device with a web browser — smartphones, tablets, and desktops. No app download required.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What subjects can I create flashcards for?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Any subject — science, history, languages, math, medicine, law, programming, and more. The AI adapts to any topic you provide.",
                  },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
      <GoogleAnalytics gaId="G-PLACEHOLDER" />
    </html>
  );
}
