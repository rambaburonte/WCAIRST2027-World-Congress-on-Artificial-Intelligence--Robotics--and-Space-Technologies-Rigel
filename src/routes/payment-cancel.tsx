import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { useConference } from "@/context/ConferenceContext";

export const Route = createFileRoute("/payment-cancel")({
  head: () => ({ meta: [{ title: "Payment cancelled — WCAIRST 2027" }] }),
  component: PaymentCancelPage,
});

function PaymentCancelPage() {
  const { getConferenceName } = useConference();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-navy px-6 py-10 text-center text-white">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-white/20">
                <svg viewBox="0 0 24 24" className="h-10 w-10 text-red-300" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                Registration status
              </p>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Payment cancelled</h1>
              <p className="mt-3 text-base text-slate-200">
                Your {getConferenceName()} registration was not completed.
              </p>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
                <p className="text-sm font-semibold">No charges were made to your account.</p>
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  The payment process was cancelled before completion, so your registration is still pending.
                  You can try again at any time using the same form or choose the discounted registration option.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-navy">What happened?</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Your payment was interrupted or cancelled while checking out. No booking was finalized.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-navy">Next step</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Retry the registration flow, review your selected ticket, and complete the payment when ready.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild size="lg">
                  <Link to="/registration">Try registration again</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/discount-registration">Discount registration</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact support</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link to="/">Back to home</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
