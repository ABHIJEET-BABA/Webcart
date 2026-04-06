"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, CheckCircle2, BarChart3, Users, Globe } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const projects = [
  { 
    slug: "avis", 
    title: "AVIS", 
    color: "bg-[#D4002A]", 
    image: "https://picsum.photos/seed/avis/1200/1600", 
    result: "+45% CONVERSION",
    description: "A complete digital transformation for the global leader in car rentals, focusing on mobile-first booking and seamless user journeys.",
    stats: [
      { label: "Conversion Rate", value: "+45%", icon: <BarChart3 size={20} /> },
      { label: "Mobile Users", value: "1.2M", icon: <Users size={20} /> },
      { label: "Global Reach", value: "180+", icon: <Globe size={20} /> }
    ],
    challenges: [
      "Fragmented user experience across legacy platforms",
      "High drop-off rates during the checkout process",
      "Inconsistent branding across international markets"
    ],
    solutions: [
      "Unified design system for global consistency",
      "One-tap booking integration for frequent travelers",
      "Performance-optimized frontend for low-latency browsing"
    ]
  },
  { 
    slug: "gallup", 
    title: "GALLUP", 
    color: "bg-[#005C3E]", 
    image: "https://picsum.photos/seed/gallup/1200/1600", 
    result: "2.4M ACTIVE USERS",
    description: "Redesigning the world's most trusted data platform to make complex insights accessible and actionable for millions of users.",
    stats: [
      { label: "Active Users", value: "2.4M", icon: <Users size={20} /> },
      { label: "Data Points", value: "500B+", icon: <BarChart3 size={20} /> },
      { label: "User Retention", value: "+30%", icon: <CheckCircle2 size={20} /> }
    ],
    challenges: [
      "Complex data visualization requirements",
      "Need for real-time analytics dashboards",
      "Accessibility compliance for diverse user groups"
    ],
    solutions: [
      "Custom D3.js visualization engine",
      "Role-based dashboard personalization",
      "WCAG 2.1 AA compliant interface"
    ]
  },
  { 
    slug: "adl", 
    title: "ADL", 
    color: "bg-[#004A80]", 
    image: "https://picsum.photos/seed/adl/1200/1600", 
    result: "GLOBAL REBRAND",
    description: "A bold visual identity and digital ecosystem for a global advocacy organization, amplifying their voice in the digital age.",
    stats: [
      { label: "Brand Awareness", value: "+60%", icon: <Globe size={20} /> },
      { label: "Engagement", value: "3.5M", icon: <Users size={20} /> },
      { label: "Donations", value: "+25%", icon: <BarChart3 size={20} /> }
    ],
    challenges: [
      "Outdated digital presence that didn't reflect brand values",
      "Difficulty in managing content across multiple regions",
      "Low mobile engagement for advocacy campaigns"
    ],
    solutions: [
      "Modern, high-impact visual language",
      "Headless CMS for regional content control",
      "Interactive storytelling modules for campaigns"
    ]
  },
  { 
    slug: "dunkin", 
    title: "DUNKIN'", 
    color: "bg-[#E11383]", 
    image: "https://picsum.photos/seed/dunkin/1200/1600", 
    result: "+120% MOBILE GROWTH",
    description: "Revolutionizing the morning routine with a lightning-fast mobile experience and integrated loyalty rewards system.",
    stats: [
      { label: "Mobile Growth", value: "+120%", icon: <BarChart3 size={20} /> },
      { label: "App Downloads", value: "5M+", icon: <Users size={20} /> },
      { label: "Order Speed", value: "-40%", icon: <CheckCircle2 size={20} /> }
    ],
    challenges: [
      "Slow legacy app performance causing user friction",
      "Complex loyalty program integration",
      "High volume of concurrent users during peak hours"
    ],
    solutions: [
      "React Native rebuild for native performance",
      "Seamless API integration for real-time rewards",
      "Edge-cached content for instant load times"
    ]
  },
];

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className={`relative h-[80vh] ${project.color} flex flex-col justify-end p-6 md:p-12 text-white overflow-hidden`}>
        <Link href="/#work" className="absolute top-12 left-6 md:left-12 flex items-center gap-4 text-xs font-bold tracking-[0.2em] hover:italic transition-all group z-20">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          BACK TO WORK
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="text-sm font-mono opacity-50 mb-4 tracking-widest uppercase">CASE STUDY / 2026</div>
          <h1 className="text-huge font-bold tracking-tighter leading-[0.85] mb-8 italic">{project.title}</h1>
          <p className="text-2xl md:text-4xl font-medium tracking-tight max-w-3xl leading-tight opacity-90">
            {project.description}
          </p>
        </motion.div>

        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20 grayscale mix-blend-overlay">
          <img src={project.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-neutral-100">
        {project.stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="text-neutral-300">{stat.icon}</div>
            <div className="text-5xl font-bold tracking-tighter italic">{stat.value}</div>
            <div className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Content Section */}
      <section className="section-padding grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h2 className="text-4xl font-bold mb-12 tracking-tight">THE CHALLENGE</h2>
          <div className="flex flex-col gap-8">
            {project.challenges.map((challenge, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-neutral-300 font-mono">0{i + 1}</span>
                <p className="text-xl font-medium text-neutral-600 leading-relaxed">{challenge}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-12 tracking-tight">THE SOLUTION</h2>
          <div className="flex flex-col gap-8">
            {project.solutions.map((solution, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className="mt-2 w-2 h-2 bg-black rounded-full group-hover:scale-150 transition-transform" />
                <p className="text-xl font-bold leading-relaxed group-hover:italic transition-all">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Image Section */}
      <section className="h-[60vh] md:h-screen overflow-hidden bg-neutral-100">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={project.image} 
          alt="Project Detail" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Footer Branding */}
      <footer className="section-padding border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-huge font-bold tracking-tighter italic opacity-10">WebCart</div>
        <div className="flex flex-col items-end gap-2">
           <Link href="/#contact" className="text-sm font-bold tracking-widest border-b-2 border-black pb-1 hover:pr-4 transition-all">START A PROJECT</Link>
           <div className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase">© 2026 WebCart</div>
        </div>
      </footer>
    </div>
  );
}
