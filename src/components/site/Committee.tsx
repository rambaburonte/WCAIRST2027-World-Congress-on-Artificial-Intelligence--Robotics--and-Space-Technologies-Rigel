import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useConference } from "@/context/ConferenceContext";
import type { CommitteeMember } from "@/constants/conference";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45 },
};

function CommitteeCard({ member, index = 0, onClick }: { member: CommitteeMember; index?: number; onClick?: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className={`relative aspect-[4/5] bg-gradient-to-br ${member.accent || "from-navy to-navy-deep"}`}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-6xl font-bold text-white/90 drop-shadow-lg">{member.initials}</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">Committee</p>
        <h3 className="mt-2 text-lg font-semibold leading-tight text-navy">{member.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{member.title || member.institution}</p>
        {member.bio && (
          <p className="mt-3 text-xs leading-relaxed text-slate-500 line-clamp-2 font-medium border-t border-slate-100 pt-2">
            {member.bio}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export function CommitteePage() {
  const { committee, loading } = useConference();
  const [selected, setSelected] = useState<CommitteeMember | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid gap-8">
        <div>
          <p className="text-gold font-semibold tracking-widest text-xs">ORGANIZING COMMITTEE</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy">Local & Scientific Committee</h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            The organizing committee oversees the scientific program, reviewer assignments and session
            organization. Meet the people guiding the technical direction of the congress.
          </p>
        </div>

        <div>
          {loading && <p className="text-sm text-slate-500">Loading committee data...</p>}
          {!loading && committee.length === 0 && (
            <p className="text-sm text-slate-500">No committee members found for this conference.</p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {committee.map((m, i) => (
              <CommitteeCard key={`${m.name}-${i}`} member={m} index={i} onClick={() => setSelected(m)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
