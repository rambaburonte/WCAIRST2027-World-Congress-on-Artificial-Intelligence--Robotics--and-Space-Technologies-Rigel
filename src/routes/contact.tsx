import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ContactPage } from "@/components/site/InnerPages";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — WCAIRST 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ContactPage />
      </main>
      <Footer />
    </div>
  ),
});
