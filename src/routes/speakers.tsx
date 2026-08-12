import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SpeakersPage } from "@/components/site/InnerPages";

export const Route = createFileRoute("/speakers")({
  head: () => ({ meta: [{ title: "Speakers — WCAIRST 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <SpeakersPage />
      </main>
      <Footer />
    </div>
  ),
});
