import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AboutPage } from "@/components/site/InnerPages";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — WCAIRST 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AboutPage />
      </main>
      <Footer />
    </div>
  ),
});
