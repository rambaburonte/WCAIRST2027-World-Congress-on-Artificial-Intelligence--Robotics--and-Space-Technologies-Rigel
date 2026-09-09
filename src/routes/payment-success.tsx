import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { useConference } from "@/context/ConferenceContext";
import apiClient from "@/lib/api";

interface Registration {
  id: string;
  title?: string;
  name: string;
  email: string;
  category: string;
  org?: string;
  price?: number;
}

export const Route = createFileRoute("/payment-success")({
  head: () => ({
    meta: [{ title: "Payment Successful" }],
  }),
  component: PaymentSuccessPage,
});

export function PaymentSuccessPage() {
  const conf = useConference() as any;

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [isValidAccess, setIsValidAccess] = useState(false);

  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const providerParam = searchParams.get("provider");
  const sessionId = searchParams.get("session_id");
  const paymentId = searchParams.get("paymentId");
  const provider = providerParam || (paymentId ? "paypal" : sessionId ? "stripe" : null);
  const token = provider === "paypal" ? paymentId : sessionId;
  const payerId = searchParams.get("PayerID");
  const registrationId = searchParams.get("registration_id");
  const username = searchParams.get("username") || conf?.conferenceData?.ShortName || conf?.siteConfig?.shortName || "WCAIRST-2027";

  useEffect(() => {
    const confirmAndFetch = async () => {
      // Validate that user came from payment gateway
      if (!token || !provider) {
        console.error("Invalid access - missing payment parameters");
        setIsValidAccess(false);
        setLoading(false);
        return;
      }

      // Check if this payment has already been confirmed
      const confirmationKey = `payment_confirmed_${token}`;
      const alreadyConfirmed = localStorage.getItem(confirmationKey);

      if (alreadyConfirmed === "true") {
        console.log("Payment already confirmed, skipping API call");
        setPaymentStatus("Payment already confirmed.");
        setIsValidAccess(true);
        if (registrationId) {
          try {
            const response = await apiClient.get(`/registrations/${registrationId}`);
            setRegistration(response.data);
          } catch (error) {
            console.error("Error fetching registration:", error);
          }
        }
        setLoading(false);
        return;
      }

      let confirmed = false;
      let statusMsg: string | null = null;
      try {
        if (token && provider === "stripe") {
          const res = await apiClient.post("/payment/stripe/success", { token, username });
          confirmed = res.data?.status === "success";
          statusMsg = res.data?.status === "success" ? "Payment confirmed by Stripe." : (res.data?.error || "Stripe payment not completed.");
          if (res.data?.status === "success") {
            localStorage.setItem(confirmationKey, "true");
            setIsValidAccess(true);
          }
        } else if (token && provider === "paypal") {
          const res = await apiClient.post("/payment/paypal/success", { token, payerId, username });
          confirmed = res.data?.status === "success";
          statusMsg = res.data?.status === "success" ? "Payment confirmed by PayPal." : (res.data?.error || "PayPal payment not completed.");
          if (res.data?.status === "success") {
            localStorage.setItem(confirmationKey, "true");
            setIsValidAccess(true);
          }
        }
      } catch (err: unknown) {
        const error = err as { response?: { data?: { error?: string } }; message?: string };
        statusMsg = "Payment confirmation error: " + (error?.response?.data?.error || (error as Error)?.message || "Unknown error");
        console.error("Payment confirmation error:", err);
        setIsValidAccess(false);
      }

      // Fallback: If not confirmed, try updating status by token
      if (!confirmed && token) {
        try {
          const res = await apiClient.post("/payment/update-status-by-token", { token });
          statusMsg = res.data?.status === "updated" ? "Payment status updated in system." : (res.data?.error || "Could not update payment status.");
          if (res.data?.status === "updated") {
            localStorage.setItem(confirmationKey, "true");
            setIsValidAccess(true);
          }
        } catch (fallbackErr: unknown) {
          const error = fallbackErr as { response?: { data?: { error?: string } }; message?: string };
          statusMsg = "Fallback status update error: " + (error?.response?.data?.error || (error as Error)?.message || "Unknown error");
          console.error("Fallback status update error:", fallbackErr);
          setIsValidAccess(false);
        }
      }
      setPaymentStatus(statusMsg);

      // Only fetch registration if payment was successful
      if (confirmed && registrationId) {
        try {
          const response = await apiClient.get(`/registrations/${registrationId}`);
          setRegistration(response.data);
        } catch (error) {
          console.error("Error fetching registration:", error);
        }
      }
      setLoading(false);
    };

    confirmAndFetch();
  }, [registrationId, token, provider, payerId, username]);

  const confName = (conf?.getConferenceName && conf.getConferenceName()) || conf?.conferenceData?.ConferenceTitle || conf?.siteConfig?.name || "WCAIRST-2027";
  const confDates = conf?.conferenceData?.ConferenceDates || "Dates to be announced";
  const confVenue = conf?.conferenceData?.ConferenceVenue || "Venue to be announced";

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Verifying your payment...</p>
            </div>
          ) : !isValidAccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4">Invalid Access</h1>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                This page can only be accessed after completing a payment through our registration system.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/register">Go to Registration</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-10">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-3">Payment Successful!</h1>
                <p className="text-xl text-muted-foreground">
                  Thank you for registering for {confName}
                </p>
                {token && (
                  <div className="mt-4 text-sm">
                    <span className="text-muted-foreground">{provider === "paypal" ? "Order ID: " : "Session ID: "}</span>
                    <span className="font-mono text-primary font-medium">{token}</span>
                  </div>
                )}
                {paymentStatus && (
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Payment Status: </span>
                    <span className="text-primary font-medium">{paymentStatus}</span>
                  </div>
                )}
              </div>

              {registration && (
                <div className="bg-card border rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 text-center">Registration Confirmed</h2>
                  <div className="divide-y text-sm">
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">Registration ID:</span>
                      <span className="font-bold text-primary">{registration.id}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-semibold">{registration.title ? `${registration.title} ` : ""}{registration.name}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{registration.email}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="capitalize">{registration.category}</span>
                    </div>
                    {registration.org && (
                      <div className="flex justify-between py-3">
                        <span className="text-muted-foreground">Organization:</span>
                        <span>{registration.org}</span>
                      </div>
                    )}
                    {registration.price !== undefined && (
                      <div className="flex justify-between py-3">
                        <span className="text-muted-foreground">Amount Paid:</span>
                        <span className="font-bold text-green-500 text-lg">€{registration.price}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-card border rounded-2xl p-6 mb-8 shadow-sm">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Next Steps
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>1. A confirmation email has been sent to your registered address.</p>
                  <p>2. Your badge and welcome package will be available at the registration desk.</p>
                  <p>3. Review the schedule and plan your sessions.</p>
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-semibold text-lg">Event Schedule & Venue</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {confName} • {confDates}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  📍 {confVenue}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={() => window.print()} variant="outline" size="lg">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Print Confirmation
                </Button>
                <Button asChild size="lg">
                  <Link to="/">Return to Home</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/schedule">View Schedule</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default PaymentSuccessPage;
