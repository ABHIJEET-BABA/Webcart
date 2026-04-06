import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, CheckCircle2, BarChart3, Users, Globe } from "lucide-react";
import Link from "next/link";

const projects = [
  { 
    slug: "avis", 
    title: "AVIS", 
    color: "bg-[#D4002A]", 
    image: "https://picsum.photos/seed/avis/1200/1600", 
    result: "+45% CONVERSION",
    description: "A complete digital transformation...",
    stats: [
      { label: "Conversion Rate", value: "+45%", icon: <BarChart3 size={20} /> },
      { label: "Mobile Users", value: "1.2M", icon: <Users size={20} /> },
      { label: "Global Reach", value: "180+", icon: <Globe size={20} /> }
    ],
    challenges: ["Challenge 1", "Challenge 2"],
    solutions: ["Solution 1", "Solution 2"]
  },
  // keep rest same...
];

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return <div className="p-10 text-xl">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Hero */}
      <section className={`relative h-[80vh] ${project.color} flex flex-col justify-end p-6 md:p-12 text-white`}>
        <Link href="/#work" className="absolute top-10 left-6 flex items-center gap-3 text-xs font-bold">
          <ArrowLeft size={16} /> BACK
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold italic mb-4">{project.title}</h1>
          <p className="text-xl max-w-2xl">{project.description}</p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-3 gap-8 p-10">
        {project.stats.map((stat, i) => (
          <div key={i}>
            <div>{stat.icon}</div>
            <h2 className="text-3xl font-bold">{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Content */}
      <section className="grid md:grid-cols-2 gap-10 p-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Challenge</h2>
          {project.challenges.map((c, i) => (
            <p key={i}>{c}</p>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Solution</h2>
          {project.solutions.map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        </div>
      </section>

    </div>
  );
}
