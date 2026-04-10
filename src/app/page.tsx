"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  BookOpen,
  Zap,
  Brain,
  Shield,
  Globe,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Loader2,
  Download,
  Copy,
  Check,
  CheckCircle,
  Users,
  Star,
  Clock,
  GraduationCap,
  Languages,
  Stethoscope,
  Scale,
  Code,
  FlaskConical,
  Calculator,
  History,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Flashcard {
  front: string;
  back: string;
}

const features = [
  { icon: Sparkles, title: "AI-Powered Generation", description: "Type any topic and our AI creates perfectly crafted question-answer flashcards covering key concepts, definitions, and facts." },
  { icon: Zap, title: "Instant Results", description: "Get 5-20 study flashcards generated in seconds. No waiting, no manual card creation — just type and study." },
  { icon: BookOpen, title: "Flip & Study", description: "Interactive flashcards with smooth flip animations. Click to reveal the answer, navigate between cards, and track your progress." },
  { icon: Brain, title: "Any Subject, Any Level", description: "From middle school biology to medical school anatomy, our AI adapts to any topic and difficulty level." },
  { icon: Shield, title: "100% Free, No Sign-Up", description: "Generate unlimited flashcards without creating an account. No hidden fees, no subscriptions, no limits." },
  { icon: Globe, title: "Works on Any Device", description: "Study on your phone during commute, on your tablet at the library, or on your laptop at home. No app download needed." },
];

const steps = [
  { number: 1, title: "Enter Your Topic or Paste Text", description: "Type a subject like 'French Revolution' or paste your lecture notes, textbook chapters, or any study material." },
  { number: 2, title: "AI Generates Your Flashcards", description: "Our AI analyzes your input and creates structured question-answer pairs covering the most important concepts." },
  { number: 3, title: "Flip, Study & Learn", description: "Interactive flashcards with flip animation. Navigate through cards, track your progress, and export for later study." },
];

const subjects = [
  { icon: FlaskConical, name: "Science", examples: "Biology, Chemistry, Physics" },
  { icon: History, name: "History", examples: "World Wars, Ancient Civilizations" },
  { icon: Languages, name: "Languages", examples: "Spanish, French, Japanese" },
  { icon: Calculator, name: "Mathematics", examples: "Algebra, Calculus, Statistics" },
  { icon: Stethoscope, name: "Medicine", examples: "Anatomy, Pharmacology, Pathology" },
  { icon: Scale, name: "Law", examples: "Constitutional, Criminal, Contract" },
  { icon: Code, name: "Programming", examples: "Python, JavaScript, SQL" },
  { icon: GraduationCap, name: "Exam Prep", examples: "SAT, GRE, MCAT, Bar Exam" },
];

const stats = [
  { value: "5M+", label: "Cards Created", icon: CheckCircle },
  { value: "2M+", label: "Happy Students", icon: Users },
  { value: "4.8/5", label: "User Rating", icon: Star },
  { value: "<3s", label: "Generation Time", icon: Clock },
];

const faqs = [
  { question: "Is Free AI Flashcard Maker really free?", answer: "Yes, completely free. Generate unlimited flashcards without any hidden fees, subscriptions, or sign-up requirements. Our goal is to make study tools accessible to every student." },
  { question: "How does the AI generate flashcards?", answer: "Our AI analyzes your topic or text input and identifies the most important concepts, definitions, and facts. It then creates clear question-answer pairs optimized for memorization and active recall — the most effective study technique." },
  { question: "What subjects can I create flashcards for?", answer: "Any subject — science, history, languages, math, medicine, law, programming, business, and more. The AI adapts its output to match the complexity and terminology of your chosen field." },
  { question: "Can I paste my own notes or textbook text?", answer: "Yes! You can either type a topic for the AI to research, or paste your own lecture notes, textbook excerpts, or study materials. The AI will extract key information and create flashcards from your content." },
  { question: "Can I use it on my phone?", answer: "Absolutely. Free AI Flashcard Maker is fully responsive and works on any device with a web browser. The flip animations and navigation work great on touchscreens." },
  { question: "Can I export or save my flashcards?", answer: "Yes, you can copy all flashcards to your clipboard in a structured format. You can then paste them into Anki, Quizlet, or any other study tool, or save them in a document for later review." },
];

/* ------------------------------------------------------------------ */
/*  FAQ Component                                                      */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={open}>
        <span className="font-semibold text-foreground pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5"><p className="text-muted text-sm leading-relaxed">{answer}</p></div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flashcard Viewer Component                                         */
/* ------------------------------------------------------------------ */

