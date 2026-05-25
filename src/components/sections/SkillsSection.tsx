"use client";

import React, { useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Code2, Server, Database, Share2, Cpu, Wrench } from "lucide-react";

interface Skill {
  name: string;
  level: string;
  description: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: "blue" | "purple" | "cyan" | "green";
  skills: Skill[];
}

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Code2 size={18} />,
      color: "blue",
      skills: [
        { name: "Java", level: "Advanced", description: "Primary language for enterprise and backend systems. Experienced in multithreading, OOP, and JVM tuning basics." },
        { name: "JavaScript", level: "Intermediate", description: "Used for frontend dynamics (React/Next.js) and writing full-stack scripting utilities." },
      ],
    },
    {
      title: "Backend Frameworks",
      icon: <Server size={18} />,
      color: "cyan",
      skills: [
        { name: "Spring Boot", level: "Advanced", description: "Main backend framework. Experienced in Spring MVC, Spring Data JPA, Spring Security, and IoC containers." },
        { name: "REST APIs", level: "Advanced", description: "Designing optimized endpoints following Richardson Maturity Model, implementing clean validation and HTTP status routing." },
      ],
    },
    {
      title: "Databases & Caching",
      icon: <Database size={18} />,
      color: "green",
      skills: [
        { name: "PostgreSQL", level: "Advanced", description: "Relational database used for transactional data integrity, schema migrations, and indexing." },
        { name: "MySQL", level: "Intermediate", description: "Proficient in writing complex subqueries, database isolation levels, and ACID properties." },
        { name: "Redis", level: "Intermediate", description: "Utilized for low-latency session caching, lookup buffers, write-through caching, and pub-sub." },
        { name: "MongoDB", level: "Intermediate", description: "NoSQL document storage utilized for high-throughput, unstructured JSON configurations." },
      ],
    },
    {
      title: "Distributed Systems",
      icon: <Share2 size={18} />,
      color: "purple",
      skills: [
        { name: "Apache Kafka", level: "Intermediate", description: "Message streaming broker utilized for decoupled background workers, pub-sub messaging pipelines, and asynchronous queues." },
      ],
    },
    {
      title: "Engineering Concepts",
      icon: <Cpu size={18} />,
      color: "blue",
      skills: [
        { name: "System Design", level: "Learner", description: "Studying horizontal scaling, database partitioning, high availability, rate limiting, and CDN architectures." },
        { name: "Scalability", level: "Learner", description: "Concepts of load balancing, read replicas, vertical vs. horizontal scale limits, and performance profiling." },
        { name: "OOP", level: "Advanced", description: "Object-oriented design patterns, encapsulation, polymorphism, inheritance, and SOLID design rules." },
        { name: "DSA", level: "Advanced", description: "Data structures (trees, graphs, hashing, heaps) and algorithm analysis for optimized resource complexities." },
        { name: "Distributed Systems", level: "Learner", description: "Studying consistency models (CAP theorem), replication lags, and broker consensus." },
      ],
    },
    {
      title: "Tools & Ecosystem",
      icon: <Wrench size={18} />,
      color: "cyan",
      skills: [
        { name: "Git & GitHub", level: "Advanced", description: "Version control workflows, commit standards, branching, merge conflict resolution, and CI/CD basics." },
        { name: "Firebase", level: "Intermediate", description: "Used for rapid authentication setups, Firestore document syncing, and cloud asset storage." },
      ],
    },
  ];

  const badgeColors = {
    blue: "text-brand-light bg-brand-blue/10 border-brand-blue/20",
    purple: "text-purple-300 bg-brand-purple/10 border-brand-purple/20",
    cyan: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20",
    green: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  const glowHoverClasses = {
    blue: "hover:border-brand-blue/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
    purple: "hover:border-brand-purple/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]",
    cyan: "hover:border-brand-cyan/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    green: "hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
  };

  return (
    <section id="skills" className="py-20 bg-slate-950 relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none radial-mask" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          method="GET"
          path="/api/v1/skills/matrix"
          subtitle="Explore the technical stack and engineering methodologies I specialize in. Click on individual skills to view details and use-cases."
        />

        {/* Selected Skill Banner */}
        <div className="mb-8 min-h-[70px]">
          {selectedSkill ? (
            <div className="p-4 rounded-xl border border-brand-blue/20 bg-slate-900/60 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono text-brand-sky font-bold uppercase tracking-widest">
                  Selected Node :: {selectedSkill.level}
                </span>
                <h4 className="text-sm font-mono font-bold text-white mt-0.5">{selectedSkill.name}</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">{selectedSkill.description}</p>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-2.5 py-1 text-[10px] font-mono font-semibold border border-slate-700 rounded text-slate-400 hover:text-white hover:border-slate-500 transition-all self-start md:self-center"
              >
                Clear Node Info
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-slate-900 bg-slate-900/10 flex items-center justify-center pointer-events-none select-none">
              <span className="font-mono text-xs text-slate-500 italic">
                💡 Console suggestion: Click on any grid skill button to load deep dependency descriptors.
              </span>
            </div>
          )}
        </div>

        {/* Skill Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {categories.map((cat, idx) => (
            <GlassCard
              key={idx}
              className={`bg-slate-900/20 border-slate-800/80 p-6 flex flex-col justify-between transition-all duration-300 ${glowHoverClasses[cat.color]}`}
              hoverEffect={true}
            >
              <div>
                {/* Title and Icon */}
                <div className="flex items-center gap-3 border-b border-slate-800/50 pb-4 mb-4">
                  <div className={`p-2 rounded-lg ${badgeColors[cat.color]} border`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>

                {/* Sub Skills buttons */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, sIdx) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    return (
                      <button
                        key={sIdx}
                        onClick={() => setSelectedSkill(skill)}
                        className={`
                          px-3.5 py-2 font-mono text-[11px] rounded-lg border transition-all duration-200 text-left w-full flex items-center justify-between group cursor-pointer
                          ${
                            isSelected
                              ? "bg-brand-blue/10 border-brand-blue/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                              : "bg-slate-950/60 border-slate-800/60 text-slate-400 hover:border-slate-600 hover:text-white"
                          }
                        `}
                      >
                        <span className="font-semibold">{skill.name}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded border transition-all group-hover:scale-105 ${
                          skill.level === "Advanced"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : skill.level === "Intermediate"
                            ? "bg-brand-blue/10 text-brand-light border-brand-blue/20"
                            : "bg-brand-purple/10 text-purple-300 border-brand-purple/20"
                        }`}>
                          {skill.level.toLowerCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status footer for aesthetic */}
              <div className="mt-6 flex justify-between font-mono text-[9px] text-slate-600 pointer-events-none">
                <span>CAT_ID: 0{idx + 1}</span>
                <span>DEP: CONFIGURED</span>
              </div>

            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
};
