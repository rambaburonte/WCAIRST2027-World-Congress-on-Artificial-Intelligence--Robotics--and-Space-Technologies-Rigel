import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Check, Globe2, Handshake, Megaphone, Users } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SponsorshipInquiry } from "@/components/site/SponsorshipInquiry";

const tiers = [
  ["Platinum Sponsor", "€7499", "Maximum visibility"],
  ["Gold Sponsor", "€6499", "Strong technical presence"],
  ["Silver Sponsorship", "€5,499", "A focused conference presence"],
  ["Bronze Sponsor", "€4,499", "An accessible conference presence"],
];
const benefits = [
  "Showcase products, platforms, and services to a focused technical audience",
  "Meet researchers, engineers, decision-makers, and technology partners",
  "Receive recognition in the event directory and digital materials",
  "Access dedicated networking time with delegates and speakers",
  "Benefit from booth support, electricity, and Wi-Fi access",
  "Generate qualified leads through practical demonstrations",
];
const exhibitorServices = ["Booth setup and installation", "Technical support and Wi-Fi", "Electricity connections", "Logistics and move-in assistance", "Attendee lead tracking system", "Listing in event directory", "Digital promotion", "Networking opportunities", "Catering options", "Post-event analytics"];
const applicationSteps = [["Submit Application", "Fill out the exhibitor application form with your company information and booth preference"], ["Review & Confirmation", "Our team reviews your application and confirms your booth reservation"], ["Invoice & Payment", "Receive invoice and complete payment to secure your booth space"], ["Planning & Coordination", "Work with our team on booth design, setup, and logistics"], ["Exhibition", "Set up your booth and connect with conference attendees"]] as const;
function BoothAndSchedule() { const booths = [["Standard Booth", "6 m²", 3000], ["Premium Booth", "9 m²", 5000], ["Large Exhibition", "15+ m²", 8000]] as const; const schedule = [["Setup", "14:00-20:00"], ["Day 1 - Exhibition Open",  "10:00-17:30"], ["Day 2 - Exhibition Open", "09:00-17:00"], ["Teardown",  "16:00-20:00"] as const]; return <div className="space-y-12"><div><h2 className="text-3xl font-bold">Booth Options</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{booths.map(([name, size, price]) => <div key={name} className="rounded-lg border bg-card p-6"><h3 className="text-lg font-semibold">{name}</h3><p className="mt-2 text-2xl font-bold text-gold">{size}</p><p className="mt-4 font-semibold">€{price}</p></div>)}</div></div><div className="rounded-lg border border-gold/30 bg-gold/5 p-8"><h2 className="text-2xl font-bold">Exhibition Schedule</h2><div className="mt-6 space-y-4">{schedule.map(([title, date, time]) => <div key={title} className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0"><div><p className="font-semibold">{title}</p><p className="text-sm text-muted-foreground">{date}</p></div><p className="text-sm text-muted-foreground">{time}</p></div>)}</div></div></div>; }
function ExhibitorDetails() { return <div className="space-y-12"><div><h2 className="text-3xl font-bold">Exhibitor Services Included</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{exhibitorServices.map((service) => <div key={service} className="flex items-start gap-3 rounded-lg bg-muted/50 p-4"><Check className="h-5 w-5 shrink-0 text-gold" /><p className="text-muted-foreground">{service}</p></div>)}</div></div><div><h2 className="text-3xl font-bold">Application Process</h2><div className="mt-6 space-y-4">{applicationSteps.map(([title, description], index) => <div key={title} className="flex gap-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-navy-deep">{index + 1}</div><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{description}</p></div></div>)}</div></div><div className="rounded-lg bg-muted/50 py-8 text-center"><h3 className="text-2xl font-bold">Ready to Exhibit?</h3><p className="mt-4 text-muted-foreground">Contact our exhibition team to reserve your booth space</p><div className="mt-6 space-y-2 text-muted-foreground"><p><strong>Email:</strong> secretary@wregcongress.com</p><p><strong>Phone:</strong> +44 7344897352</p></div><Link to="/registration" className="mt-6 inline-flex rounded-md bg-navy-deep px-6 py-3 text-sm font-semibold text-white">Apply to Exhibit</Link></div></div>; }

export function PartnershipPage({
  mode,
  conference,
}: {
  mode: "sponsors" | "exhibitors";
  conference: string;
}) {
  const sponsors = mode === "sponsors";
  const [selectedSponsor, setSelectedSponsor] = useState<string | null>(null);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="bg-navy-deep px-6 py-20 text-white lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{conference}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            {sponsors
              ? "Partner with the future of intelligent systems"
              : "Put your technology in the room"}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {sponsors
              ? `Support ${conference} and position your organization alongside the researchers and innovators shaping responsible AI, robotics, and space technology.`
              : `Meet the community at ${conference} and give your products, platforms, and services a visible place in the conversation.`}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl space-y-12 px-6 py-16 lg:px-10">
        <div>
          <h2 className="text-3xl font-bold">
            {sponsors ? "Sponsorship packages" : "Why exhibit with us?"}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {sponsors
              ? "Choose a partnership level and our team will tailor the details to your objectives."
              : "A practical platform for demonstrating capability, building trust, and finding the right collaborators."}
          </p>
        </div>
        {sponsors ? (
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map(([name, price, subtitle]) => (
              <article key={name} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="h-1.5 w-16 rounded-full bg-gold" />
                <h3 className="mt-5 text-2xl font-bold">{name}</h3>
                <p className="mt-2 text-2xl font-bold text-gold">{price}</p>
                <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {[
                    "Featured logo placement",
                    "Session or exhibition visibility",
                    "Networking access",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="h-4 w-4 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setSelectedSponsor(name)}
                  className="mt-6 w-full rounded-md bg-navy-deep px-4 py-3 text-sm font-semibold text-white"
                >
                  Choose {name}
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border bg-card p-5">
                <Check className="h-5 w-5 shrink-0 text-gold" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        )}
        {!sponsors && <><BoothAndSchedule /><ExhibitorDetails /></>}
        {sponsors && selectedSponsor && (
          <SponsorshipInquiry
            packageName={selectedSponsor}
            onClose={() => setSelectedSponsor(null)}
          />
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [
              Users,
              "Decision makers",
              "Connect with a concentrated audience of practitioners and leaders.",
            ],
            [
              Globe2,
              "International reach",
              "Build relationships across disciplines, institutions, and markets.",
            ],
            [
              Building2,
              "Visible innovation",
              "Associate your brand with ambitious technical progress.",
            ],
          ].map(([Icon, title, text]) => (
            <div key={String(title)} className="rounded-lg bg-muted/50 p-6">
              <Icon className="h-7 w-7 text-gold" />
              <h3 className="mt-4 font-semibold">{String(title)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{String(text)}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-navy-deep p-8 text-white md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="text-2xl font-bold">Ready to join the programme?</h2>
            <p className="mt-2 text-white/70">
              Contact the conference team to discuss packages, space, and visibility.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold"
            >
              <Handshake className="h-4 w-4" />
              Contact team
            </Link>
            <Link
              to="/registration"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy-deep"
            >
              <Megaphone className="h-4 w-4" />
              Register now
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
