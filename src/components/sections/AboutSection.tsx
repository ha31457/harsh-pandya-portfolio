"use client";

import React, { useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Cpu, Award, BookOpen, Server, Layers, Database, Radio, Wrench } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bio" | "principles" | "internship">("bio");

  const systemSpecs = [
    { label: "Language Runtime", value: "Java 21 (LTS) / JVM", icon: <Cpu size={14} className="text-brand-blue" /> },
    { label: "Backend Framework", value: "Spring Boot 3.x / WebMVC", icon: <Server size={14} className="text-brand-cyan" /> },
    { label: "Caching Infrastructure", value: "Redis (In-Memory K-V)", icon: <Layers size={14} className="text-brand-cyan" /> },
    { label: "Relational Storage", value: "PostgreSQL (Master-Replica)", icon: <Database size={14} className="text-emerald-400" /> },
    { label: "Event Broker", value: "Apache Kafka (Log Appender)", icon: <Radio size={14} className="text-brand-purple" /> },
    { label: "Tooling Ecosystem", value: "Git, Docker, Firebase", icon: <Wrench size={14} className="text-slate-400" /> },
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none radial-mask" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          method="GET"
          path="/api/v1/about"
          subtitle="A detailed breakdown of my engineering mindset, academic background, and professional focus."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Narrative Biography Tabbed Panel (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <GlassCard className="bg-slate-900/30 flex-1 flex flex-col h-full" hoverEffect={false}>
              
              {/* Tab Selector */}
              <div className="flex border-b border-slate-800/80 mb-6 font-mono text-xs">
                <button
                  onClick={() => setActiveTab("bio")}
                  className={`pb-3 pr-4 font-bold border-b-2 transition-all ${
                    activeTab === "bio"
                      ? "text-brand-blue border-brand-blue"
                      : "text-slate-500 border-transparent hover:text-slate-300"
                  }`}
                >
                  01 // MY BACKGROUND
                </button>
                <button
                  onClick={() => setActiveTab("principles")}
                  className={`pb-3 px-4 font-bold border-b-2 transition-all ${
                    activeTab === "principles"
                      ? "text-brand-blue border-brand-blue"
                      : "text-slate-500 border-transparent hover:text-slate-300"
                  }`}
                >
                  02 // ENGINEERING PRINCIPLES
                </button>
                <button
                  onClick={() => setActiveTab("internship")}
                  className={`pb-3 px-4 font-bold border-b-2 transition-all ${
                    activeTab === "internship"
                      ? "text-brand-blue border-brand-blue"
                      : "text-slate-500 border-transparent hover:text-slate-300"
                  }`}
                >
                  03 // UNIVERSITY INTERNSHIP
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 flex flex-col justify-start">
                {activeTab === "bio" && (
                  <div className="space-y-4 font-sans text-slate-300 leading-relaxed text-sm md:text-base">
                    <p>
                      I am a B.Tech Computer Science and Engineering student at <strong className="text-white">Navrachana University</strong>, moving into my final year of study. With a current CGPA of <strong className="text-white">8.33 / 10</strong>, my academic path has been centered on foundational computer science principles: Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), and Database Management Systems.
                    </p>
                    <p>
                      While frontend development allows me to express interactive ideas, my core passion lies in the <strong className="text-white">invisible parts of software</strong>. I am deeply interested in system architectures, REST API optimization, caching dynamics, and building applications that can scale to handle massive transaction volumes.
                    </p>
                    <p>
                      Ultimately, my goal is to join <strong className="text-white">Google as a Software Engineer</strong>, where I can contribute to infrastructure platforms that serve billions of requests per second. I treat every project as an opportunity to study how production systems deal with crash failovers, concurrency, and data consistency.
                    </p>
                  </div>
                )}

                {activeTab === "principles" && (
                  <div className="space-y-4 font-sans text-slate-300 leading-relaxed text-sm md:text-base">
                    <p>
                      I believe software engineering is less about writing code and more about managing <strong className="text-white">complexity and reliability</strong>. My backend research is guided by three principles:
                    </p>
                    <ul className="list-none space-y-3 pl-1 font-sans">
                      <li className="flex items-start gap-2.5">
                        <span className="text-brand-sky font-mono mt-1 text-xs">◆</span>
                        <div>
                          <strong className="text-white">Design for Failure:</strong> Assume services will crash, networks will partition, and memory limits will be reached. I use circuit breakers, retries with exponential backoffs, and active monitoring.
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-brand-sky font-mono mt-1 text-xs">◆</span>
                        <div>
                          <strong className="text-white">Measure and Profile:</strong> Don't optimize blindly. Analyze database queries, measure cache hit-miss distributions, and log garbage collector pauses to diagnose real bottlenecks.
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-brand-sky font-mono mt-1 text-xs">◆</span>
                        <div>
                          <strong className="text-white">Decouple Workloads:</strong> Whenever possible, separate synchronous client flows from asynchronous background computations using event queues like Kafka.
                        </div>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "internship" && (
                  <div className="space-y-4 font-sans text-slate-300 leading-relaxed text-sm md:text-base">
                    <p>
                      Currently, I serve as a <strong className="text-white">Student Intern at Navrachana University</strong>, where I assist the lead faculty in coordinating Data Science academic sessions.
                    </p>
                    <p>
                      This role involves assisting students in mastering foundational principles (statistics, dataset analysis, and machine learning pipelines), creating collaborative learning experiences, and assisting in the setup of research datasets.
                    </p>
                    <p>
                      Teaching is a powerful way to reinforce my own knowledge. Having to explain database normalization, thread pools, or dataset ingestion vectors to peers forces me to clarify my own understanding of core concepts.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80 font-mono text-left">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-brand-blue" />
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase">DEGREE</div>
                    <div className="text-xs font-bold text-white">B.Tech CSE</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-brand-purple" />
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase">SCHOLARSHIP</div>
                    <div className="text-xs font-bold text-white">Merit 20%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Server size={16} className="text-brand-cyan" />
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase">INTERNSHIP</div>
                    <div className="text-xs font-bold text-white">NUV Intern</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-emerald-400" />
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase">TARGET</div>
                    <div className="text-xs font-bold text-white">SWE @ Google</div>
                  </div>
                </div>
              </div>

            </GlassCard>
          </div>

          {/* Static System Specifications Sheet (5 Columns) */}
          <div className="lg:col-span-5 flex">
            <GlassCard className="bg-slate-900/20 p-6 flex-1 flex flex-col justify-between border-slate-800/80 h-full" hoverEffect={false}>
              
              <div className="flex flex-col gap-5 h-full">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono text-brand-sky font-bold uppercase tracking-widest">System Specifications</span>
                  <h3 className="text-lg font-bold text-white font-mono mt-1">Harsh Core Stack</h3>
                  <p className="text-xs text-slate-400 font-sans mt-1">A high-level declaration of dependencies, storage layers, and system environments that I compile against.</p>
                </div>

                <div className="flex-1 flex flex-col gap-3.5 mt-2 justify-center">
                  {systemSpecs.map((spec, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="p-3.5 rounded-xl border border-slate-800/60 bg-slate-950/70 flex items-center justify-between text-left font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          {spec.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider">{spec.label}</span>
                          <span className="text-xs font-semibold text-white mt-0.5">{spec.value}</span>
                        </div>
                      </div>
                      <span className="text-[8px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                        LOADED
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex justify-between font-mono text-[9px] text-slate-600">
                  <span>RUNTIME_ENVIRONMENT: PRODUCTION</span>
                  <span>BUILD: STABLE</span>
                </div>
              </div>

            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};
