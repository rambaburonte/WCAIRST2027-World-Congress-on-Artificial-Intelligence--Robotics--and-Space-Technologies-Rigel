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
  Wrench,
  Plane,
  Thermometer,
  Cpu,
  Building2,
  Bot,
  Leaf,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.p {...fadeUp} className="text-gold font-semibold tracking-widest text-sm">
          WORLD CONGRESS ON
        </motion.p>
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl"
        >
          MECHANICAL AND
          <br />
          AEROSPACE ENGINEERING
        </motion.h1>
        <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 text-slate-200 max-w-2xl">
          Innovating Today for a Smarter, Safer and Sustainable Tomorrow
        </motion.p>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mt-6 flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold" /> May 12–14, 2027
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" /> Milan, Italy
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="mt-8 flex flex-wrap gap-3">
          <a href="#" className="rounded-md bg-gold px-6 py-3 font-bold text-navy hover:bg-gold-deep transition-colors">
            REGISTER NOW
          </a>
          <a href="#" className="rounded-md border-2 border-white/70 px-6 py-3 font-bold hover:bg-white hover:text-navy transition-colors">
            SUBMIT ABSTRACT
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Statistics() {
  const stats = [
    { icon: Users, value: "500+", label: "Participants" },
    { icon: Mic, value: "70+", label: "Expert Speakers" },
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
  const features = [
    { icon: Users2, title: "KNOWLEDGE EXCHANGE", text: "Discussion on emerging technologies, challenges and innovations" },
    { icon: Network, title: "GLOBAL NETWORKING", text: "Connect with leading researchers, professionals and organizations" },
    { icon: Cog, title: "TECHNOLOGY SHOWCASE", text: "Explore the latest technologies and industry solutions" },
    { icon: Handshake, title: "COLLABORATION", text: "Build partnerships and collaborations for future research and projects" },
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
          The World Congress on Mechanical and Aerospace Engineering brings together
          global experts, researchers, engineers, industry leaders and innovators to
          exchange knowledge, discuss cutting-edge advancements, and explore future
          trends in mechanical and aerospace engineering.
        </p>
        <button className="mt-6 rounded-md border-2 border-navy px-6 py-2 text-sm font-bold text-navy hover:bg-navy hover:text-white transition-colors">
          READ MORE
        </button>
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

function WhyAttend() {
  const points = [
    "Learn from world-class experts and keynote speakers",
    "Present your research and gain global visibility",
    "Explore innovations in mechanical and aerospace industries",
    "Discover collaboration and funding opportunities",
    "Enjoy Milan – a global hub of culture, design and innovation",
  ];
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2">
        <div
          className="min-h-[300px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1200&q=80)",
          }}
        />
        <div className="px-6 sm:px-10 py-12 lg:py-16">
          <h3 className="text-gold text-2xl font-bold">WHY ATTEND WCMAE 2027?</h3>
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
        <form className="flex w-full sm:w-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 sm:w-64 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-navy"
          />
          <button className="rounded-md bg-gold px-5 py-2 font-bold text-navy text-sm hover:bg-gold-deep transition-colors">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}

function Sessions() {
  const days = [
    { day: "DAY 1", date: "May 12, 2027", items: ["Opening Ceremony", "Plenary & Keynote Lectures", "Technical Sessions", "Exhibition & Welcome Reception"] },
    { day: "DAY 2", date: "May 13, 2027", items: ["Keynote Lectures", "Parallel Technical Sessions", "Workshops & Panel Discussions", "Networking Dinner"] },
    { day: "DAY 3", date: "May 14, 2027", items: ["Keynote Lectures", "Technical Sessions", "Best Paper Awards", "Closing Ceremony"] },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">SESSIONS PROGRAM</h2>
          <div className="mt-2 h-1 w-16 bg-gold" />
          <p className="mt-4 text-slate-600">
            Three days of inspiring keynotes, technical sessions, workshops, panel
            discussions and networking opportunities.
          </p>
          <button className="mt-6 rounded-md bg-navy px-6 py-2 text-sm font-bold text-white hover:bg-navy-deep transition-colors">
            VIEW DETAILED PROGRAM
          </button>
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

function Tracks() {
  const tracks = [
    { icon: Wrench, label: "Advanced Manufacturing & Materials" },
    { icon: Plane, label: "Aerospace Vehicles & Propulsion" },
    { icon: Thermometer, label: "Thermal & Fluid Systems" },
    { icon: Cpu, label: "Design, Simulation & Optimization" },
    { icon: Building2, label: "Structures, Dynamics & Vibration" },
    { icon: Bot, label: "Control, Automation & Mechatronics" },
    { icon: Zap, label: "Emerging Technologies in Engineering" },
    { icon: Leaf, label: "Sustainability & Green Engineering" },
    { icon: Layers, label: "Additive Manufacturing" },
    { icon: ShieldCheck, label: "Safety, Reliability & Maintenance" },
  ];
  return (
    <section className="bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">CONFERENCE TRACKS</h2>
            <div className="mt-2 h-1 w-16 bg-gold" />
          </div>
          <button className="rounded-md border-2 border-navy px-5 py-2 text-xs font-bold text-navy hover:bg-navy hover:text-white transition-colors">
            VIEW ALL TRACKS
          </button>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {tracks.map(({ icon: Icon, label }) => (
            <div key={label} className="text-center group cursor-pointer">
              <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-white shadow group-hover:bg-navy transition-colors">
                <Icon className="h-6 w-6 text-navy group-hover:text-gold transition-colors" />
              </div>
              <div className="mt-3 text-xs font-semibold text-slate-700">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dates() {
  const dates = [
    ["Abstract Submission Opens", "Oct 15, 2026"],
    ["Abstract Submission Deadline", "Jan 15, 2027"],
    ["Notification of Acceptance", "Feb 20, 2027"],
    ["Early Bird Registration Deadline", "Mar 10, 2027"],
    ["Regular Registration Deadline", "Apr 20, 2027"],
    ["Final Paper Submission Deadline", "Apr 30, 2027"],
    ["Conference Dates", "May 12–14, 2027"],
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
          src="https://images.unsplash.com/photo-1520440229-6469a149ac07?w=1200&q=80"
          alt="Milan cathedral"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <div className="font-bold text-lg tracking-wide">MILAN, ITALY</div>
          <p className="mt-2 text-sm text-slate-200 max-w-md">
            Experience the perfect blend of history, culture, fashion and
            innovation in one of Europe's most vibrant cities.
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
        This page is under construction. Content for {title.toLowerCase()} will be
        published soon. In the meantime, explore the homepage for congress
        highlights.
      </p>
    </section>
  );
}

// unused reexport safety
export { Lightbulb };