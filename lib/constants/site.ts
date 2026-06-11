import {
  BarChart3,
  Code2,
  Megaphone,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Consultation", href: "#consultation" },
];

export const clientNames = [
  "ARC / LABS",
  "MONO",
  "KITE",
  "NORTHSTAR",
  "FORM",
  "VERTEX",
];

export const services = [
  {
    icon: Search,
    title: "Rank Higher. Generate More Leads.",
    description:
      "Turn search demand into qualified opportunities through technical SEO and high-intent content.",
    metric: "+184% organic reach",
  },
  {
    icon: Megaphone,
    title: "Acquire Customers Profitably.",
    description:
      "Build paid campaigns around revenue, efficient acquisition, and continuous conversion improvement.",
    metric: "3.8x average ROAS",
  },
  {
    icon: Code2,
    title: "Turn Your Website Into a Sales Engine.",
    description:
      "Create fast, credible experiences that communicate value clearly and convert attention into action.",
    metric: "90+ Lighthouse score",
  },
  {
    icon: Share2,
    title: "Build Demand Before the Click.",
    description:
      "Earn attention consistently with useful creative, focused distribution, and clear business goals.",
    metric: "+72% engagement",
  },
  {
    icon: BarChart3,
    title: "Make Growth More Predictable.",
    description:
      "Connect customer insight, channels, and analytics into a prioritized commercial growth roadmap.",
    metric: "One connected strategy",
  },
  {
    icon: Sparkles,
    title: "Scale Output, Not Overhead.",
    description:
      "Automate repetitive workflows so your team responds faster and focuses on higher-value work.",
    metric: "20+ hours saved monthly",
  },
];

export const testimonials = [
  {
    quote:
      "Nexora rebuilt our acquisition funnel from the ground up. We saw more qualified enquiries in the first six weeks than the previous quarter.",
    name: "Ananya Mehta",
    role: "Founder, Forma Living",
  },
  {
    quote:
      "The team communicates in business outcomes, not vanity metrics. Every campaign has a clear purpose and a measurable next step.",
    name: "Rohan Kapoor",
    role: "Director, Vertex Labs",
  },
  {
    quote:
      "Our new website finally explains what makes us different. It is faster, easier to manage, and consistently generates leads.",
    name: "Priya Shah",
    role: "CEO, Northstar Health",
  },
];

export const caseStudies = [
  {
    client: "Forma Living",
    category: "E-commerce / Paid growth",
    title: "Turning considered purchases into confident conversions.",
    result: "4.2x",
    resultLabel: "return on ad spend",
    accent: "teal",
  },
  {
    client: "Northstar Health",
    category: "Healthcare / Digital platform",
    title: "A clearer digital journey for better patient outcomes.",
    result: "+148%",
    resultLabel: "qualified enquiries",
    accent: "slate",
  },
  {
    client: "Vertex Labs",
    category: "B2B SaaS / Demand generation",
    title: "Making a complex product remarkably easy to buy.",
    result: "-31%",
    resultLabel: "cost per opportunity",
    accent: "blue",
  },
];
