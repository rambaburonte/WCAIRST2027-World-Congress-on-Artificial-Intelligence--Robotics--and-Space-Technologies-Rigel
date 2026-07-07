import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PagePlaceholder } from "@/components/site/Home";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — WCMAE 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><PagePlaceholder title="Contact" /></main>
      <Footer />
    </div>
  ),
});
