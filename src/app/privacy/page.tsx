import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Free AI Flashcard Maker.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-6">
          <p><strong>Effective Date:</strong> April 2026</p>
          <p>At Free AI Flashcard Maker, your privacy matters. This policy explains how we handle your data at flashcardmaker.app.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
          <p>We do not require account registration. When you use our service, we may collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Input Content:</strong> Topics and text you submit for flashcard generation. Processed in real time and not stored permanently.</li>
            <li><strong>Usage Data:</strong> Anonymous, aggregated data such as page views and device type.</li>
            <li><strong>Cookies:</strong> Essential cookies for functionality and analytics.</li>
          </ul>
          <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
          <p>We use collected information to generate flashcards, improve AI quality, analyze usage trends, and maintain platform security.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">3. Data Sharing</h2>
          <p>We do not sell or share your personal information. Topics you submit are sent to our AI provider for processing but are not stored or used for training.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">4. Data Security</h2>
          <p>We use HTTPS encryption and server-side API key protection. Your input text is not stored after flashcard generation.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">5. Contact</h2>
          <p>Questions? Contact us at <a href="mailto:privacy@flashcardmaker.app" className="text-primary hover:underline">privacy@flashcardmaker.app</a>.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
