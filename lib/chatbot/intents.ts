import type { ChatIntent } from "@/types/chatbot";

export const QUICK_REPLIES = [
  "Which service is right for me?",
  "How much does it cost?",
  "I need more website traffic",
  "Book a strategy session",
];

export const CHAT_INTENTS: ChatIntent[] = [
  {
    id: "service-fit",
    label: "Which service is right for me?",
    keywords: ["which service", "right service", "recommend", "not sure", "help me choose"],
    response:
      "Tell us the outcome you want most: more traffic, more qualified leads, a stronger website, or better operational efficiency. Our team combines the relevant services into one focused growth plan.",
    action: { label: "Explore services", target: "#services" },
  },
  {
    id: "seo",
    label: "I need more website traffic",
    keywords: ["seo", "traffic", "google", "rank", "ranking", "organic", "content"],
    response:
      "SEO & Content is the best starting point for sustainable website traffic. We improve technical health, search visibility, and content quality around questions your customers already ask.",
    action: { label: "Discuss SEO growth", target: "#contact" },
  },
  {
    id: "paid-ads",
    label: "I want to run ads",
    keywords: ["ads", "advertising", "google ads", "meta ads", "paid", "roas", "campaign"],
    response:
      "Paid Advertising is designed for faster, measurable acquisition. We plan campaigns, improve targeting and creative, then optimize continuously around qualified leads and return on spend.",
    action: { label: "Discuss paid campaigns", target: "#contact" },
  },
  {
    id: "website",
    label: "I need a new website",
    keywords: ["website", "web design", "redesign", "landing page", "conversion", "develop"],
    response:
      "Our Web Design service combines clear messaging, premium responsive design, technical SEO, and conversion-focused journeys. The goal is a website that looks credible and actively generates leads.",
    action: { label: "Plan my website", target: "#contact" },
  },
  {
    id: "automation",
    label: "Can you automate our workflow?",
    keywords: ["automation", "automate", "ai", "workflow", "repetitive", "operations"],
    response:
      "Yes. We identify repetitive tasks and connect practical automations around lead handling, notifications, reporting, and customer workflows. The focus is measurable time saved, not novelty.",
    action: { label: "Discuss automation", target: "#contact" },
  },
  {
    id: "pricing",
    label: "How much does it cost?",
    keywords: ["price", "pricing", "cost", "budget", "charge", "package", "how much"],
    response:
      "Project pricing depends on goals, scope, and timeline. You can submit a free enquiry for a tailored estimate, or book the INR 499 strategy session for a live audit and prioritized 30-day plan.",
    action: { label: "View paid consultation", target: "#consultation" },
  },
  {
    id: "consultation",
    label: "Book a strategy session",
    keywords: ["book", "consultation", "strategy session", "appointment", "meeting", "call"],
    response:
      "The 60-minute Growth Strategy Session costs INR 499 in Razorpay Test Mode. It includes a funnel review, three high-impact opportunities, and a clear 30-day action plan.",
    action: { label: "Book strategy session", target: "#consultation" },
  },
  {
    id: "timeline",
    label: "How long does a project take?",
    keywords: ["timeline", "time", "how long", "duration", "weeks", "delivery"],
    response:
      "Timelines depend on scope. Focused landing pages may take 2-3 weeks, while larger websites and growth systems usually take 4-8 weeks. We confirm milestones before work begins.",
    action: { label: "Discuss your timeline", target: "#contact" },
  },
  {
    id: "results",
    label: "Show me your results",
    keywords: ["results", "work", "portfolio", "case study", "clients", "proof"],
    response:
      "Our selected work shows measurable outcomes across e-commerce, healthcare, and B2B SaaS, including stronger ROAS, more qualified enquiries, and lower acquisition costs.",
    action: { label: "View selected results", target: "#results" },
  },
  {
    id: "contact",
    label: "Contact the team",
    keywords: ["contact", "talk", "team", "human", "email", "phone", "message"],
    response:
      "Share your goals through the contact form and a strategist will respond within one business day. Your details stay private.",
    action: { label: "Contact the team", target: "#contact" },
  },
];
