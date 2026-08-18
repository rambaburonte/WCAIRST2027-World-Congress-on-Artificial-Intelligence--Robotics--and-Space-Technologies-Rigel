import { Mail, Phone, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";
import { useConference } from "@/context/ConferenceContext";

export function Footer() {
  const { getConferenceName, getConferenceEmail, conferenceData } = useConference();
  const phone = (conferenceData?.Phone as string) || "+44 7344897352";

  return (
    <footer className="bg-navy-deep text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white font-semibold mb-3">
            <Mail className="h-4 w-4 text-gold" /> STAY UPDATED
          </div>
          <p className="text-sm text-slate-400">
            Subscribe to our newsletter for the latest updates and announcements.
          </p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">FOLLOW US</div>
          <div className="flex gap-3">
            {[Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-navy transition-colors"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">CONTACT US</div>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" /> {getConferenceEmail()}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" /> {phone}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © 2027 {getConferenceName()}. All rights reserved.
      </div>
    </footer>
  );
}
