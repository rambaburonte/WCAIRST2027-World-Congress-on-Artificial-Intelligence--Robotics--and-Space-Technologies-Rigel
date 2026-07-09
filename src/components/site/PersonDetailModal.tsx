import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, BookOpen, Award, Globe } from "lucide-react";

interface Person {
  name: string;
  title: string;
  institution: string;
  country: string;
  initials: string;
  accent: string;
  photo?: string;
  bio?: string;
  email?: string;
  research?: string;
  category?: string;
}

interface Props {
  person: Person | null;
  onClose: () => void;
}

export function PersonDetailModal({ person, onClose }: Props) {
  return (
    <AnimatePresence>
      {person && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 text-slate-900 shadow-2xl z-10 flex flex-col"
          >
            {/* Header background with person gradient */}
            <div
              className={`relative p-8 text-white bg-gradient-to-br ${person.accent || "from-navy to-navy-deep"} flex justify-between items-start`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  {person.category || person.title || "Faculty Detail"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-1 leading-tight">{person.name}</h2>
                <p className="text-white/90 text-sm mt-1">{person.institution}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8 space-y-6">
              {/* Photo & Basic info block */}
              <div className="flex flex-col sm:flex-row gap-6">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-full sm:w-44 h-48 sm:h-56 object-cover rounded-2xl shadow border border-slate-100"
                  />
                ) : (
                  <div
                    className={`w-full sm:w-44 h-48 sm:h-56 rounded-2xl bg-gradient-to-br ${person.accent || "from-navy to-navy-deep"} flex items-center justify-center shadow`}
                  >
                    <span className="text-5xl font-bold text-white/90 drop-shadow-md">
                      {person.initials}
                    </span>
                  </div>
                )}

                <div className="flex-1 space-y-4 py-2">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Globe size={16} className="text-gold" />
                    <span className="font-semibold">{person.country}</span>
                  </div>
                  {person.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-700 hover:text-navy transition-colors">
                      <Mail size={16} className="text-gold" />
                      <a
                        href={`mailto:${person.email}`}
                        className="break-all font-semibold underline"
                      >
                        {person.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Award size={16} className="text-gold" />
                    <span>{person.title || person.category || "Faculty"}</span>
                  </div>
                </div>
              </div>

              {/* Biography Section */}
              {person.bio && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-navy font-bold text-sm uppercase tracking-wider">
                    <BookOpen size={16} className="text-gold" />
                    <span>Biography</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                    {person.bio}
                  </p>
                </div>
              )}

              {/* Research Interests Section */}
              {person.research && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-navy font-bold text-sm uppercase tracking-wider">
                    <Award size={16} className="text-gold" />
                    <span>Research Interests</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                    {person.research}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
