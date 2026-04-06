"use client";

import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Code, Globe, Layout, Megaphone, Menu, X, Star, Plus } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import CookieConsent from "@/components/CookieConsent";

import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[1200] transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${
        scrolled || isOpen ? "bg-white/90 backdrop-blur-md border-b border-neutral-200 py-4 text-black" : "bg-transparent text-black"
      }`}>
        <div className="text-2xl font-bold tracking-tighter z-[1210]">WebCart</div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="w-14 h-14 flex items-center justify-center bg-black text-white rounded-full hover:scale-110 transition-all z-[1210] shadow-lg cursor-pointer active:scale-95 pointer-events-auto"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center space-y-8 text-5xl md:text-7xl font-bold z-[1100]"
          >
            {["WORK", "SERVICES", "ABOUT", "CONTACT"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)} 
                className="hover:italic hover:tracking-widest transition-all duration-500"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Modal = ({ isOpen, onClose, title, content, image }: { isOpen: boolean, onClose: () => void, title: string, content: string, image?: string }) => {
  if (!isOpen) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-black/95 backdrop-blur-xl"
    >
      <button onClick={onClose} className="absolute top-8 right-8 text-white hover:opacity-50 transition-opacity">
        <X size={48} />
      </button>
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {image && (
          <div className="aspect-[4/5] overflow-hidden rounded-2xl">
            <img src={image} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        )}
        <div className="text-white">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">{title}</h2>
          <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-12">
            {content}
          </p>
          <button onClick={onClose} className="px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-colors">
            CLOSE PROJECT
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Clients = () => {
  const clients = ["SK FINANCE", "IMI NORGRAIN", "I PASS", "SHRINGAR", "MAPPING SKILL", "", "ADL", "XAPA INDIA"];
  return (
    <section id="clients" className="py-6 md:py-8 bg-white border-y border-neutral-100 overflow-hidden">
      <div className="px-6 md:px-12 mb-12">
        <h2 className="text-sm font-bold tracking-[0.3em] text-neutral-400 uppercase">OUR CLIENTS</h2>
      </div>
      <div className="flex whitespace-nowrap animate-scroll">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-24 items-center px-12">
            {clients.map((c, idx) => (
              <span key={`${c}-${idx}`} className="text-4xl md:text-6xl font-bold text-neutral-200 hover:text-black transition-colors cursor-default tracking-tighter">
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const LegalModal = ({ isOpen, onClose, title }: { isOpen: boolean, onClose: () => void, title: string }) => {
  if (!isOpen) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
    >
      <div className="bg-white text-black max-w-2xl w-full p-12 rounded-2xl relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 hover:opacity-50">
          <X size={24} />
        </button>
        <h2 className="text-4xl font-bold mb-8 tracking-tighter">{title}</h2>
        <div className="space-y-6 text-neutral-600 leading-relaxed">
          <p>Last updated: March 2026</p>
          <p>
            At Webcart, we take your privacy and legal rights seriously. This is a placeholder for our official {title.toLowerCase()}. 
            In a real-world scenario, this section would contain detailed clauses regarding data protection, 
            service agreements, and liability limitations.
          </p>
          {title === "COOKIE POLICY" && (
            <div className="space-y-4">
              <h4 className="font-bold text-black uppercase tracking-widest text-sm">WHAT ARE COOKIES?</h4>
              <p>Cookies are small text files stored on your device that help us improve your experience. They allow us to remember your preferences and analyze how you interact with our site.</p>
              <h4 className="font-bold text-black uppercase tracking-widest text-sm">HOW WE USE THEM:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential:</strong> Necessary for the website to function correctly.</li>
                <li><strong>Analytics:</strong> Help us understand how visitors use the site.</li>
                <li><strong>Preferences:</strong> Remember your settings and choices.</li>
              </ul>
            </div>
          )}
          {title === "PRIVACY POLICY" && (
            <div className="space-y-4">
              <h4 className="font-bold text-black uppercase tracking-widest text-sm">DATA COLLECTION:</h4>
              <p>We collect minimal data necessary for project communication and website analytics. This includes your name, email, and project details provided via our contact form.</p>
              <h4 className="font-bold text-black uppercase tracking-widest text-sm">SECURITY:</h4>
              <p>We implement industry-standard security measures to protect your information from unauthorized access or disclosure.</p>
              <h4 className="font-bold text-black uppercase tracking-widest text-sm">YOUR RIGHTS:</h4>
              <p>You have the right to request access to, correction of, or deletion of your personal data at any time. Contact us at info@webcart.com for any requests.</p>
            </div>
          )}
          {title === "TERMS & CONDITIONS" && (
            <div className="space-y-4">
              <h4 className="font-bold text-black uppercase tracking-widest text-sm">SERVICE AGREEMENT:</h4>
              <p>All projects are subject to a formal agreement outlining deliverables, timelines, and payment terms. We strive for excellence in every project we undertake.</p>
              <h4 className="font-bold text-black uppercase tracking-widest text-sm">INTELLECTUAL PROPERTY:</h4>
              <p>Upon final payment, all creative assets and code developed for your project are owned by you. We retain the right to showcase the work in our portfolio.</p>
              <h4 className="font-bold text-black uppercase tracking-widest text-sm">LIABILITY:</h4>
              <p>While we strive for perfection, we are not liable for any indirect or consequential damages arising from the use of our services or the websites we build.</p>
            </div>
          )}
          <p>
            We ensure that all client data is handled with the utmost security and transparency. 
            Our terms are designed to protect both the agency and our valued partners.
          </p>
          <h4 className="font-bold text-black uppercase tracking-widest text-sm">KEY POINTS:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Data is never shared with third parties without consent.</li>
            <li>All creative work is owned by the client upon final payment.</li>
            <li>We adhere to global standards of digital ethics and security.</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [0.1, 0]);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pb-8 md:pb-12 px-6 md:px-12 pt-32 bg-white text-black relative overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold tracking-tighter pointer-events-none select-none text-neutral-100"
      >
        
        
          WebCart
      </motion.div>

      <div className="relative z-10">
        <h1 className="max-w-5xl">
          WE BUILD WEBSITES THAT DRIVE <span className="text-neutral-400">REVENUE</span>
        </h1>
        <p className="mt-8 text-xl md:text-2xl max-w-2xl text-neutral-600 font-medium leading-relaxed">
          Premium digital experiences for brands that refuse to be ignored. We combine high-end design with conversion-focused engineering.
        </p>
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-10 py-5 bg-black text-white rounded-full text-lg font-bold flex items-center gap-3 group shadow-xl hover:shadow-2xl transition-all duration-500"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            GET STARTED
            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "WEB DESIGN", icon: <Layout size={40} />, desc: "Award-winning interfaces that captivate and convert." },
    { title: "DEVELOPMENT", icon: <Code size={40} />, desc: "Clean, scalable code built for speed and performance." },
    { title: "BRANDING", icon: <Globe size={40} />, desc: "Visual identities that define market leaders." },
    { title: "STRATEGY", icon: <Megaphone size={40} />, desc: "Data-driven roadmaps to scale your digital presence." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <section id="services" className="pt-4 md:pt-6 pb-0 px-6 md:px-12 bg-white text-black">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-8 md:mb-12"
      >
        SERVICES
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {services.map((s, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group"
          >
            <div className="mb-6 text-neutral-400 group-hover:text-black transition-colors duration-500">{s.icon}</div>
            <h3 className="mb-4">{s.title}</h3>
            <p className="text-neutral-600 leading-relaxed font-medium">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

interface WorkItemProps {
  title: string;
  color: string;
  image: string;
  result: string;
  index: number;
  onOpen: (title: string, image: string) => void;
}

const WorkItem = ({ title, color, image, result, index, slug }: { title: string, color: string, image: string, result: string, index: number, slug: string }) => {
  return (
    <Link 
      href={`/work/${slug}`}
      className="flex flex-col md:flex-row h-[600px] md:h-[800px] border-b border-neutral-100 group cursor-pointer overflow-hidden"
    >
      <div className={`w-full md:w-1/2 ${color} p-12 flex flex-col justify-between text-white transition-transform duration-700 group-hover:scale-[0.98]`}>
        <div className="flex justify-between items-start">
          <div className="text-sm font-mono opacity-50">0{index + 1} | 04</div>
          <div className="text-xs font-bold tracking-widest border border-white/30 px-3 py-1 rounded-full uppercase">{result}</div>
        </div>
        <div>
          <h2 className="mb-4 group-hover:italic transition-all duration-500">{title}</h2>
          <div className="text-sm font-bold uppercase tracking-widest border-b-2 border-white pb-1 inline-block group-hover:pr-4 transition-all duration-500">
            SEE CASE STUDY
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 overflow-hidden bg-neutral-50 relative">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={image} 
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
           <ArrowRight className="text-white scale-0 group-hover:scale-150 transition-transform duration-500" size={48} />
        </div>
      </div>
    </Link>
  );
};

const Work = () => {
  const projects = [
    { slug: "avis", title: "AVIS", color: "bg-[#D4002A]", image: "https://picsum.photos/seed/avis/1200/1600", result: "+45% CONVERSION" },
    { slug: "gallup", title: "GALLUP", color: "bg-[#005C3E]", image: "https://picsum.photos/seed/gallup/1200/1600", result: "2.4M ACTIVE USERS" },
    { slug: "adl", title: "ADL", color: "bg-[#004A80]", image: "https://picsum.photos/seed/adl/1200/1600", result: "GLOBAL REBRAND" },
    { slug: "dunkin", title: "DUNKIN'", color: "bg-[#E11383]", image: "https://picsum.photos/seed/dunkin/1200/1600", result: "+120% MOBILE GROWTH" },
  ];

  return (
    <section id="work" className="bg-white">
      <div className="pt-0 pb-8 md:pb-12 px-6 md:px-12 bg-white text-black">
        <h2>WORK</h2>
      </div>
      {projects.map((p, i) => (
        <WorkItem 
          key={i} 
          slug={p.slug}
          title={p.title} 
          color={p.color} 
          image={p.image} 
          result={p.result}
          index={i} 
        />
      ))}
    </section>
  );
};

const Portfolio = () => {
  const [selected, setSelected] = useState<{ title: string, image: string } | null>(null);
  return (
    <section className="pt-4 md:pt-6 pb-8 md:pb-12 px-6 md:px-12 bg-white text-black">
      <h2 className="mb-8 md:mb-12">PORTFOLIO</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 0.98 }}
            onClick={() => setSelected({ title: `PROJECT ${i}`, image: `https://picsum.photos/seed/port${i}/800/800` })}
            className="aspect-square bg-neutral-100 overflow-hidden relative group cursor-pointer"
          >
            <img 
              src={`https://picsum.photos/seed/port${i}/800/800`} 
              alt="Project" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-white/80 to-transparent">
              <h3 className="text-2xl">PROJECT {i}</h3>
              <p className="text-sm text-neutral-600">UI/UX DESIGN</p>
            </div>
          </motion.div>
        ))}
      </div>
      <Modal 
        isOpen={!!selected} 
        onClose={() => setSelected(null)} 
        title={selected?.title || ""} 
        image={selected?.image}
        content="A deep dive into visual storytelling and functional design. This portfolio piece showcases our ability to blend aesthetics with high-performance engineering for a truly immersive digital experience."
      />
    </section>
  );
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    { 
      name: "STARTER", 
      price: isYearly ? "960" : "100", 
      period: isYearly ? "/year" : "/mo",
      features: ["Single Landing Page", "Mobile Responsive", "Basic SEO", "3 Days Support", "Standard Hosting", "SSL Certificate"],
      desc: "Perfect for personal brands and simple launches."
    },
    { 
      name: "GROWTH", 
      price: isYearly ? "4800" : "500", 
      period: isYearly ? "/year" : "/mo",
      features: ["Multi-page Website", "Custom Animations", "Advanced SEO", "CMS Integration", "30 Days Support", "Performance Optimization", "Analytics Dashboard"], 
      highlight: true,
      desc: "Ideal for scaling businesses needing a premium edge."
    },
    { 
      name: "ENTERPRISE", 
      price: isYearly ? "9600" : "1000", 
      period: isYearly ? "/year" : "/mo",
      features: ["E-commerce Systems", "Custom API Integration", "Priority 24/7 Support", "Unlimited Revisions", "Dedicated Project Manager", "Security Hardening", "Content Strategy"],
      desc: "Full-scale digital solutions for established brands."
    },
    { 
      name: "CUSTOM", 
      price: "TALK", 
      period: "",
      features: ["Enterprise Solutions", "Dedicated Team", "White-label Options", "On-site Consultation", "Lifetime Maintenance"],
      desc: "Bespoke engineering for unique requirements."
    },
  ];

  return (
    <section className="section-padding bg-white text-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div>
          <h2 className="mb-4">PRICING</h2>
          <p className="text-neutral-500 font-medium max-w-md uppercase tracking-widest text-sm">Transparent investment for premium results. Choose the path that fits your vision.</p>
        </div>
        <div className="flex items-center gap-4 bg-neutral-50 p-2 rounded-full border border-neutral-100">
          <button 
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${!isYearly ? 'bg-black text-white' : 'text-neutral-400'}`}
          >
            MONTHLY
          </button>
          <button 
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${isYearly ? 'bg-black text-white' : 'text-neutral-400'}`}
          >
            YEARLY (-20%)
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((p, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }}
            className={`p-10 border ${p.highlight ? 'bg-black text-white border-black shadow-2xl' : 'border-neutral-100 bg-white'} flex flex-col justify-between min-h-[700px] relative overflow-hidden group transition-all duration-500`}
          >
            {p.highlight && (
              <div className="absolute top-6 right-[-35px] bg-white text-black text-[10px] font-bold py-1 px-10 rotate-45 tracking-widest">
                POPULAR
              </div>
            )}
            <div>
              <div className="text-xs font-bold mb-8 tracking-[0.2em] opacity-50">{p.name}</div>
              <p className={`text-sm mb-12 font-medium ${p.highlight ? 'text-neutral-400' : 'text-neutral-500'}`}>{p.desc}</p>
              <div className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter flex items-baseline">
                {p.price !== "TALK" && <span className="text-xl align-top mr-1">$</span>}
                {p.price}
                <span className="text-lg font-medium opacity-50 ml-1">{p.period}</span>
              </div>
              <ul className="space-y-5">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-xs font-bold tracking-tight">
                    <Check size={14} className={p.highlight ? 'text-white' : 'text-black'} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`mt-12 w-full py-5 font-bold text-[10px] tracking-[0.3em] border transition-all duration-500 ${p.highlight ? 'bg-white text-black border-white hover:bg-neutral-200 hover:tracking-[0.4em]' : 'bg-black text-white border-black hover:bg-neutral-800 hover:tracking-[0.4em]'}`}
            >
              GET STARTED
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { 
      id: "discover",
      title: "DISCOVER", 
      desc: "We dive deep into your brand, goals, and audience.", 
      details: "Our discovery phase is a collaborative journey where we uncover the core essence of your business.",
      image: "https://picsum.photos/seed/discover/1200/800"
    },
    { 
      id: "design",
      title: "DESIGN", 
      desc: "Crafting visual stories that resonate and convert.", 
      details: "In the design phase, we translate strategy into stunning visuals.",
      image: "https://picsum.photos/seed/design/1200/800"
    },
    { 
      id: "build",
      title: "BUILD", 
      desc: "Engineering high-performance digital assets.", 
      details: "Our engineering team brings the designs to life using cutting-edge technologies.",
      image: "https://picsum.photos/seed/build/1200/800"
    },
    { 
      id: "launch",
      title: "LAUNCH", 
      desc: "Deploying excellence and scaling your impact.", 
      details: "Launch is just the beginning. We handle the entire deployment process.",
      image: "https://picsum.photos/seed/launch/1200/800"
    }
  ];

  return (
    <section id="process" className="section-padding bg-neutral-50 text-black overflow-hidden">
      <h2 className="mb-24">PROCESS</h2>
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <Link 
            key={i}
            href={`/process/${step.id}`}
            className="flex items-center gap-12 border-b border-neutral-200 py-16 last:border-0 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
            <span className="text-2xl font-mono text-neutral-300 group-hover:text-white/50 transition-colors relative z-10">0{i + 1}</span>
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 relative z-10">
              <h3 className="text-huge font-bold group-hover:italic group-hover:text-white transition-all duration-500">{step.title}</h3>
              <p className="text-neutral-500 font-medium max-w-xs group-hover:text-white/70 transition-colors duration-500">{step.desc}</p>
            </div>
            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 group-hover:text-white relative z-10" size={48} />
          </Link>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="pt-8 md:pt-12 pb-0 bg-neutral-50 text-black">
      <div className="max-w-6xl mx-auto text-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-4xl font-bold leading-tight tracking-tight italic">
            "WebCart transformed our digital presence. Their attention to detail and focus on performance resulted in a 40% increase in our conversion rate within the first month."
          </p>
          <div className="mt-8">
            <div className="font-bold text-lg">Ravinder Matharu</div>
            <div className="text-neutral-500 font-medium text-sm">CEO, Director</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-white text-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="mb-12">ABOUT</h2>
          <p className="text-2xl md:text-3xl font-medium leading-snug">
            We are a boutique agency of designers and engineers obsessed with the intersection of art and commerce. We don't just build websites; we build digital assets that grow your business.
          </p>
          <ul className="mt-12 space-y-6">
            {["US-BASED TEAM", "DATA-DRIVEN DESIGN", "CUTTING-EDGE TECH", "RESULTS-FIRST APPROACH"].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg font-bold tracking-tight">
                <div className="w-2 h-2 bg-black rounded-full" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-16 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/face${i}/100/100`} 
                  alt="Team" 
                  className="w-12 h-12 rounded-full border-2 border-white grayscale"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-sm font-bold tracking-widest uppercase">
              MEET THE MINDS BEHIND WebCart
            </div>
          </div>
        </div>
        <div className="aspect-[4/5] bg-neutral-100 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/about/1200/1500" 
            alt="Agency Life" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const baseReviews = [
    { name: "Alex Rivera", role: "Founder, Bloom", text: "The team at WebCart is exceptional. They didn't just build a site; they built a brand experience that has doubled our engagement." },
    { name: "Jessica Chen", role: "Marketing Director, Velo", text: "Working with WebCart was the best decision for our rebrand. Their technical expertise is matched only by their design sensibility." },
    { name: "Marcus Thorne", role: "CTO, Grid Systems", text: "Fast, reliable, and incredibly talented. They delivered a complex enterprise solution ahead of schedule and under budget." },
    { name: "Elena Sofia", role: "CEO, Aura Beauty", text: "Our e-commerce conversion jumped by 65% after the launch. WebCart understands the psychology of high-end consumers." },
    { name: "David Miller", role: "Product Lead, Nexus", text: "The attention to detail in their code and design is unparalleled. They are truly the top 1% of digital agencies." },
    { name: "Sarah Williams", role: "Founder, Muse", text: "WebCart didn't just meet our expectations; they redefined what we thought was possible for our digital presence." },
    { name: "James Wilson", role: "CEO, TechFlow", text: "Incredible speed and precision. Our load times dropped by 70% after their optimization." },
    { name: "Linda Katz", role: "Founder, Artisan", text: "The aesthetic they created for us is exactly what we needed to attract premium clients." },
    { name: "Robert Chen", role: "Marketing, Peak", text: "WebCart's strategy session alone was worth the investment. They see things others miss." },
    { name: "Sophie Martin", role: "Creative Director, Flux", text: "A rare combination of artistic vision and technical mastery. Highly recommended." },
  ];

  const reviews = Array.from({ length: 60 }, (_, i) => {
    const base = baseReviews[i % baseReviews.length];
    return {
      ...base,
      id: i,
      name: `${base.name} ${String.fromCharCode(65 + (i % 26))}.`,
    };
  });

  return (
    <section id="reviews" className="py-24 bg-white text-black overflow-hidden border-y border-neutral-100">
      <div className="px-6 md:px-12 mb-16">
        <h2 className="mb-4">REVIEWS</h2>
        <p className="text-neutral-500 font-medium uppercase tracking-widest text-sm">Trusted by 200+ industry leaders worldwide.</p>
      </div>
      
      <div className="flex flex-col gap-8">
        <div className="flex whitespace-nowrap animate-scroll-slow">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 px-4">
              {reviews.slice(0, 30).map((r) => (
                <div 
                  key={r.id}
                  className="w-[400px] bg-neutral-50 p-10 border border-neutral-100 flex flex-col justify-between hover:border-black transition-colors duration-500"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-black text-black" />)}
                    </div>
                    <p className="text-lg font-medium leading-relaxed mb-8 italic text-neutral-600 whitespace-normal">"{r.text}"</p>
                  </div>
                  <div>
                    <div className="font-bold text-sm uppercase tracking-tight">{r.name}</div>
                    <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{r.role}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex whitespace-nowrap animate-scroll-slow-reverse">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 px-4">
              {reviews.slice(30, 60).map((r) => (
                <div 
                  key={r.id}
                  className="w-[400px] bg-neutral-50 p-10 border border-neutral-100 flex flex-col justify-between hover:border-black transition-colors duration-500"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-black text-black" />)}
                    </div>
                    <p className="text-lg font-medium leading-relaxed mb-8 italic text-neutral-600 whitespace-normal">"{r.text}"</p>
                  </div>
                  <div>
                    <div className="font-bold text-sm uppercase tracking-tight">{r.name}</div>
                    <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{r.role}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
};

const CTA = () => {
  return (
    <section className="section-padding bg-white text-black overflow-hidden">
      <div className="relative border-y-2 border-black py-12 md:py-16 group cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-huge mb-8 group-hover:text-white transition-colors duration-500">READY TO SCALE?</h2>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-6 bg-black text-white font-bold text-xl tracking-[0.3em] hover:bg-neutral-800 transition-all group-hover:bg-white group-hover:text-black"
          >
            GET STARTED NOW
          </button>
        </div>
      </div>
    </section>
  );
};

const Capabilities = () => {
  const items = [
    { 
      title: "STRATEGY", 
      desc: "Digital roadmaps that lead to market dominance. We analyze your competitors and identify untapped opportunities for growth.", 
      size: "md:col-span-2 md:row-span-2", 
      icon: <Globe size={40} /> 
    },
    { 
      title: "DESIGN", 
      desc: "Aesthetic excellence that converts visitors into loyal customers.", 
      size: "md:col-span-1 md:row-span-1", 
      icon: <Layout size={32} /> 
    },
    { 
      title: "CODE", 
      desc: "High-performance engineering using the latest technologies for speed and security.", 
      size: "md:col-span-1 md:row-span-1", 
      icon: <Code size={32} /> 
    },
    { 
      title: "GROWTH", 
      desc: "Scaling your impact globally through data-driven marketing and optimization.", 
      size: "md:col-span-2 md:row-span-1", 
      icon: <Megaphone size={32} /> 
    },
    { 
      title: "SUPPORT", 
      desc: "24/7 dedicated assistance to keep your platform running at peak performance.", 
      size: "md:col-span-1 md:row-span-1", 
      icon: <Check size={32} /> 
    },
  ];

  return (
    <section id="capabilities" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
      <h2 className="mb-8 md:mb-12 relative z-10">WHY OUR<br />CAPABILITIES?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`${item.size} min-h-[280px] bg-neutral-50 p-12 border border-neutral-100 flex flex-col justify-between hover:border-black transition-all duration-500 group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
            <div className="text-black group-hover:text-white group-hover:scale-110 transition-all duration-500 origin-left relative z-10">
              {item.icon}
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 group-hover:italic group-hover:text-white transition-all duration-500">{item.title}</h3>
              <p className="text-neutral-500 font-medium group-hover:text-white/70 transition-colors duration-500 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Showcase = () => {
  return (
    <section className="pt-0 pb-8 md:pb-12 px-6 md:px-12 bg-black text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-huge mb-12">THE<br />STANDARD</h2>
          <p className="text-2xl text-neutral-400 font-medium leading-tight mb-8">
            We don't just follow trends. We set them. Our engineering team pushes the boundaries of what's possible on the web.
          </p>
          <p className="text-lg text-neutral-500 font-medium leading-relaxed mb-12">
            We don't compete on price. We compete on results. Our work is designed for those who demand the absolute best.
          </p>
          <div className="flex gap-12">
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-xs font-bold tracking-widest text-neutral-500 uppercase">UPTIME GUARANTEE</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100ms</div>
              <div className="text-xs font-bold tracking-widest text-neutral-500 uppercase">AVG LOAD TIME</div>
            </div>
          </div>
        </motion.div>
        <div className="relative aspect-square">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full bg-neutral-900 border border-white/10 overflow-hidden"
          >
            <img 
              src="https://picsum.photos/seed/tech/1200/1200" 
              alt="Showcase" 
              className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white text-black p-8 flex items-center justify-center text-center font-bold text-xs tracking-widest uppercase leading-tight">
            BUILT FOR SPEED
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "PROJECTS COMPLETED", value: 250, suffix: "+" },
    { label: "HAPPY CLIENTS", value: 180, suffix: "+" },
    { label: "AWARDS WON", value: 12, suffix: "" },
    { label: "YEARS OF EXCELLENCE", value: 8, suffix: "" },
  ];

  return (
    <section id="stats" className="pt-8 md:pt-12 pb-0 px-6 md:px-12 bg-black text-white overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {stats.map((s, i) => (
          <div
            key={i}
            className="relative group"
          >
            <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 group-hover:italic transition-all duration-700 font-mono">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">{s.label}</div>
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "HOW LONG DOES A TYPICAL PROJECT TAKE?", a: "Most projects take between 4 to 8 weeks depending on complexity. We prioritize quality and thorough testing to ensure a flawless launch." },
    { q: "DO YOU OFFER ONGOING SUPPORT?", a: "Yes, we provide various support packages to ensure your website remains secure, up-to-date, and performing at its peak long after launch." },
    { q: "WHAT IS YOUR PRICING STRUCTURE?", a: "We offer both fixed-price packages for standard projects and custom quotes for enterprise solutions. Transparency is key to our process." },
    { q: "CAN YOU HELP WITH BRANDING AS WELL?", a: "Absolutely. We offer full branding services including logo design, visual identity, and brand strategy to ensure consistency across all touchpoints." },
  ];

  return (
    <section className="pt-0 pb-8 md:pb-12 px-6 md:px-12 bg-neutral-50 text-black">
      <h2 className="mb-8 md:mb-12">FAQ</h2>
      <div className="max-w-4xl">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-neutral-100 last:border-0">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full py-12 flex justify-between items-center text-left group border-t border-neutral-100 first:border-0"
            >
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight group-hover:italic transition-all duration-500">{faq.q}</h3>
              <div className="p-2 bg-neutral-50 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                {openIndex === i ? <X size={24} /> : <Plus size={24} />}
              </div>
            </button>
            <motion.div
              initial={false}
              animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
              className="overflow-hidden"
            >
              <p className="pb-12 text-xl text-neutral-600 max-w-2xl leading-relaxed">
                {faq.a}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("E-COMMERCE");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const services = ["E-COMMERCE", "LANDING PAGE", "CORPORATE", "SAAS APP", "PORTFOLIO"];

  return (
    <section id="contact" className="section-padding bg-white text-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-huge mb-12">LET'S<br />TALK</h2>
          <p className="text-xl text-neutral-600 max-w-md">
            Have a project in mind? We'd love to hear from you. Let's build something extraordinary together.
          </p>
          <div className="mt-12 space-y-4">
            <div className="text-lg font-bold">info@webcart.com</div>
            <div className="text-lg font-bold">+91 9811707705</div>
          </div>
          <div className="mt-12 p-8 bg-neutral-50 border border-neutral-100 rounded-2xl">
            <h4 className="text-sm font-bold tracking-widest mb-4">OUR OFFICE</h4>
            <p className="text-neutral-500 font-medium">D-22 ,SEC-03<br />NOIDA, IN 201301</p>
          </div>
        </div>
        
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-neutral-200 rounded-2xl text-center"
          >
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mb-6">
              <Check size={40} />
            </div>
            <h3 className="text-3xl font-bold mb-4 tracking-tighter">MESSAGE SENT</h3>
            <p className="text-neutral-600">We'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Your Name</label>
              <input required type="text" className="w-full bg-transparent border-b-2 border-neutral-200 py-4 focus:border-black outline-none transition-colors text-xl font-bold" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Your Email</label>
              <input required type="email" className="w-full bg-transparent border-b-2 border-neutral-200 py-4 focus:border-black outline-none transition-colors text-xl font-bold" placeholder="john@example.com" />
            </div>
            <div className="space-y-6">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">What are we building?</label>
              <div className="flex flex-wrap gap-4">
                {services.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setService(s)}
                    className={`px-6 py-3 rounded-full text-xs font-bold tracking-widest border transition-all ${
                      service === s ? "bg-black text-white border-black" : "bg-transparent text-neutral-400 border-neutral-200 hover:border-black hover:text-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Project Details</label>
              <textarea required rows={4} className="w-full bg-transparent border-b-2 border-neutral-200 py-4 focus:border-black outline-none transition-colors text-xl font-bold resize-none" placeholder="Tell us about your vision..." />
            </div>
            <button type="submit" className="px-12 py-6 bg-black text-white font-bold text-lg tracking-widest hover:bg-neutral-800 transition-colors">
              SEND MESSAGE
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  const [legal, setLegal] = useState<string | null>(null);

  return (
    <footer className="px-6 md:px-12 py-24 bg-white text-black border-t border-neutral-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        <div className="lg:col-span-2">
          <div className="text-4xl font-bold tracking-tighter mb-8">WebCart</div>
          <p className="text-neutral-500 max-w-sm mb-8 font-medium">
            A premium digital agency focused on high-performance design and engineering. We build the future of the web.
          </p>
          <div className="flex gap-8 text-sm font-bold tracking-widest">
            <a href="#" className="hover:opacity-50 transition-opacity">INSTAGRAM</a>
            <a href="#" className="hover:opacity-50 transition-opacity">TWITTER</a>
            <a href="#" className="hover:opacity-50 transition-opacity">LINKEDIN</a>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] mb-8 text-neutral-400 uppercase">PAGES</h4>
          <ul className="space-y-4 text-sm font-bold tracking-widest">
            <li><a href="#work" className="hover:opacity-50 transition-opacity">WORK</a></li>
            <li><a href="#services" className="hover:opacity-50 transition-opacity">SERVICES</a></li>
            <li><a href="#about" className="hover:opacity-50 transition-opacity">ABOUT</a></li>
            <li><a href="#contact" className="hover:opacity-50 transition-opacity">CONTACT</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] mb-8 text-neutral-400 uppercase">LEGAL</h4>
          <ul className="space-y-4 text-sm font-bold tracking-widest">
            <li><button onClick={() => setLegal("PRIVACY POLICY")} className="hover:opacity-50 transition-opacity uppercase">PRIVACY POLICY</button></li>
            <li><button onClick={() => setLegal("TERMS & CONDITIONS")} className="hover:opacity-50 transition-opacity uppercase">TERMS & CONDITIONS</button></li>
            <li><button onClick={() => setLegal("COOKIE POLICY")} className="hover:opacity-50 transition-opacity uppercase">COOKIE POLICY</button></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-neutral-100 gap-6">
        <div className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
          © 2026 WebCart AGENCY. ALL RIGHTS RESERVED.
        </div>
        <div className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
          BUILT WITH PRECISION BY WebCart
        </div>
      </div>
      <LegalModal isOpen={!!legal} onClose={() => setLegal(null)} title={legal || ""} />
    </footer>
  );
};

const Marquee = ({ text, reverse = false, bg = "bg-white", textColor = "text-black" }: { text: string, reverse?: boolean, bg?: string, textColor?: string }) => {
  return (
    <div className={`py-6 md:py-8 ${bg} ${textColor} overflow-hidden border-y border-neutral-100`}>
      <div className={`flex whitespace-nowrap ${reverse ? 'animate-scroll-slow-reverse' : 'animate-scroll-slow'}`}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-bold tracking-tighter mx-8 uppercase italic opacity-80">
            {text} •
          </span>
        ))}
      </div>
    </div>
  );
};

const Mission = () => {
  return (
    <section className="section-padding bg-black text-white">
      <div className="max-w-4xl">
        <h2 className="text-huge mb-12">WE DON'T JUST BUILD WEBSITES. WE BUILD THE FUTURE OF YOUR BUSINESS.</h2>
        <p className="text-2xl md:text-3xl font-medium text-neutral-400 leading-tight">
          Every pixel we place and every line of code we write is designed with one goal: to make your brand impossible to ignore.
        </p>
      </div>
    </section>
  );
};

const Team = () => {
  const members = [
    { name: "Ravinder Matharu", role: "CEO & FOUNDER", image: "https://picsum.photos/seed/sarah/800/1000", bio: "Visionary leader with 15+ years in digital strategy." },
    { name: "Ravinder Matharu", role: "CREATIVE DIRECTOR", image: "https://picsum.photos/seed/marcus/800/1000", bio: "Award-winning designer focused on emotional impact." },
    { name: "Abhijeet Kumar", role: "LEAD ENGINEER", image: "https://picsum.photos/seed/elena/800/1000", bio: "Full-stack expert specializing in high-scale systems." },
    { name: "Amit Sharma", role: "STRATEGY LEAD", image: "https://picsum.photos/seed/david/800/1000", bio: "Data-driven strategist obsessed with ROI." },
  ];

  return (
    <section className="section-padding bg-neutral-50 text-black">
      <h2 className="mb-8 md:mb-12">WHY OUR<br />TEAM?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="aspect-[3/4] overflow-hidden mb-6 bg-neutral-100 relative">
              <img 
                src={m.image} 
                alt={m.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center">
                <p className="text-white text-sm font-medium leading-relaxed">{m.bio}</p>
              </div>
            </div>
            <div className="font-bold text-lg tracking-tight">{m.name}</div>
            <div className="text-xs font-bold tracking-widest text-neutral-400 uppercase">{m.role}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Values = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.7, 0.9], ["0%", "-50%"]);

  const values = [
    { title: "PRECISION", desc: "We measure twice and cut once. Every pixel is intentional." },
    { title: "PASSION", desc: "We are obsessed with the craft of digital creation." },
    { title: "PERFORMANCE", desc: "Speed is a feature. We build for the fastest possible experience." },
    { title: "PARTNERSHIP", desc: "We don't work for you; we work with you as an extension of your team." },
  ];

  return (
    <section className="section-padding bg-black text-white overflow-hidden">
      <div className="mb-16">
        <h2 className="text-huge">OUR VALUES</h2>
      </div>
      <motion.div style={{ x }} className="flex gap-12 px-6 md:px-12">
        {values.map((v, i) => (
          <div key={i} className="min-w-[300px] md:min-w-[500px] border-l border-white/20 pl-12">
            <div className="text-sm font-mono opacity-50 mb-8">0{i + 1}</div>
            <h3 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter italic">{v.title}</h3>
            <p className="text-xl text-neutral-400 max-w-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="bg-white text-black selection:bg-black selection:text-white min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />
      <main className="relative">
        <Hero />
        <Clients />
        <Work />
        <Marquee text="DESIGN • STRATEGY • PERFORMANCE • GROWTH" />
        <Mission />
        <Capabilities />
        <Stats />
        <Showcase />
        <Services />
        <Portfolio />
        <Marquee text="PREMIUM • EXCLUSIVE • BESPOKE • ELITE" reverse />
        <Pricing />
        <Reviews />
        <Process />
        <Marquee text="INNOVATION • EXCELLENCE • RESULTS • IMPACT" reverse bg="bg-black" textColor="text-white" />
        <Testimonials />
        <FAQ />
        <About />
        <Team />
        <Values />
        <CTA />
        <Marquee text="LET'S BUILD SOMETHING EXTRAORDINARY" bg="bg-black" textColor="text-white" />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
