export const dynamic = 'force-dynamic';

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Layout, Code, Globe, Megaphone } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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

// ✅ REQUIRED for static export
export async function generateStaticParams() {
  return steps.map((step) => ({
    step: step.id,
  }));
}

export default function ProcessStepPage() {
  const params = useParams();
  const stepId = params.step as string;
  const step = steps.find((s) => s.id === stepId);

  if (!step) return <div>Step not found</div>;

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 flex flex-col">
      <Link
        href="/#process"
        className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] mb-12 hover:italic transition-all group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
        BACK TO HOME
      </Link>

      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-neutral-200 mb-8">{step.icon}</div>

          <h1 className="text-huge font-bold tracking-tighter mb-8 italic">
            {step.title}
          </h1>

          <p className="text-2xl md:text-4xl font-medium tracking-tight mb-12 max-w-3xl leading-tight">
            {step.desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-neutral-100">
            {step.details.map((detail, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="w-2 h-2 bg-black rounded-full group-hover:scale-150 transition-transform" />
                <span className="text-lg font-bold tracking-tight group-hover:italic transition-all">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-24 pt-12 border-t border-neutral-100 flex justify-between items-center">
        <div className="text-[10px] font-bold tracking-[0.3em] text-neutral-400">
          PROCESS / {step.title}
        </div>
        <div className="text-[10px] font-bold tracking-[0.3em] text-neutral-400">
          WEBCART © 2026
        </div>
      </div>
    </div>
  );
}
