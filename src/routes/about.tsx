import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PagePlaceholder } from "@/components/site/Home";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — WCMAE 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><PagePlaceholder title="About the Congress" /></main>
      <Footer />
    </div>
  ),
});