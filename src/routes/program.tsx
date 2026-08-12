import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ProgramPage } from "@/components/site/InnerPages";

export const Route = createFileRoute("/program")({
  head: () => ({ meta: [{ title: "Program — WCAIRST 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProgramPage />
      </main>
      <Footer />
    </div>
  ),
});
