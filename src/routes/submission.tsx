import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SubmissionPage } from "@/components/site/InnerPages";

export const Route = createFileRoute("/submission")({
  head: () => ({ meta: [{ title: "Abstract Submission — WCAIRST 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <SubmissionPage />
      </main>
      <Footer />
    </div>
  ),
});
