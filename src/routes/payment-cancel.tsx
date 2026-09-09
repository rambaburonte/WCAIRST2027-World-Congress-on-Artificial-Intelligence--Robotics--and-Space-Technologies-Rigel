import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { useConference } from "@/context/ConferenceContext";

export const Route = createFileRoute("/payment-cancel")({
  head: () => ({
    meta: [{ title: "Payment Cancelled" }],
  }),
  component: PaymentCancelPage,
});

export function PaymentCancelPage() {
  const conf = useConference() as any;
  const confName = (conf?.getConferenceName && conf.getConferenceName()) || conf?.conferenceData?.ConferenceTitle || conf?.siteConfig?.name || "WCAIRST-2027";

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">Payment Cancelled</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your registration payment for {confName} was cancelled.
          </p>

          <div className="bg-card border rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-lg mb-2">What Happened?</h3>
            <p className="text-muted-foreground text-sm">
              Your transaction was cancelled before completion. No charges were made to your card or account.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">
                Try Registration Again
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default PaymentCancelPage;
