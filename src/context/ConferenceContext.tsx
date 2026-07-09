import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  CONFERENCE,
  SESSIONS,
  SPEAKERS,
  type Speaker,
  COMMITTEE,
  type CommitteeMember,
} from "@/constants/conference";
import {
  getCallForAbstractsByUser,
  getConferenceLoginDetails,
  getErrorMessage,
  getImportantDetailsByShortName,
  getMembersByUser,
  getVenueInfo,
} from "@/lib/api";

export const DEFAULT_SHORT_NAME = "WCMAE-2027";

type ConferenceData = {
  ConferenceTitle?: string;
  ConferenceDates?: string;
  ConferenceVenue?: string;
  ConferenceAddress?: string;
  EmailId1?: string;
  ShortName?: string;
  EarlyBird?: string;
  mid_term?: string;
  OnSpot?: string;
  abstract_submission_deadline?: string;
  registration_deadline?: string;
  description?: string;
  [key: string]: unknown;
};

type Track = {
  id: string;
  name: string;
  color: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};

type ConferenceContextType = {
  conferenceData: ConferenceData | null;
  loginDetails: Record<string, unknown> | null;
  venueInfo: Record<string, unknown> | null;
  speakers: Speaker[];
  committee: CommitteeMember[];
  tracks: Track[];
  loading: boolean;
  error: string | null;
  refreshConferenceData: () => Promise<void>;
  getConferenceName: () => string;
  getConferenceEmail: () => string;
  getPricing: (category?: string) => number;
  getPricingTierLabel: () => string;
};

const ConferenceContext = createContext<ConferenceContextType | undefined>(undefined);

const colors = [
  "from-blue-400 to-indigo-600",
  "from-fuchsia-400 to-purple-600",
  "from-violet-400 to-indigo-600",
  "from-pink-400 to-rose-600",
  "from-rose-400 to-fuchsia-600",
  "from-purple-400 to-pink-600",
  "from-fuchsia-500 to-rose-500",
  "from-indigo-400 to-violet-600",
];

function firstRecord(data: unknown): Record<string, unknown> | null {
  if (Array.isArray(data)) return (data[0] as Record<string, unknown>) || null;
  return (data as Record<string, unknown>) || null;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.replace(/<[^>]*>?/gm, "").trim() : "";
}

function imageUrl(value: unknown): string {
  const url = text(value);
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://ccai2026.com/${url.replace(/^\/+/, "")}`;
}

function normalizeSpeaker(member: Record<string, unknown>, index: number): Speaker | null {
  const name = text(member.name ?? member.FullName ?? member.full_name);
  if (!name) return null;

  const category = text(member.category ?? member.Category ?? member.speaker_category);
  if (category.toLowerCase() === "ocm") return null;

  const institution = text(
    member.institution ?? member.affiliation ?? member.organization ?? member.org,
  );
  const country = text(member.country ?? member.Country) || "Global";
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return {
    name,
    title:
      text(member.title ?? member.Role ?? member.designation ?? member.position) ||
      "Conference Speaker",
    institution: institution || "WCMAE 2027 Faculty",
    country,
    flag: "",
    category: category.toLowerCase().includes("keynote") ? "Keynote" : "Plenary",
    initials,
    accent: colors[index % colors.length],
    photo: imageUrl(member.photo ?? member.Photo ?? member.image ?? member.Image),
    bio: text(member.bio ?? member.biography ?? member.description ?? member.about),
    email: text(member.email ?? member.Email ?? member.email_id),
    research: text(member.research ?? member.Research),
  };
}

function normalizeCommitteeMember(
  member: Record<string, unknown>,
  index: number,
): CommitteeMember | null {
  const name = text(member.name ?? member.FullName ?? member.full_name);
  if (!name) return null;

  const institution = text(
    member.institution ?? member.affiliation ?? member.organization ?? member.org,
  );
  const country = text(member.country ?? member.Country) || "Global";
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return {
    name,
    title:
      text(member.title ?? member.Role ?? member.designation ?? member.position) ||
      "Committee Member",
    institution: institution || "WCMAE 2027 Committee",
    country,
    initials,
    accent: colors[index % colors.length],
    photo: imageUrl(member.photo ?? member.Photo ?? member.image ?? member.Image),
    bio: text(member.bio ?? member.biography ?? member.description ?? member.about),
    email: text(member.email ?? member.Email ?? member.email_id),
    research: text(member.research ?? member.Research),
  };
}

