import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { DiscountRegistrationPage } from "@/components/site/InnerPages";



export const Route = createFileRoute("/discount-registration")({
  head: () => ({ meta: [{ title: "Registration — WCMAE 2027" }] }),
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <DiscountRegistrationPage />
      </main>
      <Footer />
    </div>
  ),
});
