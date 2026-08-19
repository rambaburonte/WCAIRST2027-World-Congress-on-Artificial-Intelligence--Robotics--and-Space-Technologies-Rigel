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
  Users,
  MapPin,
} from "lucide-react";

export const CONFERENCE = {
  name: "World Congress on Artificial Intelligence, Robotics, and Space Technologies",
  short: "WCAIRST-2027",
  tagline: "Driving the next wave of intelligent robotics and space exploration.",
  subTagline: "Join leading researchers, innovators, and organizations in Milan.",
  dates: "May 12–14, 2027",
  location: "Milan, Italy",
  venue: "Milan Convention Centre",
  address: "Milan, Italy",
  email: "info@wcairst.com",
  phone: "+44 7344897352",
  website: "www.wcairst.com",
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
  // {
  //   name: "Prof. Alessandro Rossi",
  //   title: "Aerospace Propulsion",
  //   institution: "Politecnico di Milano",
  //   country: "Italy",
  //   flag: "🇮🇹",
  //   category: "Plenary",
  //   initials: "AR",
  //   accent: "from-blue-400 to-indigo-600",
  // },
  // {
  //   name: "Prof. Sarah Jenkins",
  //   title: "Advanced Composite Materials",
  //   institution: "MIT",
  //   country: "United States",
  //   flag: "🇺🇸",
  //   category: "Plenary",
  //   initials: "SJ",
  //   accent: "from-fuchsia-400 to-purple-600",
  // },
  // {
  //   name: "Prof. Kenji Tanaka",
  //   title: "Robotics & Mechatronics",
  //   institution: "University of Tokyo",
  //   country: "Japan",
  //   flag: "🇯🇵",
  //   category: "Plenary",
  //   initials: "KT",
  //   accent: "from-rose-400 to-pink-600",
  // },
  // {
  //   name: "Dr. Elena Rostova",
  //   title: "Sustainable Aviation Fuels",
  //   institution: "KTH Royal Institute of Technology",
  //   country: "Sweden",
  //   flag: "🇸🇪",
  //   category: "Keynote",
  //   initials: "ER",
  //   accent: "from-teal-400 to-emerald-600",
  // },
  // {
  //   name: "Dr. Marcus Vance",
  //   title: "Autonomous Flight Systems",
  //   institution: "NASA Jet Propulsion Laboratory",
  //   country: "United States",
  //   flag: "🇺🇸",
  //   category: "Keynote",
  //   initials: "MV",
  //   accent: "from-sky-400 to-blue-600",
  // },
  // {
  //   name: "Dr. Amara Dian",
  //   title: "Thermal Management in Spacecraft",
  //   institution: "University of Cape Town",
  //   country: "South Africa",
  //   flag: "🇿🇦",
  //   category: "Keynote",
  //   initials: "AD",
  //   accent: "from-amber-400 to-orange-600",
  // },
];

export const SESSIONS = [
  {
    title: "Artificial Intelligence & Machine Learning",
    description: "Advances in AI algorithms, neural networks, data-driven systems, and intelligent decision-making.",
    icon: Cpu,
  },
  {
    title: "Robotics and Autonomous Systems",
    description: "Robotic platforms, autonomy, control systems, perception, and intelligent mobility.",
    icon: Bot,
  },
  {
    title: "Space Systems and Satellite Technologies",
    description: "Satellite design, orbital systems, space operations, and mission architecture.",
    icon: Plane,
  },
  {
    title: "Human-Robot Interaction",
    description: "Collaborative robotics, safety, ergonomics, and AI-enabled human-machine interfaces.",
    icon: Users,
  },
  {
    title: "Autonomous Vehicles & Drones",
    description: "Navigation, perception, autonomy, and deployment of aerial and ground robotic systems.",
    icon: MapPin,
  },
  {
    title: "Space Exploration & Mission Design",
    description: "Interplanetary robotics, mission planning, propulsion systems, and deep space operations.",
    icon: Plane,
  },
  {
    title: "Intelligent Sensing & Computer Vision",
    description: "Sensor fusion, perception, computer vision, and real-time environmental awareness.",
    icon: Layers,
  },
  {
    title: "AI Ethics, Policy & Safety",
    description: "Responsible AI, governance, trust, safety, and regulatory issues for intelligent systems.",
    icon: ShieldCheck,
  },
  {
    title: "Space Robotics & Automation",
    description: "Robotic systems for satellite servicing, planetary exploration, and space infrastructure.",
    icon: Building2,
  },
  {
    title: "Future Technologies in AI and Space",
    description: "Emerging science, next-generation systems and disruptive solutions at the intersection of AI and space.",
    icon: Zap,
  },
];

