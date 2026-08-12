import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CommitteePage } from "@/components/site/Committee";

export const Route = createFileRoute("/committee")({
  head: () => ({ meta: [{ title: "Committee — WCAIRST 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <CommitteePage />
      </main>
      <Footer />
    </div>
  ),
});
