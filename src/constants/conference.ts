import {
  Wrench,
  Plane,
  Thermometer,
  Cpu,
  Building2,
  Bot,
  Zap,
  Leaf,
  Layers,
  ShieldCheck,
} from "lucide-react";

export const CONFERENCE = {
  name: "World Congress on Mechanical and Aerospace Engineering",
  short: "WCMAE-2027",
  tagline: "Innovating Today for a Smarter, Safer and Sustainable Tomorrow",
  subTagline: "Join leading researchers, professionals, and organizations in Milan.",
  dates: "May 12–14, 2027",
  location: "Milan, Italy",
  venue: "Milan Convention Centre",
  address: "Milan, Italy",
  email: "info@wcmae2027.com",
  phone: "+39 02 1234 5678",
  website: "www.wcmae2027.com",
};

export const NAV_LINKS = [
  { label: "About", path: "/about" },
  { label: "Speakers", path: "/speakers" },
  { label: "Committee", path: "/committee" },
  { label: "Sessions", path: "/sessions" },
  { label: "Program", path: "/program" },
  { label: "Submit Abstract", path: "/submission" },
  { label: "Venue", path: "/venue" },
  { label: "Contact", path: "/contact" },
];

export const STATS = [
  { value: "500+", label: "Participants" },
  { value: "70+", label: "Expert Speakers" },
  { value: "40+", label: "Countries" },
  { value: "20+", label: "Sponsors & Exhibitors" },
];

export type Speaker = {
  name: string;
  title: string;
  institution: string;
  country: string;
  flag: string;
  category: "Plenary" | "Keynote";
  initials: string;
  accent: string;
  photo?: string;
  bio?: string;
  email?: string;
  research?: string;
};

export const SPEAKERS: Speaker[] = [
  {
    name: "Prof. Alessandro Rossi",
    title: "Aerospace Propulsion",
    institution: "Politecnico di Milano",
    country: "Italy",
    flag: "🇮🇹",
    category: "Plenary",
    initials: "AR",
    accent: "from-blue-400 to-indigo-600",
  },
  {
    name: "Prof. Sarah Jenkins",
    title: "Advanced Composite Materials",
    institution: "MIT",
    country: "United States",
    flag: "🇺🇸",
    category: "Plenary",
    initials: "SJ",
    accent: "from-fuchsia-400 to-purple-600",
  },
  {
    name: "Prof. Kenji Tanaka",
    title: "Robotics & Mechatronics",
    institution: "University of Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    category: "Plenary",
    initials: "KT",
    accent: "from-rose-400 to-pink-600",
  },
  {
    name: "Dr. Elena Rostova",
    title: "Sustainable Aviation Fuels",
    institution: "KTH Royal Institute of Technology",
    country: "Sweden",
    flag: "🇸🇪",
    category: "Keynote",
    initials: "ER",
    accent: "from-teal-400 to-emerald-600",
  },
  {
    name: "Dr. Marcus Vance",
    title: "Autonomous Flight Systems",
    institution: "NASA Jet Propulsion Laboratory",
    country: "United States",
    flag: "🇺🇸",
    category: "Keynote",
    initials: "MV",
    accent: "from-sky-400 to-blue-600",
  },
  {
    name: "Dr. Amara Dian",
    title: "Thermal Management in Spacecraft",
    institution: "University of Cape Town",
    country: "South Africa",
    flag: "🇿🇦",
    category: "Keynote",
    initials: "AD",
    accent: "from-amber-400 to-orange-600",
  },
];

export const SESSIONS = [
  {
    title: "Advanced Manufacturing & Materials",
    description: "Discussion on emerging composite materials, metallurgy, and smart manufacturing.",
    icon: Wrench,
  },
  {
    title: "Aerospace Vehicles & Propulsion",
    description:
      "Design challenges, propulsion efficiency, aerodynamics, and structural components.",
    icon: Plane,
  },
  {
    title: "Thermal & Fluid Systems",
    description: "Thermodynamics, heat transfer solutions, and advanced fluid mechanics.",
    icon: Thermometer,
  },
  {
    title: "Design, Simulation & Optimization",
    description: "CAD/CAM tools, structural optimization, and FEA modeling techniques.",
    icon: Cpu,
  },
  {
    title: "Structures, Dynamics & Vibration",
    description: "Aeroelasticity, vibration suppression, and structural health monitoring.",
    icon: Building2,
  },
  {
    title: "Control, Automation & Mechatronics",
    description: "Robotics, aerospace flight control, and automated industrial assembly.",
    icon: Bot,
  },
  {
    title: "Emerging Technologies in Engineering",
    description: "Nanotechnology, AI and machine learning applied to engineering problems.",
    icon: Zap,
  },
  {
    title: "Sustainability & Green Engineering",
    description: "Eco-design, life cycle assessments, and renewable energy mechanical components.",
    icon: Leaf,
  },
  {
    title: "Additive Manufacturing",
    description: "3D printing of metal alloys and lightweight polymers for aerospace.",
    icon: Layers,
  },
  {
    title: "Safety, Reliability & Maintenance",
    description: "Failure analysis, predictive maintenance, and quality assurance workflows.",
    icon: ShieldCheck,
  },
];

