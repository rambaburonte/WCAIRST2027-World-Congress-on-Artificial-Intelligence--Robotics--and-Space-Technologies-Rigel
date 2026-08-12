import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { RegistrationPage } from "@/components/site/InnerPages";

export const Route = createFileRoute("/registration")({
  head: () => ({ meta: [{ title: "Registration — WCAIRST 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <RegistrationPage />
      </main>
      <Footer />
    </div>
  ),
});
