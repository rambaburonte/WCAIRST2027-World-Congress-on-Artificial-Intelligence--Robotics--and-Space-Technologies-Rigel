import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { useConference } from "@/context/ConferenceContext";

export const Route = createFileRoute("/payment-success")({
  head: () => ({ meta: [{ title: "Payment successful — WCAIRST 2027" }] }),
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const { getConferenceName } = useConference();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-navy px-6 py-10 text-center text-white">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-white/20">
                <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12.5l2.5 2.5L16 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                Registration confirmed
              </p>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Payment successful</h1>
              <p className="mt-3 text-base text-slate-200">
                Your registration for {getConferenceName()} has been confirmed.
              </p>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                <p className="text-sm font-semibold">Thank you for completing your registration.</p>
                <p className="mt-2 text-sm leading-6 text-emerald-800">
                  A confirmation has been sent to your email, and we look forward to welcoming you at the conference.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-navy">What’s next?</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Keep an eye on your inbox for event updates, schedule announcements, and practical conference information.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-navy">Need help?</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    If you need any assistance, please contact the conference team and we’ll be happy to help.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button asChild size="lg">
                  <Link to="/">Return home</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact support</Link>
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