export const SCHEDULE = [
  {
    day: "Day 1",
    date: "May 12, 2027",
    items: [
      { time: "08:30 – 09:30", title: "Registration & Welcome Coffee" },
      { time: "09:30 – 10:30", title: "Opening Ceremony & Keynote Address" },
      { time: "10:30 – 11:30", title: "Plenary Session: The Future of AI and Robotics" },
      { time: "11:30 – 11:45", title: "Coffee Break" },
      { time: "11:45 – 13:15", title: "Scientific Sessions: AI & Machine Learning" },
      { time: "13:15 – 14:30", title: "Lunch Break & Exhibition Viewing" },
      { time: "14:30 – 16:00", title: "Technical Sessions: Robotics & Autonomous Systems" },
      { time: "16:00 – 16:15", title: "Coffee Break" },
      { time: "16:15 – 17:45", title: "Workshops: Space Technology & Mission Design" },
      { time: "18:30 – 20:30", title: "Welcome Reception in Milan" },
    ],
  },
  {
    day: "Day 2",
    date: "May 13, 2027",
    items: [
      { time: "08:30 – 09:15", title: "Keynote Session: Autonomous Systems in Practice" },
      { time: "09:15 – 10:45", title: "Scientific Sessions: Human-Robot Interaction" },
      { time: "10:45 – 11:00", title: "Coffee Break" },
      { time: "11:00 – 12:30", title: "Scientific Sessions: Computer Vision & Sensing" },
      { time: "12:30 – 13:30", title: "Lunch Break" },
      { time: "13:30 – 15:00", title: "Workshops & Interactive Poster Sessions" },
      { time: "15:00 – 15:15", title: "Coffee Break" },
      { time: "15:15 – 16:45", title: "Panel Discussion: AI Ethics & Safe Deployment" },
      { time: "18:30 – 20:30", title: "Gala Dinner" },
    ],
  },
  {
    day: "Day 3",
    date: "May 14, 2027",
    items: [
      { time: "08:30 – 09:15", title: "Keynote Session: Space Robotics & Exploration" },
      { time: "09:15 – 10:45", title: "Scientific Sessions: Satellite & Space Systems" },
      { time: "10:45 – 11:00", title: "Coffee Break" },
      { time: "11:00 – 12:30", title: "Scientific Sessions: Autonomous Vehicles & Drones" },
      { time: "12:30 – 13:30", title: "Lunch Break" },
      { time: "13:30 – 15:00", title: "Young Researchers Forum & Final Awards" },
      { time: "15:00 – 15:15", title: "Coffee Break" },
      { time: "15:15 – 16:30", title: "Closing Ceremony & Future Outlook" },
    ],
  },
];

export const PARTNERS = [
  "ESA - European Space Agency",
  "NASA - National Aeronautics and Space Administration",
  "IEEE Robotics & Automation Society",
  "ACM - Association for Computing Machinery",
  "IROS - Intelligent Robots and Systems",
  "SpaceX",
  "Boston Dynamics",
  "Aurora Flight Sciences",
  "Space Exploration Technologies",
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
  // {
  //   name: "Prof. Laura Jenkins",
  //   title: "Committee Chair",
  //   institution: "Politecnico di Milano",
  //   country: "Italy",
  //   initials: "LJ",
  //   accent: "from-blue-400 to-indigo-600",
  // },
  // {
  //   name: "Dr. Marcus Vance",
  //   title: "Committee Co-Chair",
  //   institution: "MIT",
  //   country: "United States",
  //   initials: "MV",
  //   accent: "from-fuchsia-400 to-purple-600",
  // },
  // {
  //   name: "Prof. Elena Rostova",
  //   title: "Scientific Advisor",
  //   institution: "KTH Royal Institute of Technology",
  //   country: "Sweden",
  //   initials: "ER",
  //   accent: "from-teal-400 to-emerald-600",
  // },
];