function normalizeTrack(track: Record<string, unknown>, index: number): Track {
  const name =
    text(track.TrackName ?? track.name ?? track.title) ||
    SESSIONS[index]?.title ||
    `Track ${index + 1}`;
  const matchedSession =
    SESSIONS.find((s) => s.title.toLowerCase() === name.toLowerCase()) || SESSIONS[index];
  return {
    id: String(
      track.id ??
        track.track_id ??
        track.recordListingID ??
        name.toLowerCase().replace(/\s+/g, "-"),
    ),
    name,
    description: text(track.description ?? track.Description) || SESSIONS[index]?.description,
    color: colors[index % colors.length],
    icon: matchedSession?.icon || "➕",
  };
}

export function ConferenceProvider({ children }: { children: ReactNode }) {
  const [conferenceData, setConferenceData] = useState<ConferenceData | null>(null);
  const [loginDetails, setLoginDetails] = useState<Record<string, unknown> | null>(null);
  const [venueInfo, setVenueInfo] = useState<Record<string, unknown> | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>(SPEAKERS);
  const [committee, setCommittee] = useState<CommitteeMember[]>(COMMITTEE);
  const [tracks, setTracks] = useState<Track[]>(
    SESSIONS.map((session, index) => ({
      id: session.title,
      name: session.title,
      description: session.description,
      color: colors[index % colors.length],
      icon: session.icon,
    })),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshConferenceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const login = firstRecord(await getConferenceLoginDetails());
      setLoginDetails(login);
      const numericUserId =
        text(login?.id) || (typeof login?.id === "number" ? String(login.id) : "");

      const details = firstRecord(await getImportantDetailsByShortName(DEFAULT_SHORT_NAME));
      if (details) setConferenceData(details as ConferenceData);

      const [memberData, trackData, venueData] = await Promise.all([
        getMembersByUser(DEFAULT_SHORT_NAME),
        numericUserId ? getCallForAbstractsByUser(numericUserId) : Promise.resolve([]),
        getVenueInfo(DEFAULT_SHORT_NAME),
      ]);

      const apiSpeakers = Array.isArray(memberData)
        ? memberData
            .map((member, index) => normalizeSpeaker(member as Record<string, unknown>, index))
            .filter(Boolean)
        : [];
      if (apiSpeakers.length) setSpeakers(apiSpeakers as Speaker[]);

      const apiCommittee = Array.isArray(memberData)
        ? (memberData
            .filter((member) => {
              const category = text(
                (member as Record<string, unknown>).category ??
                  (member as Record<string, unknown>).Category ??
                  (member as Record<string, unknown>).speaker_category,
              );
              return category.toLowerCase() === "ocm";
            })
            .map((member, index) =>
              normalizeCommitteeMember(member as Record<string, unknown>, index),
            )
            .filter(Boolean) as CommitteeMember[])
        : [];
      if (apiCommittee.length) setCommittee(apiCommittee);

      const apiTracks = Array.isArray(trackData)
        ? trackData.map((track, index) => normalizeTrack(track as Record<string, unknown>, index))
        : [];
      if (apiTracks.length) setTracks(apiTracks);

      const venue = firstRecord(venueData);
      if (venue) setVenueInfo(venue);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshConferenceData();
  }, []);

  const getPricingTier = () => {
    const today = new Date();
    const earlyBird = conferenceData?.EarlyBird ? new Date(conferenceData.EarlyBird) : null;
    const midTerm = conferenceData?.mid_term ? new Date(conferenceData.mid_term) : null;
    if (earlyBird && today <= earlyBird) return "earlyBird";
    if (midTerm && today <= midTerm) return "standard";
    return "final";
  };

  const getPricing = (category = "delegate") => {
    const base: Record<string, number> = {
      speaker: 649,
      delegate: 749,
      listener: 549,
      poster: 499,
      student: 349,
      virtual: 299,
      discount: 399,
    };
    const amount = base[category] || base.delegate;
    const tier = getPricingTier();
    if (tier === "standard") return amount + 100;
    if (tier === "final") return amount + 200;
    return amount;
  };

  const getPricingTierLabel = () => {
    const tier = getPricingTier();
    if (tier === "earlyBird") return "Early Bird";
    if (tier === "standard") return "Standard";
    return "Final";
  };

  const getConferenceName = () => text(conferenceData?.ConferenceTitle) || CONFERENCE.name;
  const getConferenceEmail = () =>
    text(conferenceData?.EmailId1) || text(loginDetails?.email) || CONFERENCE.email;

  return (
    <ConferenceContext.Provider
      value={{
        conferenceData,
        loginDetails,
        venueInfo,
        speakers,
        committee,
        tracks,
        loading,
        error,
        refreshConferenceData,
        getConferenceName,
        getConferenceEmail,
        getPricing,
        getPricingTierLabel,
      }}
    >
      {children}
    </ConferenceContext.Provider>
  );
}

export function useConference() {
  const context = useContext(ConferenceContext);
  if (!context) throw new Error("useConference must be used within a ConferenceProvider");
  return context;
}
