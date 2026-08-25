import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { submitContactForm } from "@/lib/api";

export function SponsorshipInquiry({ packageName, onClose }: { packageName: string; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm({ user: "WCAIRST2027", name: form.name, email: form.email, phone: "", subject: `${packageName} Sponsorship Inquiry`, message: `Organization: ${form.organization}\n\n${form.message}`, inquiry_type: "sponsorship", recipient_email: "secretary@wcairst.com" });
      setSuccess(true);
    } finally { setSubmitting(false); }
  };
  return <>
    <form onSubmit={handleSubmit} className="scroll-mt-24 rounded-lg border border-gold/50 bg-muted/50 p-8">
      <h2 className="text-2xl font-bold">{packageName} inquiry</h2><p className="mt-2 text-sm text-muted-foreground">Tell our partnership team how you would like to participate.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2"><input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className="rounded-md border bg-background px-4 py-3" /><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email address" className="rounded-md border bg-background px-4 py-3" /><input required value={form.organization} onChange={(e) => update("organization", e.target.value)} placeholder="Organization" className="rounded-md border bg-background px-4 py-3" /><input readOnly value={packageName} className="rounded-md border bg-background px-4 py-3" /><textarea required value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your sponsorship goals" rows={5} className="rounded-md border bg-background px-4 py-3 md:col-span-2" /></div>
      <div className="mt-5 flex gap-3"><button type="submit" disabled={submitting} className="rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy-deep disabled:opacity-60">{submitting ? "Sending..." : "Send inquiry"}</button><button type="button" onClick={onClose} className="rounded-md border px-5 py-3 text-sm font-semibold">Cancel</button></div>
    </form>
    {success && <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] grid place-items-center bg-navy-deep/60 px-6"><div className="w-full max-w-md rounded-lg bg-background p-8 text-center shadow-2xl"><Check className="mx-auto h-12 w-12 text-gold" /><h2 className="mt-4 text-2xl font-bold">Inquiry sent successfully</h2><p className="mt-2 text-muted-foreground">Thank you. The WCAIRST sponsorship team will contact you shortly.</p><button type="button" onClick={() => { setSuccess(false); onClose(); }} className="mt-6 rounded-md bg-navy-deep px-5 py-3 text-sm font-semibold text-white">Close</button></div></div>}
  </>;
}
