import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users,
  Mic,
  Globe,
  Handshake,
  Lightbulb,
  Network,
  Cog,
  Users2,
  Calendar,
  MapPin,
  Check,
  Mail,
  Rocket,
  Bot,
  BrainCircuit,
  Plane,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useConference, DEFAULT_SHORT_NAME } from "@/context/ConferenceContext";
import { subscribe, getErrorMessage } from "@/lib/api";
import { SpeakerCard } from "@/components/site/InnerPages";
import hero1 from "/hero1.avif";
import hero from "/hero.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

function Hero() {
  const { conferenceData, getConferenceName } = useConference();
  const name = getConferenceName();
  const dates = conferenceData?.ConferenceDates ;
  const venue = conferenceData?.ConferenceVenue ;

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-navy/10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.p {...fadeUp} className="text-gold font-semibold tracking-widest text-sm uppercase">
          WORLD CONGRESS ON
        </motion.p>
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl uppercase"
        >
          {name.includes("World Congress on") ? name.replace("World Congress on", "").trim() : name}
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-slate-200 max-w-2xl"
        >
          Innovating Today for a Smarter, Safer and Sustainable Tomorrow
        </motion.p>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 flex flex-wrap items-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold" /> {dates}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" /> {venue}
          </div>
        </motion.div>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            to="/registration"
            className="rounded-md bg-gold px-6 py-3 font-bold text-navy hover:bg-gold-deep transition-colors"
          >
            REGISTER NOW
          </Link>
          <Link
            to="/submission"
            className="rounded-md border-2 border-white/70 px-6 py-3 font-bold hover:bg-white hover:text-navy transition-colors"
          >
            SUBMIT ABSTRACT
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Statistics() {
  const { speakers } = useConference();
  const stats = [
    { icon: Users, value: "500+", label: "Participants" },
    { icon: Mic, value: `${speakers.length || 70}+`, label: "Expert" },
    { icon: Globe, value: "40+", label: "Countries" },
    { icon: Handshake, value: "20+", label: "Sponsors & Exhibitors" },
  ];
  return (
    <section className="relative -mt-10 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-xl bg-navy-deep shadow-2xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3 text-white">
            <Icon className="h-8 w-8 text-gold shrink-0" />
            <div className="min-w-0">
              <div className="text-2xl font-bold text-gold">{value}</div>
              <div className="text-xs text-slate-300">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const { getConferenceName } = useConference();
  const features = [
    {
      icon: Users2,
      title: "KNOWLEDGE EXCHANGE",
      text: "Discussion on emerging technologies, challenges and innovations",
    },
    {
      icon: Network,
      title: "GLOBAL NETWORKING",
      text: "Connect with leading researchers, professionals and organizations",
    },
    {
      icon: Cog,
      title: "TECHNOLOGY SHOWCASE",
      text: "Explore the latest technologies and industry solutions",
    },
    {
      icon: Handshake,
      title: "COLLABORATION",
      text: "Build partnerships and collaborations for future research and projects",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12">
      <motion.div {...fadeUp}>
        <p className="text-gold font-semibold tracking-widest text-xs">ABOUT THE CONGRESS</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy leading-tight">
          Advancing Engineering.
          <br />
          Shaping the Future.
        </h2>
        <p className="mt-5 text-slate-600 leading-relaxed">
          The {getConferenceName()} brings together global experts, researchers, engineers, industry
          leaders and innovators to exchange knowledge, discuss cutting-edge advancements, and
          explore future trends in artificial intelligence, robotics, and space technologies.
        </p>
        <Link
          to="/about"
          className="mt-6 inline-flex rounded-md border-2 border-navy px-6 py-2 text-sm font-bold text-navy hover:bg-navy hover:text-white transition-colors"
        >
          READ MORE
        </Link>
      </motion.div>
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-lg bg-slate-50 p-5 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <Icon className="h-8 w-8 text-gold" />
            <div className="mt-3 font-bold text-navy text-sm">{title}</div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedSpeakers() {
  const { speakers } = useConference();
  const plenary = speakers.filter((speaker) => speaker.category === "Plenary");
  const keynote = speakers.filter((speaker) => speaker.category === "Keynote");

  const speakerCard = (speaker: typeof speakers[number], index: number) => (
    <SpeakerCard speaker={speaker} index={index} />
  );

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid gap-10">
        <div>
          <p className="text-gold font-semibold tracking-widest text-xs">FEATURED SPEAKERS</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy">Plenary & Keynote Addresses</h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Meet the distinguished plenary and keynote speakers leading the conference with
            visionary insights and technical expertise.
          </p>
        </div>

        <div className="grid gap-12">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-2xl font-bold text-navy">Plenary Speakers</h3>
                <p className="text-sm text-slate-500">
                  Leading experts delivering the main thematic talks across AI, robotics, and space
                  technologies.
                </p>
              </div>
              <Link
                to="/speakers"
                className="inline-flex items-center rounded-md border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
              >
                View All Speakers
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {plenary.length > 0 ? (
                plenary.slice(0, 3).map(speakerCard)
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                  Plenary speaker details are being loaded from the conference backend.
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-navy">Keynote Speakers</h3>
            <p className="mt-2 text-sm text-slate-500">
              High-impact keynote sessions from global leaders shaping the future of engineering.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {keynote.length > 0 ? (
                keynote.slice(0, 3).map(speakerCard)
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                  Keynote speaker details are being loaded from the conference backend.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyAttend() {
  const { getConferenceName } = useConference();
  const points = [
    "Learn from world-class experts and keynote speakers",
    "Present your research and gain global visibility",
    "Explore innovations in mechanical and aerospace industries",
    "Discover collaboration and funding opportunities",
    "Enjoy the vibrant atmosphere of the host city",
  ];
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2">
        <div
          className="min-h-[300px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero1})`,
          }}
        />
        <div className="px-6 sm:px-10 py-12 lg:py-16">
          <h3 className="text-gold text-2xl font-bold uppercase">
            WHY ATTEND {getConferenceName()}?
          </h3>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 items-start text-sm">
                <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { conferenceData } = useConference();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await subscribe({
        email,
        category: "newsletter",
        user: conferenceData?.ShortName || DEFAULT_SHORT_NAME,
      });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mail className="h-8 w-8 text-navy" />
          <div>
            <div className="font-bold text-navy text-sm">STAY UPDATED</div>
            <div className="text-xs text-slate-500">
              Subscribe to our newsletter for the latest updates.
            </div>
          </div>
        </div>
        <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={submitting}
            className="flex-1 sm:w-64 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-navy"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-gold px-5 py-2 font-bold text-navy text-sm hover:bg-gold-deep transition-colors disabled:opacity-50"
          >
            {submitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </button>
        </form>
      </div>
    </section>
  );
}







const getConferenceDays = (conferenceDates?: string) => {
  if (!conferenceDates) {
    return ["May 12, 2027", "May 13, 2027", "May 14, 2027"];
  }

  // Example: "May 12–14, 2027"
  const match = conferenceDates.match(
    /^([A-Za-z]+)\s+(\d+)[–-](\d+),\s*(\d{4})$/
  );

  if (!match) {
    return [conferenceDates];
  }

  const [, month, startDay, endDay, year] = match;

  const days = [];

  for (let day = Number(startDay); day <= Number(endDay); day++) {
    days.push(`${month} ${day}, ${year}`);
  }

  return days;
};

function Sessions() {
  const { conferenceData } = useConference();
  // const dates = conferenceData?.ConferenceDates || "May 12–14, 2027";
  const conferenceDays = getConferenceDays(conferenceData?.ConferenceDates);

  const days = [
    {
      day: "DAY 1",
      date: conferenceDays[0],
      items: [
        "Opening Ceremony",
        "Plenary & Keynote Lectures",
        "Technical Sessions",
        "Exhibition & Welcome Reception",
      ],
    },
    {
      day: "DAY 2",
      date: conferenceDays[1],
      items: [
        "Keynote Lectures",
        "Parallel Technical Sessions",
        "Workshops & Panel Discussions",
        "Networking Dinner",
      ],
    },
    {
      day: "DAY 3",
      date:conferenceDays[2],
      items: ["Keynote Lectures", "Technical Sessions", "Best Paper Awards", "Closing Ceremony"],
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">SESSIONS PROGRAM</h2>
          <div className="mt-2 h-1 w-16 bg-gold" />
          <p className="mt-4 text-slate-600">
            Three days of inspiring keynotes, technical sessions, workshops, panel discussions and
            networking opportunities.
          </p>
          <Link
            to="/program"
            className="mt-6 inline-flex rounded-md bg-navy px-6 py-2 text-sm font-bold text-white hover:bg-navy-deep transition-colors"
          >
            VIEW DETAILED PROGRAM
          </Link>
        </div>
        <div
          className="h-56 lg:h-64 rounded-lg bg-cover bg-center shadow-lg"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80)",
          }}
        />
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {days.map((d, i) => (
          <motion.div
            key={d.day}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-lg bg-slate-50 p-6 hover:shadow-xl transition-shadow"
          >
            <Calendar className="h-8 w-8 text-navy bg-navy/10 p-1.5 rounded" />
            <div className="mt-3 text-gold font-bold">{d.day}</div>
            <div className="text-sm text-slate-500">{d.date}</div>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
              {d.items.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function getTrackIconForName(trackName: string) {
  const value = trackName.toLowerCase();

  if (/(ai|artificial intelligence|machine learning|deep learning|cognitive|neural|brain|intelligence)/.test(value)) return BrainCircuit;
  if (/(robot|automation|autonomous|control|vision|intelligent systems|cyber)/.test(value)) return Bot;
  if (/(space|aerospace|rocket|orbit|satellite|exploration|astronomy|launch)/.test(value)) return Rocket;
  if (/(transport|mobility|drone|flight|aviation|uav|navigation)/.test(value)) return Plane;
  if (/(sustain|green|climate|environment|energy|earth|ecology|renew)/.test(value)) return Leaf;
  if (/(health|safety|risk|security|resilience|defense|policy)/.test(value)) return ShieldCheck;
  if (/(people|community|professionals|team|network|user|speaker)/.test(value)) return Users;

  return Lightbulb;
}

function Tracks() {
  const { tracks } = useConference();

  return (
    <section className="bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">CONFERENCE TRACKS</h2>
            <div className="mt-2 h-1 w-16 bg-gold" />
          </div>
          <Link
            to="/submission"
            className="rounded-md border-2 border-navy px-5 py-2 text-xs font-bold text-navy hover:bg-navy hover:text-white transition-colors"
          >
            VIEW ALL TRACKS
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {tracks.map((track) => {
            const fallbackIcon = getTrackIconForName(track.name);
            const Icon = track.icon && typeof track.icon !== "string" ? track.icon : fallbackIcon;

            return (
              <div key={track.id} className="text-center group cursor-pointer">
                <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-white shadow group-hover:bg-navy transition-colors">
                  <Icon className="h-6 w-6 text-navy group-hover:text-gold transition-colors" />
                </div>
                <div className="mt-3 text-xs font-semibold text-slate-700">{track.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Dates() {
  const { conferenceData } = useConference();

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

  const dates = [
    ["Abstract Submission Opens", "July 14, 2026"],
    [
      "Abstract Submission Deadline",
      formatDate(conferenceData?.abstract_submission_deadline),
    ],
    ["Notification of Acceptance", "Within 24hrs"],
    ["Early Bird Registration Deadline", formatDate(conferenceData?.EarlyBird) ],
    ["Regular Registration Deadline", formatDate(conferenceData?.mid_term) || "Dec 17, 2026"],
    [
      "Final Paper Submission Deadline",
      formatDate(conferenceData?.registration_deadline) || "Apr 27, 2027",
    ],
    ["Conference Dates", conferenceData?.ConferenceDates || "May 16–18, 2027"],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-10">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-navy">IMPORTANT DATES</h2>
        <div className="mt-2 h-1 w-16 bg-gold" />
        <ul className="mt-8 divide-y divide-slate-200">
          {dates.map(([label, date]) => (
            <li key={label} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
              <Calendar className="h-4 w-4 text-gold" />
              <span className="text-sm text-slate-700">{label}</span>
              <span className="text-sm font-semibold text-navy">{date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative rounded-xl overflow-hidden min-h-[400px] shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&q=80"
          alt="Milan cathedral"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <div className="font-bold text-lg tracking-wide">MILAN, ITALY</div>
          <p className="mt-2 text-sm text-slate-200 max-w-md">
            Experience the perfect blend of history, culture, fashion and innovation in one of
            Europe's most vibrant cities.
          </p>
          <button className="mt-4 rounded-md bg-gold px-5 py-2 text-xs font-bold text-navy hover:bg-gold-deep transition-colors">
            EXPLORE MILAN
          </button>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Statistics />
      <About />
      <FeaturedSpeakers />
      <WhyAttend />
      <Newsletter />
      <Sessions />
      <Tracks />
      <Dates />
    </>
  );
}

export function PagePlaceholder({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 min-h-[60vh]">
      <h1 className="text-4xl font-bold text-navy">{title}</h1>
      <div className="mt-2 h-1 w-16 bg-gold" />
      <p className="mt-6 text-slate-600 max-w-2xl">
        This page is under construction. Content for {title.toLowerCase()} will be published soon.
        In the meantime, explore the homepage for congress highlights.
      </p>
    </section>
  );
}

export { Lightbulb };
