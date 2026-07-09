import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { VenuePage } from "@/components/site/InnerPages";

export const Route = createFileRoute("/venue")({
  head: () => ({ meta: [{ title: "Venue — WCMAE 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <VenuePage />
      </main>
      <Footer />
    </div>
  ),
});
