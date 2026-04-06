import { motion } from "motion/react";
import { ArrowLeft, Layout, Code, Globe, Megaphone } from "lucide-react";
import Link from "next/link";

const steps = [
  { 
    id: "discover", 
    title: "DISCOVER", 
    icon: <Globe size={48} />, 
    desc: "We dive deep into your business, goals, and target audience to build a solid foundation.",
    details: [
      "Market Analysis & Research",
      "User Persona Development",
      "Competitor Benchmarking",
      "Goal Setting & KPIs"
    ]
  },
  { 
    id: "design", 
    title: "DESIGN", 
    icon: <Layout size={48} />, 
    desc: "We create high-fidelity prototypes and visual languages that resonate with your brand.",
    details: [
      "UI/UX Architecture",
      "Visual Identity Systems",
      "Interactive Prototyping",
      "User Testing & Feedback"
    ]
  },
  { 
    id: "build", 
    title: "BUILD", 
    icon: <Code size={48} />, 
    desc: "Our developers bring the designs to life with clean, performant, and scalable code.",
    details: [
      "Frontend Development",
      "Backend Infrastructure",
      "CMS Integration",
      "Performance Optimization"
    ]
  },
  { 
    id: "launch", 
    title: "LAUNCH", 
    icon: <Megaphone size={48} />, 
    desc: "We ensure a smooth deployment and provide ongoing support to scale your digital presence.",
    details: [
      "Quality Assurance Testing",
      "Deployment & Hosting",
      "SEO & Analytics Setup",
      "Post-Launch Support"
    ]
  },
];

export default function ProcessStepPage({
  params,
}: {
  params: { step: string };
}) {
  const step = steps.find((s) => s.id === params.step);

  if (!step) {
    return <div className="p-10 text-xl">Step not found</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 flex flex-col">
      <Link
        href="/#process"
        className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] mb-12 hover:italic transition-all group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-2 transition-transform"
        />
        BACK TO HOME
      </Link>

      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-neutral-200 mb-8">{step.icon}</div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 italic">
            {step.title}
          </h1>

          <p className="text-2xl md:text-3xl mb-12 max-w-3xl">
            {step.desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-neutral-100">
            {step.details.map((detail, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 bg-black rounded-full" />
                <span className="text-lg font-semibold">{detail}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-24 pt-12 border-t border-neutral-100 flex justify-between text-xs text-neutral-400">
        <div>PROCESS / {step.title}</div>
        <div>WEBCART © 2026</div>
      </div>
    </div>
  );
}