function FlashcardViewer({ cards, onReset }: { cards: Flashcard[]; onReset: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const card = cards[currentIndex];

  const next = () => { setFlipped(false); setTimeout(() => setCurrentIndex((i) => Math.min(i + 1, cards.length - 1)), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setCurrentIndex((i) => Math.max(i - 1, 0)), 150); };

  const handleCopyAll = () => {
    const text = cards.map((c, i) => `Card ${i + 1}\nQ: ${c.front}\nA: ${c.back}`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted">{currentIndex + 1} / {cards.length}</span>
        <div className="flex-1 mx-4 bg-gray-100 rounded-full h-2">
          <div className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }} />
        </div>
        <span className="text-sm text-muted">{Math.round(((currentIndex + 1) / cards.length) * 100)}%</span>
      </div>

      {/* Card */}
      <div
        className={`flashcard-inner cursor-pointer select-none ${flipped ? "flashcard-flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
        style={{ perspective: "1000px", minHeight: "280px", position: "relative" }}
      >
        {/* Front */}
        <div className="flashcard-front absolute inset-0 bg-white rounded-2xl border-2 border-primary/20 shadow-lg p-8 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden" }}>
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">Question</div>
          <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">{card.front}</p>
          <p className="text-xs text-muted/50 mt-4">Click to flip</p>
        </div>
        {/* Back */}
        <div className="flashcard-back absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border-2 border-primary/30 shadow-lg p-8 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/20 text-primary-dark text-xs font-semibold">Answer</div>
          <p className="text-base md:text-lg text-foreground leading-relaxed">{card.back}</p>
          <p className="text-xs text-muted/50 mt-4">Click to flip back</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={prev} disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors disabled:opacity-30">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setFlipped(!flipped)}
          className="px-5 py-2.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors">
          Flip Card
        </button>
        <button onClick={next} disabled={currentIndex === cards.length - 1}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors disabled:opacity-30">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={handleCopyAll} className="btn-secondary text-sm px-5 py-2 gap-2">
          {copied ? <><Check className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy All</>}
        </button>
        <button onClick={onReset} className="btn-secondary text-sm px-5 py-2 gap-2">
          <RotateCcw className="w-4 h-4" /> New Topic
        </button>
      </div>

      {/* Card list preview */}
      <div className="mt-8 space-y-2">
        <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-3">All Cards</p>
        {cards.map((c, i) => (
          <button key={i} onClick={() => { setCurrentIndex(i); setFlipped(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
              i === currentIndex ? "border-primary/30 bg-primary/5 text-foreground" : "border-border text-muted hover:border-primary/20"
            }`}>
            <span className="font-semibold text-primary mr-2">{i + 1}.</span> {c.front}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [count, setCount] = useState(10);
  const [mode, setMode] = useState<"topic" | "text">("topic");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    const input = mode === "topic" ? topic : text;
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setCards([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: mode === "topic" ? input : undefined,
          text: mode === "text" ? input : undefined,
          count,
        }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setCards(data.cards); }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [mode, topic, text, count]);

  const handleReset = useCallback(() => {
    setCards([]);
    setTopic("");
    setText("");
    setError(null);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero-subtle py-8 md:py-10" id="maker">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Free AI Flashcard Maker{" "}
              <span className="gradient-text">Study Smarter</span>
            </h1>
            <p className="text-sm md:text-base text-muted mt-2 max-w-2xl mx-auto leading-relaxed">
              Type any topic or paste your notes and get AI-generated study flashcards in seconds. Perfect for exam prep, language learning, medical school, and any subject — completely free, no sign-up needed.
            </p>

            {/* Generator */}
            {cards.length > 0 ? (
              <div className="mt-6">
                <FlashcardViewer cards={cards} onReset={handleReset} />
              </div>
            ) : (
              <div className="mt-6 max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
                  {/* Mode tabs */}
                  <div className="flex border-b border-border">
                    <button onClick={() => setMode("topic")}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === "topic" ? "text-primary border-b-2 border-primary bg-surface" : "text-muted hover:text-foreground"}`}>
                      📝 Enter Topic
                    </button>
                    <button onClick={() => setMode("text")}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === "text" ? "text-primary border-b-2 border-primary bg-surface" : "text-muted hover:text-foreground"}`}>
                      📄 Paste Text / Notes
                    </button>
                  </div>

                  <div className="p-5">
                    {mode === "topic" ? (
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
                        placeholder='Try "French Revolution", "Organic Chemistry", "JavaScript Promises"...'
                        disabled={loading}
                        className="w-full text-base text-foreground placeholder:text-muted/40 bg-surface rounded-xl px-4 py-3 border border-border focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
                      />
                    ) : (
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={5}
                        placeholder="Paste your lecture notes, textbook excerpt, or any study material here..."
                        disabled={loading}
                        className="w-full text-sm text-foreground placeholder:text-muted/40 bg-surface rounded-xl px-4 py-3 border border-border focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 resize-none disabled:opacity-50"
                      />
                    )}

                    {/* Card count selector */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-muted">Cards:</label>
                        <div className="flex gap-1">
                          {[5, 10, 15, 20].map((n) => (
                            <button key={n} onClick={() => setCount(n)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                count === n ? "bg-primary text-white" : "bg-surface text-muted hover:text-foreground border border-border"
                              }`}>
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleGenerate}
                        disabled={loading || !(mode === "topic" ? topic.trim() : text.trim())}
                        className="btn-primary text-sm px-6 py-2.5 gap-2 disabled:opacity-40">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {loading ? "Generating..." : "Generate Flashcards"}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                {/* Quick topic suggestions */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {["Photosynthesis", "World War II", "Spanish Basics", "Python Programming", "Human Anatomy", "Microeconomics"].map((t) => (
                    <button key={t} onClick={() => { setTopic(t); setMode("topic"); }}
                      className="text-xs px-3 py-1.5 rounded-full border border-border text-muted hover:text-primary hover:border-primary/30 hover:bg-surface transition-colors">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            {cards.length === 0 && (
              <div className="mt-8 grid grid-cols-4 gap-3 max-w-2xl mx-auto">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center py-3">
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-[10px] text-muted mt-0.5 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="py-12 md:py-16 bg-white" id="features">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose <span className="gradient-text">Free AI Flashcard Maker</span>?
              </h2>
              <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
                The fastest way to create study flashcards — powered by AI, designed for effective learning.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="feature-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{f.title}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16 bg-surface" id="how-it-works">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                How <span className="gradient-text">Free AI Flashcard Maker</span> Works
              </h2>
              <p className="text-muted mt-4 max-w-xl mx-auto text-lg">Three steps to better studying.</p>
            </div>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-6 bg-white rounded-2xl p-6 border border-border">
                  <div className="step-number shrink-0">{step.number}</div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{step.title}</h3>
                    <p className="text-muted text-sm mt-2 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section className="py-12 md:py-16 bg-white" id="subjects">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Create Flashcards for <span className="gradient-text">Any Subject</span>
              </h2>
              <p className="text-muted mt-4 max-w-xl mx-auto text-lg">From elementary school to professional certifications.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {subjects.map((s) => (
                <div key={s.name} className="bg-white border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all text-center">
                  <s.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted mt-1">{s.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16 bg-surface">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-muted leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">The Science Behind Flashcard Learning</h2>
              <p>Flashcards are one of the most research-backed study methods in cognitive science. The technique leverages two powerful learning principles: active recall and spaced repetition. Active recall — the process of actively retrieving information from memory rather than passively re-reading — has been shown in dozens of peer-reviewed studies to dramatically improve long-term retention. When you flip a flashcard and try to recall the answer before checking, you strengthen the neural pathways associated with that knowledge.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Why AI-Generated Flashcards Are More Effective</h3>
              <p>Creating flashcards manually is time-consuming and often results in cards that are either too vague or too detailed. The Free AI Flashcard Maker solves this by analyzing your topic or text and identifying the most important concepts that deserve their own card. The AI creates questions that target understanding rather than simple memorization, and formulates answers that are concise enough to be memorable but detailed enough to be useful. This means you spend less time creating cards and more time actually studying them.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">How to Study Effectively with Flashcards</h3>
              <p>For maximum retention, follow these evidence-based strategies: study your flashcards in short sessions of 15-20 minutes rather than marathon cramming sessions. Shuffle the order regularly to prevent order-dependent memorization. When you get a card right, move it to a "review later" pile. When you get one wrong, keep it in your active study pile and review it again soon. This natural form of spaced repetition ensures you spend more time on challenging material and less time on concepts you already know.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">From Lecture Notes to Study Cards in Seconds</h3>
              <p>One of the most powerful features of Free AI Flashcard Maker is the ability to paste your own study materials directly. Upload your lecture notes, copy sections from your textbook, or paste key passages from research papers. The AI extracts the essential information and transforms it into structured question-answer pairs. This is particularly valuable for medical students reviewing anatomy, law students studying case law, or language learners working with new vocabulary — any scenario where you have dense source material that needs to be broken into digestible pieces.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Compatible with Your Existing Study Tools</h3>
              <p>Every set of flashcards you generate can be copied to your clipboard with one click. The structured format is compatible with popular study platforms like Anki, Quizlet, and Brainscape. You can also save them to a text document, print them as physical flashcards, or keep them in your note-taking app. Free AI Flashcard Maker is designed to fit into your existing study workflow, not replace it — think of it as a powerful card creation engine that saves you hours of manual work.</p>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 gradient-hero text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Study Smarter?</h2>
            <p className="text-white/80 mt-4 text-lg max-w-xl mx-auto">
              Join millions of students who use AI flashcards to ace exams, learn languages, and master new skills — completely free.
            </p>
            <a href="#maker" className="inline-flex items-center gap-2 mt-8 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg">
              <Sparkles className="w-5 h-5" />
              Start Making Flashcards
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-white" id="faq">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-muted mt-4 text-lg">Everything you need to know about Free AI Flashcard Maker.</p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