export const SCHEDULE = [
  {
    day: "Day 1",
    date: "May 12, 2027",
    items: [
      { time: "08:30 – 09:30", title: "Registration & Welcome Coffee" },
      { time: "09:30 – 10:30", title: "Opening Ceremony & Keynote Address" },
      { time: "10:30 – 11:30", title: "Plenary Session: Future of Aerospace Flight" },
      { time: "11:30 – 11:45", title: "Coffee Break" },
      { time: "11:45 – 13:15", title: "Scientific Sessions: Propulsion & Materials" },
      { time: "13:15 – 14:30", title: "Lunch Break & Exhibition Viewing" },
      { time: "14:30 – 16:00", title: "Technical Sessions: Thermal & Fluids" },
      { time: "16:00 – 16:15", title: "Coffee Break" },
      { time: "16:15 – 17:45", title: "Workshops: Simulation & Modeling" },
      { time: "18:30 – 20:30", title: "Welcome Reception in Milan" },
    ],
  },
  {
    day: "Day 2",
    date: "May 13, 2027",
    items: [
      { time: "08:30 – 09:15", title: "Keynote Session: Autonomous Systems" },
      { time: "09:15 – 10:45", title: "Scientific Sessions: Additive Manufacturing" },
      { time: "10:45 – 11:00", title: "Coffee Break" },
      { time: "11:00 – 12:30", title: "Scientific Sessions: Controls & Mechatronics" },
      { time: "12:30 – 13:30", title: "Lunch Break" },
      { time: "13:30 – 15:00", title: "Workshops & Interactive Poster Sessions" },
      { time: "15:00 – 15:15", title: "Coffee Break" },
      { time: "15:15 – 16:45", title: "Panel Discussion: Sustainable Green Aviation" },
      { time: "18:30 – 20:30", title: "Gala Dinner" },
    ],
  },
  {
    day: "Day 3",
    date: "May 14, 2027",
    items: [
      { time: "08:30 – 09:15", title: "Keynote Session: Micro & Nano Satellites" },
      { time: "09:15 – 10:45", title: "Scientific Sessions: Safety & Reliability" },
      { time: "10:45 – 11:00", title: "Coffee Break" },
      { time: "11:00 – 12:30", title: "Scientific Sessions: Structures & Dynamics" },
      { time: "12:30 – 13:30", title: "Lunch Break" },
      { time: "13:30 – 15:00", title: "Young Researchers Forum & Final Awards" },
      { time: "15:00 – 15:15", title: "Coffee Break" },
      { time: "15:15 – 16:30", title: "Closing Ceremony & Future Outlook" },
    ],
  },
];

export const PARTNERS = [
  "ESA",
  "NASA",
  "AIAA",
  "ASME",
  "IEEE Aerospace",
  "Leonardo",
  "Airbus",
  "Boeing",
  "Ansys",
];

export type CommitteeMember = {
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
};

export const COMMITTEE: CommitteeMember[] = [
  {
    name: "Prof. Laura Jenkins",
    title: "Committee Chair",
    institution: "Politecnico di Milano",
    country: "Italy",
    initials: "LJ",
    accent: "from-blue-400 to-indigo-600",
  },
  {
    name: "Dr. Marcus Vance",
    title: "Committee Co-Chair",
    institution: "MIT",
    country: "United States",
    initials: "MV",
    accent: "from-fuchsia-400 to-purple-600",
  },
  {
    name: "Prof. Elena Rostova",
    title: "Scientific Advisor",
    institution: "KTH Royal Institute of Technology",
    country: "Sweden",
    initials: "ER",
    accent: "from-teal-400 to-emerald-600",
  },
];
