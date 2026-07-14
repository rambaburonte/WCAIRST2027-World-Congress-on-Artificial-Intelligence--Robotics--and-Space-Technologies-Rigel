import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConference } from "@/context/ConferenceContext";

const links = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/program", label: "PROGRAM" },
  { to: "/speakers", label: "SPEAKERS" },
  { to: "/committee", label: "COMMITTEE" },
  { to: "/submission", label: "SUBMISSION" },
  // { to: "/registration", label: "REGISTRATION" },
  { to: "/venue", label: "VENUE" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function Navbar() {
const [open, setOpen] = useState(false);
  const { conferenceData } = useConference();
  
  const shortName = conferenceData?.ShortName || "WCMAE2027";
  
  // 1. Find any 4-digit number in the string to use as the year
  const yearMatch = String(shortName).match(/\d{4}/);
  const yearName = yearMatch ? yearMatch[0] : "2027";
  
  // 2. Remove the year (and any optional hyphen/space before it) to get the base name
  const baseName = String(shortName).replace(/[-\s]?\d{4}/, "").trim() || "WCMAE";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-9 w-9 rounded-md bg-navy grid place-items-center text-gold">
            <Plane className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-navy tracking-tight">
              {baseName} <span className="text-gold">{yearName}</span>
            </div>
            <div className="text-[9px] tracking-[0.2em] text-slate-500">
              INNOVATE · ENGINEER · ELEVATE
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-slate-700">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-navy transition-colors"
              activeProps={{ className: "text-navy border-b-2 border-gold pb-1" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/registration"
          className="hidden lg:inline-flex items-center rounded-md bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-navy-deep transition-colors"
        >
          REGISTER NOW
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden text-navy"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-slate-200 bg-white"
          >
            <div className="px-4 py-4 flex flex-col gap-3 text-sm font-semibold text-slate-700">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-1 hover:text-navy"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/registration"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center rounded-md bg-navy px-4 py-2 text-white"
              >
                REGISTER NOW
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
