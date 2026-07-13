import { useState, type ReactNode, type ChangeEvent, type FormEvent } from "react";

import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  Clock3,
  FileText,
  Globe,
  Layers,
  Mail,
  MapPin,
  Mic,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Send,
  Ticket,
  Users,
  FileUp,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import {
  submitAbstract,
  checkAbstractStatus,
  getErrorMessage,
  submitContact,
  createStripePaymentIntent,
  createPaypalPayment,
} from "@/lib/api";
import { useConference, DEFAULT_SHORT_NAME } from "@/context/ConferenceContext";
import { PersonDetailModal } from "./PersonDetailModal";
import type { Speaker } from "@/constants/conference";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45 },
};

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy leading-tight">{title}</h2>
      {lead ? <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">{lead}</p> : null}
    </div>
  );
}

function PageShell({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(13,27,58,0.92), rgba(13,27,58,0.68)), url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-18 lg:py-24">
          <motion.p
            {...fadeUp}
            className="text-gold font-semibold tracking-[0.25em] text-xs uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl"
          >
            {title}
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-5 max-w-3xl text-slate-200 text-lg leading-relaxed"
          >
            {lead}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {primary ? (
              <Link
                to={primary.to}
                className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-deep"
              >
                {primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
            {secondary ? (
              <Link
                to={secondary.to}
                className="inline-flex items-center gap-2 rounded-md border-2 border-white/70 px-6 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-navy"
              >
                {secondary.label}
              </Link>
            ) : null}
          </motion.div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {children}
      </section>
    </>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <Icon className="h-10 w-10 rounded-xl bg-navy/10 p-2.5 text-navy" />
      <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function TimelineItem({ date, title, text }: { date: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{date}</div>
      <div className="mt-2 flex items-start gap-3">
        <Calendar className="mt-0.5 h-5 w-5 text-navy" />
        <div>
          <h3 className="font-semibold text-navy">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy"
      />
    </label>
  );
}

export function AboutPage() {
  const themes = [
    "Advanced manufacturing and smart materials",
    "Aerospace vehicles, propulsion and flight systems",
    "Thermal sciences, fluids and energy systems",
    "Simulation, digital twins and computational design",
    "Mechatronics, automation and robotics integration",
    "Reliability, safety and sustainable engineering",
  ];

  return (
    <PageShell
      eyebrow="About the congress"
      title="A global forum for mechanical and aerospace innovation"
      lead="WCMAE 2027 is designed as a practical meeting point for researchers, engineers, educators and industry leaders who want to exchange ideas, present solutions and build collaborations around the future of engineering."
      primary={{ label: "Submit abstract", to: "/submission" }}
      secondary={{ label: "Register now", to: "/registration" }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <InfoCard
          icon={Globe}
          title="International reach"
          text="Bring your work to a truly cross-disciplinary audience with participants from universities, labs, startups and established industries."
        />
        <InfoCard
          icon={Users}
          title="Collaborative atmosphere"
          text="The program mixes plenary talks, technical sessions and informal networking so the right conversations can continue beyond the stage."
        />
        <InfoCard
          icon={ShieldCheck}
          title="Applied impact"
          text="Every track is curated to help move ideas from theory into real-world engineering practice and deployment."
        />
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <SectionTitle
            eyebrow="Congress focus"
            title="What the event is built around"
            lead="The congress highlights current research, practical implementations and future-facing technologies across the mechanical and aerospace ecosystem."
          />
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <Mic className="h-10 w-10 rounded-xl bg-gold/20 p-2.5 text-navy" />
              <h3 className="mt-4 font-semibold text-navy">Conference format</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keynotes, oral papers, poster sessions, panel discussions and networking moments.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <Check className="h-10 w-10 rounded-xl bg-gold/20 p-2.5 text-navy" />
              <h3 className="mt-4 font-semibold text-navy">Who should attend</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Researchers, postgraduate students, professionals, innovators and policy-minded
                stakeholders.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-navy p-8 text-white shadow-xl">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em]">
            Thematic areas
          </p>
          <h3 className="mt-3 text-2xl font-bold">Topics the program is shaped around</h3>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {themes.map((theme) => (
              <div
                key={theme}
                className="rounded-2xl bg-white/8 px-4 py-3 text-sm leading-6 text-slate-100"
              >
                {theme}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function ProgramPage() {
  const days = [
    {
      day: "Day 1",
      date: "12 May 2027",
      title: "Opening, plenaries and welcome sessions",
      items: [
        "Registration and check-in",
        "Opening remarks",
        "Plenary keynote lectures",
        "Technical sessions and poster launch",
      ],
    },
    {
      day: "Day 2",
      date: "13 May 2027",
      title: "Parallel technical sessions and workshops",
      items: [
        "Invited talks",
        "Parallel oral tracks",
        "Panel discussions",
        "Industry and research networking",
      ],
    },
    {
      day: "Day 3",
      date: "14 May 2027",
      title: "Showcase, awards and closing forum",
      items: [
        "Young researcher spotlight",
        "Best paper recognition",
        "Closing keynote",
        "Conference summary and farewell",
      ],
    },
  ];

  return (
    <PageShell
      eyebrow="Program overview"
      title="Three focused days of research exchange and professional networking"
      lead="The schedule is balanced between formal presentations and enough space for conversations, collaborations and follow-up meetings."
      primary={{ label: "Submit abstract", to: "/submission" }}
      secondary={{ label: "Venue details", to: "/venue" }}
    >
      <div className="grid md:grid-cols-3 gap-5">
        {days.map((item) => (
          <motion.div
            key={item.day}
            {...fadeUp}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {item.day}
                </p>
                <h3 className="mt-2 text-xl font-bold text-navy">{item.title}</h3>
              </div>
              <Calendar className="h-11 w-11 rounded-2xl bg-navy/10 p-2.5 text-navy" />
            </div>
            <p className="mt-2 text-sm font-medium text-slate-500">{item.date}</p>
            <ul className="mt-5 space-y-3">
              {item.items.map((programItem) => (
                <li key={programItem} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gold" />
                  <span>{programItem}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <SectionTitle
            eyebrow="Session structure"
            title="How the conference day is organized"
            lead="The format is intentionally varied so each session has a clear objective and a predictable flow."
          />
          <div className="mt-8 space-y-4">
            <TimelineItem
              date="Morning"
              title="Plenary and keynote talks"
              text="Big-picture talks that frame the day and introduce major ideas, emerging methods and strategic perspectives."
            />
            <TimelineItem
              date="Midday"
              title="Parallel technical tracks"
              text="Concurrent sessions focused on individual research themes, paper presentations and audience Q&A."
            />
            <TimelineItem
              date="Afternoon"
              title="Panels and workshops"
              text="Shorter sessions designed for methods exchange, practical demonstrations and discussion with peers."
            />
          </div>
        </div>
        <div className="rounded-3xl bg-slate-50 p-8">
          <SectionTitle
            eyebrow="What attendees get"
            title="A practical program with outcomes beyond the event"
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon={FileText}
              title="Paper feedback"
              text="Direct input from chairs, reviewers and session participants."
            />
            <InfoCard
              icon={Sparkles}
              title="Visibility"
              text="A platform to showcase work to an international technical audience."
            />
            <InfoCard
              icon={Users}
              title="Networking"
              text="Built-in opportunities to meet researchers and collaborators."
            />
            <InfoCard
              icon={Ticket}
              title="Attendance value"
              text="A clear schedule that helps delegates plan their time efficiently."
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function SpeakerCard({
  speaker,
  index = 0,
  onClick,
}: {
  speaker: Speaker;
  index?: number;
  onClick?: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div
        className={`relative aspect-[4/5] bg-gradient-to-br ${speaker.accent || "from-navy to-navy-deep"}`}
      >
        {speaker.photo ? (
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-6xl font-bold text-white/90 drop-shadow-lg">
              {speaker.initials}
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-800">
          {speaker.flag} {speaker.country}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
          {speaker.category} Speaker
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-tight text-navy">{speaker.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{speaker.institution}</p>
        {speaker.bio && (
          <p className="mt-3 text-xs leading-relaxed text-slate-500 line-clamp-2 font-medium border-t border-slate-100 pt-2">
            {speaker.bio}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export function SpeakersPage() {
  const { speakers, loading } = useConference();
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const plenary = speakers.filter((s) => s.category === "Plenary");
  const keynote = speakers.filter((s) => s.category === "Keynote");

  const speakerTracks = [
    ["Plenary keynote", "For senior researchers and leaders presenting a broad field overview."],
    [
      "Industry spotlight",
      "For practitioners sharing deployed systems, lessons learned and product-scale insight.",
    ],
    [
      "Young researcher forum",
      "For emerging voices with strong methods, results and future potential.",
    ],
    [
      "Panel chair",
      "For facilitators who can frame debate and draw useful conclusions from the session.",
    ],
  ];

  return (
    <PageShell
      eyebrow="Speakers"
      title="A speaker lineup built around expertise, relevance and practical value"
      lead="The congress invites a mix of academic and industry voices so delegates can hear both the latest research and the realities of implementation."
      primary={{ label: "Nominate a speaker", to: "/contact" }}
      secondary={{ label: "Submit paper", to: "/submission" }}
    >
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
        <div className="grid sm:grid-cols-2 gap-5">
          {speakerTracks.map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Mic className="h-11 w-11 rounded-2xl bg-navy/10 p-2.5 text-navy" />
              <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl bg-navy p-8 text-white shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Speaker value
          </p>
          <h3 className="mt-3 text-2xl font-bold">Why present at WCMAE 2027</h3>
          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-200">
            <p>
              Present your research to a focused audience that can understand both fundamentals and
              application.
            </p>
            <p>
              Get structured Q&A, broader visibility and the chance to build future collaborations.
            </p>
            <p>
              Speaker slots are selected to keep the program balanced across themes, levels and
              industries.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex gap-3 text-sm">
              <Check className="mt-0.5 h-5 w-5 text-gold" /> Invitation letters available for
              confirmed speakers
            </div>
            <div className="flex gap-3 text-sm">
              <Check className="mt-0.5 h-5 w-5 text-gold" /> Session chairs and moderators supported
              by the committee
            </div>
            <div className="flex gap-3 text-sm">
              <Check className="mt-0.5 h-5 w-5 text-gold" /> Dedicated young researcher and poster
              pathways
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 space-y-20">
        {[
          { list: plenary, label: "Plenary Speakers" },
          { list: keynote, label: "Keynote Speakers" },
        ].map((g) => (
          <div key={g.label}>
            <h2 className="text-3xl font-bold text-navy mb-8">{g.label}</h2>
            {loading && <p className="text-sm text-slate-500">Loading current speaker data...</p>}
            {!loading && g.list.length === 0 && (
              <p className="text-sm text-slate-500">No speakers found under this category.</p>
            )}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {g.list.map((s, i) => (
                <SpeakerCard
                  key={s.name}
                  speaker={s}
                  index={i}
                  onClick={() => setSelectedSpeaker(s)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <PersonDetailModal person={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
    </PageShell>
  );
}

export function SubmissionPage() {
  const { conferenceData, tracks: contextTracks } = useConference();
  const [activeTab, setActiveTab] = useState<"submit" | "status">("submit");

  // Submit Form States
  const [form, setForm] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
    country: "",
    presentationTitle: "",
    trackName: "",
    category: "Oral Presentation",
    address: "",
    abstractText: "",
    file: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);

  // Status check states
  const [submissionId, setSubmissionId] = useState("");
  const [statusResult, setStatusResult] = useState<Record<string, unknown> | null>(null);
  const [checking, setChecking] = useState(false);

  const shortName = conferenceData?.ShortName || DEFAULT_SHORT_NAME;
  const tracks =
    contextTracks.length > 0
      ? contextTracks.map((t) => t.name)
      : [
          "Advanced Manufacturing & Materials",
          "Aerospace Vehicles & Propulsion",
          "Thermal & Fluid Systems",
          "Design, Simulation & Optimization",
          "Structures, Dynamics & Vibration",
          "Control, Automation & Mechatronics",
          "Emerging Technologies in Engineering",
          "Sustainability & Green Engineering",
          "Additive Manufacturing",
          "Safety, Reliability & Maintenance",
        ];

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const handleFieldChange = (key: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    handleFieldChange("file", selectedFile);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.file) {
      toast.error("Please upload an abstract file before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      const conferenceShortName = String(shortName || DEFAULT_SHORT_NAME)
        .replace(/[-_ ]/g, "")
        .trim()
        .toUpperCase() || DEFAULT_SHORT_NAME;
      const fullName = form.name.trim();
      const abstractText = form.abstractText.trim();
      const title = form.title.trim();
      const email = form.email.trim();
      const country = form.country.trim();
      const organization = form.organization.trim();
      const phone = form.phone.trim();
      const category = form.category.trim();
      const trackName = form.trackName.trim();
      const presentationTitle = form.presentationTitle.trim();
      const address = form.address.trim();

      fd.append("user", conferenceShortName);
      fd.append("fname", fullName);
      fd.append("title", title);
      fd.append("email", email);
      fd.append("cemail", email);
      fd.append("country", country);
      fd.append("org", organization);
      fd.append("phno", phone);
      fd.append("category", category);
      fd.append("trackName", trackName);
      fd.append("presentationTitle", presentationTitle);
      fd.append("address", address);
      fd.append("entity", "conference");
      fd.append("abstract", abstractText);
      fd.append("abstractText", abstractText);
      fd.append("conference", conferenceShortName);
      fd.append("conf", conferenceShortName);
      if (form.file) {
        fd.append("file", form.file, form.file.name);
      }

      const response = await submitAbstract(fd);
      const id = response.submissionId || response.referenceId || response.id || response.message;
      toast.success(
        id
          ? `Abstract submitted successfully. Reference ID: ${id}`
          : "Abstract submitted successfully.",
      );

      // Reset form
      setForm({
        title: "",
        name: "",
        email: "",
        phone: "",
        organization: "",
        country: "",
        presentationTitle: "",
        trackName: "",
        category: "Oral Presentation",
        address: "",
        abstractText: "",
        file: null,
      });
    } catch (error) {
      const message = getErrorMessage(error);
      console.error("Abstract submission failed", error);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckStatus = async (event: FormEvent) => {
    event.preventDefault();
    setChecking(true);
    try {
      const data = await checkAbstractStatus(submissionId);
      setStatusResult(data);
      toast.success("Abstract status loaded.");
    } catch (error) {
      toast.error(getErrorMessage(error));
      setStatusResult(null);
    } finally {
      setChecking(false);
    }
  };

  return (
    <PageShell
      eyebrow="Abstract submission"
      title="A simple submission flow for papers, posters and invited contributions"
      lead="The submission process is set up to be straightforward: choose a topic, prepare your abstract carefully and send it for review within the deadline."
    >
      {/* Tabs Selector */}
      <div className="flex border-b border-slate-200 mb-10 max-w-md">
        <button
          onClick={() => setActiveTab("submit")}
          className={`flex-1 pb-4 text-center font-bold text-sm transition-colors border-b-2 ${
            activeTab === "submit"
              ? "border-gold text-navy"
              : "border-transparent text-slate-500 hover:text-navy"
          }`}
        >
          Submit Abstract
        </button>
        <button
          onClick={() => setActiveTab("status")}
          className={`flex-1 pb-4 text-center font-bold text-sm transition-colors border-b-2 ${
            activeTab === "status"
              ? "border-gold text-navy"
              : "border-transparent text-slate-500 hover:text-navy"
          }`}
        >
          Check Status
        </button>
      </div>

      {activeTab === "submit" ? (
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          {/* Tracks Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Scientific Tracks
              </p>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Click a track to automatically select it in the form.
              </p>
              <div className="space-y-2">
                {tracks.map((track) => (
                  <button
                    key={track}
                    type="button"
                    onClick={() => handleFieldChange("trackName", track)}
                    className={`w-full rounded-xl border p-3 text-left text-xs transition ${
                      form.trackName === track
                        ? "border-navy bg-navy/5 text-navy font-semibold"
                        : "border-slate-100 bg-slate-50/50 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 border border-slate-100">
              <SectionTitle eyebrow="Submission notes" title="What authors should prepare" />
              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
                <div className="flex gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-navy shrink-0" /> Abstract of
                  approximately 300-500 words with a clear result or discussion point.
                </div>
                <div className="flex gap-3">
                  <Users className="mt-0.5 h-5 w-5 text-navy shrink-0" /> Full author names,
                  affiliations and one corresponding author contact.
                </div>
                <div className="flex gap-3">
                  <Layers className="mt-0.5 h-5 w-5 text-navy shrink-0" /> Preferred topic track,
                  presentation type and any poster or oral preference.
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-navy shrink-0" /> Original work only,
                  prepared in a clean, review-ready format.
                </div>
              </div>
              <div className="mt-8 rounded-2xl bg-navy p-5 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Deadlines
                </div>
                <div className="mt-3 space-y-2 text-sm text-slate-100">
                  <div>Submission opens: 15 Oct 2026</div>
                  <div>
                    Abstract deadline:{" "}
                    {formatDate(conferenceData?.abstract_submission_deadline) || "15 Jan 2027"}
                  </div>
                  <div>Acceptance notice: 20 Feb 2027</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Title"
                value={form.title}
                onChange={(val) => handleFieldChange("title", val)}
                placeholder="Dr / Prof / Ms / Mr"
              />
              <Field
                label="Full name"
                required
                value={form.name}
                onChange={(val) => handleFieldChange("name", val)}
                placeholder="Jane Doe"
              />
              <Field
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(val) => handleFieldChange("email", val)}
                placeholder="you@example.com"
              />
              <Field
                label="Phone"
                required
                value={form.phone}
                onChange={(val) => handleFieldChange("phone", val)}
                placeholder="+1 555 0100"
              />
              <Field
                label="Organization"
                required
                value={form.organization}
                onChange={(val) => handleFieldChange("organization", val)}
                placeholder="Institution / University"
              />
              <Field
                label="Country"
                required
                value={form.country}
                onChange={(val) => handleFieldChange("country", val)}
                placeholder="Country"
              />
              <Field
                label="Presentation title"
                required
                value={form.presentationTitle}
                onChange={(val) => handleFieldChange("presentationTitle", val)}
                placeholder="Research presentation title"
              />
              <Field
                label="Track"
                required
                value={form.trackName}
                onChange={(val) => handleFieldChange("trackName", val)}
                placeholder="Select or enter topic area"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Presentation type"
                value={form.category}
                onChange={(val) => handleFieldChange("category", val)}
                options={[
                  ["Oral Presentation", "Oral Presentation"],
                  ["Poster Presentation", "Poster Presentation"],
                  ["Workshop", "Workshop"],
                ]}
              />
              <Field
                label="Mailing address"
                value={form.address}
                onChange={(val) => handleFieldChange("address", val)}
                placeholder="Mailing address"
              />
            </div>

            <div className="mt-5">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Abstract text
                <textarea
                  required
                  rows={6}
                  value={form.abstractText}
                  onChange={(event) => handleFieldChange("abstractText", event.target.value)}
                  placeholder="Enter abstract text (approximately 300-500 words)..."
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy"
                />
              </label>
            </div>

            <div className="mt-5">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-navy/40 bg-navy/5 px-4 py-4 text-sm text-slate-700 hover:bg-navy/10 transition-colors">
                <FileUp size={18} className="text-navy" />
                <span className="font-medium">
                  {form.file ? form.file.name : "Upload abstract file (PDF/DOC/DOCX)"}
                </span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-deep disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Abstract"} <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <SectionTitle
            eyebrow="Track submission"
            title="Track your abstract status"
            lead="Enter your submission reference or ID to check its current review status from the scientific committee."
          />

          <form onSubmit={handleCheckStatus} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <input
              value={submissionId}
              onChange={(event) => setSubmissionId(event.target.value)}
              required
              placeholder="Submission ID (e.g. #ABS1234)"
              className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy"
            />
            <button
              type="submit"
              disabled={checking}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-deep disabled:opacity-50"
            >
              {checking ? "Checking..." : "Check Status"} <Search className="h-4 w-4" />
            </button>
          </form>

          {statusResult && (
            <div className="mt-8 rounded-2xl border border-navy/20 bg-navy/5 p-5 animate-in fade-in duration-300">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy">
                Status details
              </p>
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                {Object.entries(statusResult).map(([key, value]) => (
                  <div key={key} className="border-b border-slate-200/50 pb-2">
                    <dt className="font-semibold capitalize text-slate-700">
                      {key.replace(/_/g, " ")}
                    </dt>
                    <dd className="mt-1 text-slate-900">{String(value ?? "-")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}

export function RegistrationPage() {
  const { conferenceData, getConferenceName, getPricing, getPricingTierLabel } = useConference();

  const categories = [
    ["speaker", "Speaker", "For keynote, invited and oral presenters."],
    ["delegate", "Delegate", "For general conference attendees."],
    ["listener", "Listener", "For attendees who want to listen to the scientific tracks."],
    ["student", "Student", "For full-time students with valid ID."],
    ["poster", "Poster", "For poster and visual presentation authors."],
    // ["virtual", "Virtual", "For online-only participation."],
    // ["discount", "Discount", "For a reduced or sponsored registration amount."],
  ] as const;

  const [form, setForm] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
    country: "",
    category: "delegate",
    attendance: "onsite",
    abstractTitle: "",
    notes: "",
    amount: "",
    paymentProvider: "stripe",
  });

  const [includeAccommodation, setIncludeAccommodation] = useState(false);
  const [accommodationNights, setAccommodationNights] = useState(3);
  const [submitting, setSubmitting] = useState(false);

  const amount = getPricing(form.category);
  const selectedCategory =
    categories.find(([value]) => value === form.category)?.[1] || "Registration";
  const baseAmount = form.category === "discount" ? Number(form.amount || 0) : amount;
  const accommodationCost = includeAccommodation ? accommodationNights * 175 : 0;
  const subtotal = baseAmount + accommodationCost;
  const tax = subtotal * 0.05;
  const totalAmount = Math.round((subtotal + tax) * 100) / 100;
  const selectedAmount = form.category === "discount" ? baseAmount : amount;

  const formatCurrency = (val: number) => (Math.round(val * 100) / 100).toFixed(2);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.category === "discount") {
      const parsedAmount = Number(form.amount);
      if (!form.amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        toast.error("Please enter a valid discount amount.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const descriptionParts = [
        `${getConferenceName()} ${form.category} registration: €${formatCurrency(baseAmount)}`,
      ];
      if (includeAccommodation) {
        descriptionParts.push(
          `Accommodation: €175 x ${accommodationNights} nights = €${formatCurrency(accommodationCost)}`,
        );
      }
      descriptionParts.push(`Tax (5%): €${formatCurrency(tax)}`);

      const payload = {
        title: form.title,
        name: form.name,
        email: form.email,
        phone: form.phone,
        org: form.organization,
        country: form.country,
        category: form.category,
        conf: conferenceData?.ShortName || DEFAULT_SHORT_NAME,
        user: DEFAULT_SHORT_NAME,
        amount: totalAmount,
        currency: "EUR",
        description: descriptionParts.join(", "),
        includeAccommodation,
        accommodationNights,
        accommodationCost,
        paymentProvider: form.paymentProvider,
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
      };

      const response =
        form.paymentProvider === "paypal"
          ? await createPaypalPayment(payload)
          : await createStripePaymentIntent(payload);

      const redirectUrl = String(
        response.approvalUrl || response.url || response.checkoutUrl || "",
      );
      toast.success("Registration created. Continue to payment.");
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.error("Payment redirect URL could not be retrieved.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell
      eyebrow="Registration"
      title="Conference registration for delegates, presenters and students"
      lead="Use this page to capture the essential delegate details, select a category and complete the payment securely."
      primary={{ label: "Proceed to contact", to: "/contact" }}
      secondary={{ label: "View venue", to: "/venue" }}
    >
      <div className="grid gap-10 lg:grid-cols-12 items-start">
        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {getPricingTierLabel()} Rate Level
            </p>
            <div className="mt-5 space-y-3">
              {categories.map(([value, title, text]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, category: value }))}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    form.category === value
                      ? "border-navy bg-navy/5 text-navy font-semibold"
                      : "border-slate-200 bg-white text-slate-700 hover:border-navy/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{title}</span>
                    <span className="text-xs font-bold text-navy">€{getPricing(value)}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{text}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-navy p-7 text-white shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Delegate benefits
            </p>
            <h3 className="mt-3 text-2xl font-bold">What registration includes</h3>
            <div className="mt-6 space-y-3">
              <div className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 text-gold" /> Access to plenary, oral and poster
                sessions
              </div>
              <div className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 text-gold" /> Conference kit, badge and
                refreshments
              </div>
              <div className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 text-gold" /> Networking breaks and welcome
                interaction
              </div>
              <div className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 text-gold" /> Certificate of attendance after the
                event
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="mb-6 rounded-2xl border border-navy/20 bg-navy/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy/80">
                  Selected registration
                </p>
                <p className="text-base font-semibold text-navy">{selectedCategory}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Amount
                </p>
                <p className="text-lg font-bold text-navy">€{formatCurrency(selectedAmount)}</p>
              </div>
            </div>
            {form.category === "discount" && (
              <p className="mt-2 text-sm text-slate-600">
                Enter the discounted amount you want to charge below.
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Title"
              value={form.title}
              onChange={(title) => setForm((prev) => ({ ...prev, title }))}
              placeholder="Dr / Prof / Ms"
            />
            <Field
              label="Full name"
              required
              value={form.name}
              onChange={(name) => setForm((prev) => ({ ...prev, name }))}
              placeholder="Jane Doe"
            />
            <Field
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(email) => setForm((prev) => ({ ...prev, email }))}
              placeholder="you@example.com"
            />
            <Field
              label="Phone"
              required
              value={form.phone}
              onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
              placeholder="+1 555 0100"
            />
            <Field
              label="Organization"
              required
              value={form.organization}
              onChange={(organization) => setForm((prev) => ({ ...prev, organization }))}
              placeholder="Institution / Hospital / Company"
            />
            <Field
              label="Country"
              required
              value={form.country}
              onChange={(country) => setForm((prev) => ({ ...prev, country }))}
              placeholder="Country"
            />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Registration type"
              value={form.category}
              onChange={(category) => setForm((prev) => ({ ...prev, category }))}
              options={[
                ["speaker", "Speaker"],
                ["delegate", "Delegate"],
                ["listener", "Listener"],
                ["student", "Student"],
                ["poster", "Poster"],
                // ["virtual", "Virtual"],
                // ["discount", "Discount"],
              ]}
            />
            <SelectField
              label="Attendance mode"
              value={form.attendance}
              onChange={(attendance) => setForm((prev) => ({ ...prev, attendance }))}
              options={[
                ["onsite", "On-site"],
                ["virtual", "Virtual"],
              ]}
            />
          </div>

          {form.category === "discount" && (
            <div className="mt-8">
              <Field
                label="Discount amount (EUR)"
                type="number"
                required
                value={form.amount}
                onChange={(amount) => setForm((prev) => ({ ...prev, amount }))}
                placeholder="250"
              />
              <p className="mt-2 text-xs text-slate-500">
                Enter the discounted registration amount in EUR. Tax and accommodation are computed
                automatically.
              </p>
            </div>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field
              label="Abstract / paper title"
              value={form.abstractTitle}
              onChange={(abstractTitle) => setForm((prev) => ({ ...prev, abstractTitle }))}
              placeholder="Optional if already available"
            />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={includeAccommodation}
                onChange={(event) => setIncludeAccommodation(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy"
              />
              Add accommodation (€175/night)
            </label>

            {includeAccommodation && (
              <div className="mt-4 flex items-center gap-3">
                <label
                  htmlFor="accommodation-nights"
                  className="text-sm text-slate-500 font-medium"
                >
                  Nights
                </label>
                <select
                  id="accommodation-nights"
                  value={accommodationNights}
                  onChange={(event) => setAccommodationNights(Number(event.target.value))}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((night) => (
                    <option key={night} value={night}>
                      {night} {night === 1 ? "night" : "nights"}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span>Base registration</span>
              <span>€{formatCurrency(baseAmount)}</span>
            </div>
            {includeAccommodation && (
              <div className="mt-2 flex items-center justify-between text-slate-500">
                <span>
                  Accommodation ({accommodationNights}{" "}
                  {accommodationNights === 1 ? "night" : "nights"})
                </span>
                <span>€{formatCurrency(accommodationCost)}</span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between text-slate-500">
              <span>Subtotal</span>
              <span>€{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-slate-500">
              <span>Tax (5%)</span>
              <span>€{formatCurrency(tax)}</span>
            </div>
            <div className="mt-3 border-t border-slate-200 pt-3 font-semibold text-navy flex items-center justify-between text-base">
              <span>Total</span>
              <span>€{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Payment Provider
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["stripe",].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, paymentProvider: provider }))}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left capitalize transition ${
                    form.paymentProvider === provider
                      ? "border-navy bg-navy/5 text-navy font-semibold"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <Ticket size={18} />
                  {provider}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Additional notes
            </p>
            <label className="mt-4 grid gap-2 text-sm font-medium text-slate-700">
              Notes
              <textarea
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                rows={5}
                placeholder="Share any dietary needs, presentation notes, or registration questions"
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy bg-white"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-deep disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Processing Payment..." : "Submit & Continue to Payment"}{" "}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </PageShell>
  );
}




function DiscountRegistrationPageLegacy() {
  const { conferenceData, getConferenceName, getPricing, getPricingTierLabel } = useConference();

  const categories = [
    ["speaker", "Speaker", "For keynote, invited and oral presenters."],
    ["delegate", "Delegate", "For general conference attendees."],
    ["listener", "Listener", "For attendees who want to listen to the scientific tracks."],
    ["poster", "Poster", "For poster and visual presentation authors."],
    ["student", "Student", "For full-time students with valid ID."],
    ["virtual", "Virtual", "For online-only participation."],
  ] as const;

  const [form, setForm] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
    country: "",
    category: "delegate",
    attendance: "onsite",
    abstractTitle: "",
    notes: "",
    amount: String(getPricing("delegate")),
    paymentProvider: "stripe",
  });

  const [includeAccommodation, setIncludeAccommodation] = useState(false);
  const [accommodationNights, setAccommodationNights] = useState(3);
  const [submitting, setSubmitting] = useState(false);

  const baseAmount = Number(form.amount || 0);
  const accommodationCost = includeAccommodation ? accommodationNights * 175 : 0;
  const subtotal = baseAmount + accommodationCost;
  const tax = baseAmount * 0.05;
  const totalAmount = Math.round((baseAmount + tax) * 100) / 100;

  const formatCurrency = (val: number) => (Math.round(val * 100) / 100).toFixed(2);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedAmount = Number(form.amount);
    if (!form.amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid discount amount.");
      return;
    }

    setSubmitting(true);
    try {
      const descriptionParts = [
        `${getConferenceName()} ${form.category} registration: €${formatCurrency(baseAmount)}`,
      ];
      if (includeAccommodation) {
        descriptionParts.push(
          `Accommodation: €175 x ${accommodationNights} nights = €${formatCurrency(accommodationCost)}`,
        );
      }
      descriptionParts.push(`Tax (5%): €${formatCurrency(tax)}`);

      const payload = {
        title: form.title,
        name: form.name,
        email: form.email,
        phone: form.phone,
        org: form.organization,
        country: form.country,
        category: form.category,
        conf: conferenceData?.ShortName || DEFAULT_SHORT_NAME,
        user: DEFAULT_SHORT_NAME,
        amount: totalAmount,
        currency: "EUR",
        description: descriptionParts.join(", "),
        includeAccommodation,
        accommodationNights,
        accommodationCost,
        paymentProvider: form.paymentProvider,
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
      };

      const response =
        form.paymentProvider === "paypal"
          ? await createPaypalPayment(payload)
          : await createStripePaymentIntent(payload);

      const redirectUrl = String(
        response.approvalUrl || response.url || response.checkoutUrl || "",
      );
      toast.success("Registration created. Continue to payment.");
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.error("Payment redirect URL could not be retrieved.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell
      eyebrow="Registration"
      title="Conference registration for delegates, presenters and students"
      lead="Use this page to capture the essential delegate details, select a category and complete the payment securely."
      primary={{ label: "Proceed to contact", to: "/contact" }}
      secondary={{ label: "View venue", to: "/venue" }}
    >
      <div className="grid gap-10 lg:grid-cols-12 items-start">
        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {getPricingTierLabel()} Rate Level
            </p>
            <div className="mt-5 space-y-3">
              {categories.map(([value, title, text]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, category: value }))}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    form.category === value
                      ? "border-navy bg-navy/5 text-navy font-semibold"
                      : "border-slate-200 bg-white text-slate-700 hover:border-navy/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{title}</span>
                    <span className="text-xs font-bold text-navy">€{getPricing(value)}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{text}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-navy p-7 text-white shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Delegate benefits
            </p>
            <h3 className="mt-3 text-2xl font-bold">What registration includes</h3>
            <div className="mt-6 space-y-3">
              <div className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 text-gold" /> Access to plenary, oral and poster
                sessions
              </div>
              <div className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 text-gold" /> Conference kit, badge and
                refreshments
              </div>
              <div className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 text-gold" /> Networking breaks and welcome
                interaction
              </div>
              <div className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 text-gold" /> Certificate of attendance after the
                event
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Title"
              value={form.title}
              onChange={(title) => setForm((prev) => ({ ...prev, title }))}
              placeholder="Dr / Prof / Ms"
            />
            <Field
              label="Full name"
              required
              value={form.name}
              onChange={(name) => setForm((prev) => ({ ...prev, name }))}
              placeholder="Jane Doe"
            />
            <Field
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(email) => setForm((prev) => ({ ...prev, email }))}
              placeholder="you@example.com"
            />
            <Field
              label="Phone"
              required
              value={form.phone}
              onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
              placeholder="+1 555 0100"
            />
            <Field
              label="Organization"
              required
              value={form.organization}
              onChange={(organization) => setForm((prev) => ({ ...prev, organization }))}
              placeholder="Institution / Hospital / Company"
            />
            <Field
              label="Country"
              required
              value={form.country}
              onChange={(country) => setForm((prev) => ({ ...prev, country }))}
              placeholder="Country"
            />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Registration type"
              value={form.category}
              onChange={(category) => setForm((prev) => ({ ...prev, category }))}
              options={[
                ["speaker", "Speaker"],
                ["delegate", "Delegate"],
                ["listener", "Listener"],
                ["student", "Student"],
                ["poster", "Poster"],
                // ["virtual", "Virtual"],
                // ["discount", "Discount"],
              ]}
            />
            <SelectField
              label="Attendance mode"
              value={form.attendance}
              onChange={(attendance) => setForm((prev) => ({ ...prev, attendance }))}
              options={[
                ["onsite", "On-site"],
                ["virtual", "Virtual"],
              ]}
            />
          </div>

          {form.category === "discount" && (
            <div className="mt-8">
              <Field
                label="Discount amount (EUR)"
                type="number"
                required
                value={form.amount}
                onChange={(amount) => setForm((prev) => ({ ...prev, amount }))}
                placeholder="250"
              />
              <p className="mt-2 text-xs text-slate-500">
                Enter the discounted registration amount in EUR. Tax and accommodation are computed
                automatically.
              </p>
            </div>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field
              label="Abstract / paper title"
              value={form.abstractTitle}
              onChange={(abstractTitle) => setForm((prev) => ({ ...prev, abstractTitle }))}
              placeholder="Optional if already available"
            />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={includeAccommodation}
                onChange={(event) => setIncludeAccommodation(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy"
              />
              Add accommodation (€175/night)
            </label>

            {includeAccommodation && (
              <div className="mt-4 flex items-center gap-3">
                <label
                  htmlFor="accommodation-nights"
                  className="text-sm text-slate-500 font-medium"
                >
                  Nights
                </label>
                <select
                  id="accommodation-nights"
                  value={accommodationNights}
                  onChange={(event) => setAccommodationNights(Number(event.target.value))}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((night) => (
                    <option key={night} value={night}>
                      {night} {night === 1 ? "night" : "nights"}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span>Base registration</span>
              <span>€{formatCurrency(baseAmount)}</span>
            </div>
            {includeAccommodation && (
              <div className="mt-2 flex items-center justify-between text-slate-500">
                <span>
                  Accommodation ({accommodationNights}{" "}
                  {accommodationNights === 1 ? "night" : "nights"})
                </span>
                <span>€{formatCurrency(accommodationCost)}</span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between text-slate-500">
              <span>Subtotal</span>
              <span>€{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-slate-500">
              <span>Tax (5%)</span>
              <span>€{formatCurrency(tax)}</span>
            </div>
            <div className="mt-3 border-t border-slate-200 pt-3 font-semibold text-navy flex items-center justify-between text-base">
              <span>Total</span>
              <span>€{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Payment Provider
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["stripe",].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, paymentProvider: provider }))}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left capitalize transition ${
                    form.paymentProvider === provider
                      ? "border-navy bg-navy/5 text-navy font-semibold"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <Ticket size={18} />
                  {provider}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Additional notes
            </p>
            <label className="mt-4 grid gap-2 text-sm font-medium text-slate-700">
              Notes
              <textarea
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                rows={5}
                placeholder="Share any dietary needs, presentation notes, or registration questions"
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy bg-white"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-deep disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Processing Payment..." : "Submit & Continue to Payment"}{" "}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </PageShell>
  );
}

export function DiscountRegistrationPage() {
  const { conferenceData, getConferenceName, getPricing, getPricingTierLabel } = useConference();

  const categories = [
    ["speaker", "Speaker"],
    ["delegate", "Delegate"],
    ["listener", "Listener"],
    ["poster", "Poster"],
    ["student", "Student"],
    ["virtual", "Virtual"],
  ] as const;

  const [form, setForm] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
    country: "",
    category: "delegate",
    amount: String(getPricing("delegate")),
    paymentProvider: "stripe",
  });
  const [submitting, setSubmitting] = useState(false);

  const baseAmount = Number(form.amount || 0);
  const tax = baseAmount * 0.05;
  const totalAmount = Math.round((baseAmount + tax) * 100) / 100;
  const formatCurrency = (value: number) => (Math.round(value * 100) / 100).toFixed(2);

  const handleCategoryChange = (category: string) => {
    setForm((prev) => ({
      ...prev,
      category,
      amount: String(getPricing(category)),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedAmount = Number(form.amount);
    if (!form.amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid discount amount.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        name: form.name,
        email: form.email,
        phone: form.phone,
        org: form.organization,
        country: form.country,
        category: form.category,
        conf: conferenceData?.ShortName || DEFAULT_SHORT_NAME,
        user: DEFAULT_SHORT_NAME,
        amount: totalAmount,
        currency: "EUR",
        description: `${getConferenceName()} ${form.category} registration: EUR ${formatCurrency(
          baseAmount,
        )}, Tax (5%): EUR ${formatCurrency(tax)}`,
        paymentProvider: form.paymentProvider,
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
      };

      const response =
        form.paymentProvider === "paypal"
          ? await createPaypalPayment(payload)
          : await createStripePaymentIntent(payload);

      const redirectUrl = String(
        response.approvalUrl || response.url || response.checkoutUrl || "",
      );
      toast.success("Registration created. Continue to payment.");
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.error("Payment redirect URL could not be retrieved.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell
      eyebrow="Registration"
      title="Conference registration for delegates, presenters and students"
      lead="Use this page to capture the essential delegate details, select a category and complete the payment securely."
      primary={{ label: "Proceed to contact", to: "/contact" }}
      secondary={{ label: "View venue", to: "/venue" }}
    >
      <div className="grid gap-10 lg:grid-cols-12 items-start">
        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {getPricingTierLabel()} Rate
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Rate updates automatically from the conference deadline data when available.
            </p>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Base Amount</span>
                <span>{"€"}{formatCurrency(baseAmount)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-slate-600">
                <span>Tax (5%)</span>
                <span>{"€"}{formatCurrency(tax)}</span>
              </div>
              <div className="mt-3 border-t border-slate-200 pt-3 font-semibold text-navy flex items-center justify-between text-base">
                <span>Total</span>
                <span>{"€"}{formatCurrency(totalAmount)}</span>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              {categories.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleCategoryChange(value)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                    form.category === value
                      ? "border-navy bg-navy/5 text-navy font-semibold"
                      : "border-slate-200 bg-white text-slate-700 hover:border-navy/40"
                  }`}
                >
                  <span>{label}</span>
                  <span className="font-semibold">{"€"}{getPricing(value)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Title"
              value={form.title}
              onChange={(title) => setForm((prev) => ({ ...prev, title }))}
              placeholder="Dr / Prof / Ms"
            />
            <Field
              label="Full name"
              required
              value={form.name}
              onChange={(name) => setForm((prev) => ({ ...prev, name }))}
              placeholder="Jane Doe"
            />
            <Field
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(email) => setForm((prev) => ({ ...prev, email }))}
              placeholder="you@example.com"
            />
            <Field
              label="Phone"
              required
              value={form.phone}
              onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
              placeholder="+1 555 0100"
            />
            <Field
              label="Organization"
              required
              value={form.organization}
              onChange={(organization) => setForm((prev) => ({ ...prev, organization }))}
              placeholder="Institution / Hospital / Company"
            />
            <Field
              label="Country"
              required
              value={form.country}
              onChange={(country) => setForm((prev) => ({ ...prev, country }))}
              placeholder="Country"
            />
          </div>

          <div className="mt-8">
            <Field
              label="Discount amount (EUR)"
              type="number"
              required
              value={form.amount}
              onChange={(amount) => setForm((prev) => ({ ...prev, amount }))}
              placeholder="749"
            />
            <p className="mt-2 text-xs text-slate-500">
              Enter the discounted amount in EUR that should be charged for this registration and
              5% tax will be added automatically.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Payment Provider
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["stripe"].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, paymentProvider: provider }))}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left capitalize transition ${
                    form.paymentProvider === provider
                      ? "border-navy bg-navy/5 text-navy font-semibold"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <Ticket size={18} />
                  {provider}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-deep disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating Payment..." : "Continue to Payment"}{" "}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </PageShell>
  );
}

export function VenuePage() {
  return (
    <PageShell
      eyebrow="Venue"
      title="Milan, Italy, as the setting for a high-energy international congress"
      lead="The venue layout is planned to support plenaries, breakouts and informal meetings, while the city gives attendees strong travel and cultural appeal."
      primary={{ label: "Get in touch", to: "/contact" }}
      secondary={{ label: "Register now", to: "/registration" }}
    >
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&q=80"
            alt="Milan city"
            className="h-full w-full object-cover min-h-[420px]"
            loading="lazy"
          />
        </div>
        <div>
          <SectionTitle
            eyebrow="Travel and stay"
            title="Everything delegates need to plan the trip"
            lead="The venue page can support common attendee questions before arrival, reducing follow-up and helping with travel planning."
          />
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <InfoCard
              icon={Plane}
              title="Arriving by air"
              text="Milan is served by major airports with onward rail and taxi connections into the city."
            />
            <InfoCard
              icon={MapPin}
              title="Local transport"
              text="Metro, tram and taxi options make it easy to move between the venue, hotels and city landmarks."
            />
            <InfoCard
              icon={Building2}
              title="Accommodation"
              text="Choose from nearby business hotels, city-centre options and longer-stay apartments."
            />
            <InfoCard
              icon={Globe}
              title="City experience"
              text="Delegates can combine the congress with art, architecture, food and design across Milan."
            />
          </div>
        </div>
      </div>

      <div className="mt-16 grid lg:grid-cols-3 gap-5">
        <div className="rounded-3xl bg-slate-50 p-6">
          <Building2 className="h-11 w-11 rounded-2xl bg-navy/10 p-2.5 text-navy" />
          <h3 className="mt-4 text-lg font-bold text-navy">Conference space</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Rooms are structured for keynote sessions, parallel presentations and small-group
            meetings.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6">
          <Clock3 className="h-11 w-11 rounded-2xl bg-navy/10 p-2.5 text-navy" />
          <h3 className="mt-4 text-lg font-bold text-navy">Delegate flow</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            The event layout should minimize congestion and keep transitions between sessions
            smooth.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6">
          <Globe className="h-11 w-11 rounded-2xl bg-navy/10 p-2.5 text-navy" />
          <h3 className="mt-4 text-lg font-bold text-navy">International access</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Milan is a strong hub for delegates traveling from Europe, the Middle East, Asia and the
            Americas.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

export function ContactPage() {
  const { conferenceData, getConferenceEmail } = useConference();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiry_type: "general",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await submitContact({
        ...form,
        user: conferenceData?.ShortName || DEFAULT_SHORT_NAME,
      });
      toast.success("Message sent successfully.");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiry_type: "general",
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const emailVal = getConferenceEmail();
  const phoneVal = (conferenceData?.Phone as string) || "+39 02 1234 5678";

  return (
    <PageShell
      eyebrow="Contact"
      title="Reach the organizing team for abstracts, registration and general support"
      lead="Use this page to route questions quickly so authors, delegates and speakers can find the right contact without hunting through the site."
      primary={{ label: "Submit abstract", to: "/submission" }}
      secondary={{ label: "Register", to: "/registration" }}
    >
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
        <div className="space-y-4">
          <InfoCard
            icon={Mail}
            title="General email"
            text={`${emailVal} for conference questions, speaker enquiries and updates.`}
          />
          <InfoCard
            icon={Phone}
            title="Phone"
            text={`${phoneVal} for direct support during office hours.`}
          />
          <InfoCard
            icon={Clock3}
            title="Response window"
            text="The team aims to respond within one to two business days for non-urgent requests."
          />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <SectionTitle
            eyebrow="Send a message"
            title="A simple inquiry form for delegate support"
            lead="Fill out this form and the event organizers will review your inquiry and follow up promptly."
          />
          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy"
                  placeholder="Your full name"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Phone
                <input
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy"
                  placeholder="+1 555 0100"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Inquiry Type
                <select
                  value={form.inquiry_type}
                  onChange={(e) => setForm((prev) => ({ ...prev, inquiry_type: e.target.value }))}
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none bg-white focus:border-navy text-sm"
                >
                  <option value="general">General Inquiry</option>
                  <option value="registration">Registration Support</option>
                  <option value="abstract">Abstract Submission</option>
                  <option value="sponsorship">Sponsorship Opportunity</option>
                </select>
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Subject
              <input
                required
                value={form.subject}
                onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy"
                placeholder="How can we help?"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Message
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                className="min-h-40 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-navy"
                placeholder="Tell us more about how we can support you..."
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-deep disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
