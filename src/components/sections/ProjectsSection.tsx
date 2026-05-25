"use client";

import React, { useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Badge } from "../ui/Badge";
import { ExternalLink, Database, Layers, Radio, ShieldCheck, HelpCircle } from "lucide-react";

// Inline SVG Icon components to prevent bundle/export resolution errors
const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface NodeDescriptor {
  name: string;
  role: string;
  tradeoff: string;
}

export const ProjectsSection: React.FC = () => {
  const [activeProjectTab, setActiveProjectTab] = useState<"intellishop" | "scalecart">("intellishop");
  const [selectedNode, setSelectedNode] = useState<NodeDescriptor | null>(null);

  // System design documentation maps
  const intelliShopNodes: Record<string, NodeDescriptor> = {
    auth: {
      name: "Spring Security + JWT",
      role: "Handles stateless API authentication. Generates token signatures on the server and decrypts payload on subsequent requests.",
      tradeoff: "Reduced DB lookups for sessions vs. difficulty in token invalidation before expiry."
    },
    jpa: {
      name: "Spring Data JPA (Hibernate)",
      role: "ORM mapper layer. Configured with query methods, criteria specifications, and eager/lazy fetching controls.",
      tradeoff: "Rapid development speed, but requires strict profiling of fetch modes to avoid the N+1 query problem."
    },
    mysql: {
      name: "MySQL Database",
      role: "Primary persistent relational storage. Table schemas designed in 3NF to avoid update anomalies.",
      tradeoff: "Guaranteed ACID transactions, but requires secondary indexes on search columns to prevent full-table scans under load."
    }
  };

  const scaleCartNodes: Record<string, NodeDescriptor> = {
    gateway: {
      name: "Spring Cloud Gateway",
      role: "Spring-native API Gateway that acts as a single point of entry routing client requests to underlying Spring Boot microservices.",
      tradeoff: "Tightly integrated with Spring Boot ecosystem, but introduces slightly higher memory footprint compared to non-JVM proxies."
    },
    redis: {
      name: "Redis Cache Layer",
      role: "Write-through caching layer for product listings. Cache hits served in sub-millisecond response durations.",
      tradeoff: "Drastic speedups and reduced load on Postgres, but introduces cache consistency challenges on update spikes."
    },
    kafka: {
      name: "Apache Kafka Streams",
      role: "Message broker pipeline decoupling order placement from payment receipts and background notifications.",
      tradeoff: "Achieves asynchronous eventual consistency and load shedding vs. complexity in transaction coordination."
    },
    postgres: {
      name: "PostgreSQL Master-Replica",
      role: "Replicated database setup. Order writes go to the primary node, while searches query replica shards.",
      tradeoff: "Drastically scales search throughput, but introduces replication lag constraints."
    }
  };

  const handleNodeClick = (nodeKey: string, project: "intellishop" | "scalecart") => {
    const map = project === "intellishop" ? intelliShopNodes : scaleCartNodes;
    setSelectedNode(map[nodeKey] || null);
  };

  return (
    <section id="projects" className="py-20 bg-slate-950/20 relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none radial-mask" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          method="POST"
          path="/api/v1/projects"
          subtitle="Explore the portfolio projects and click directly on the interactive system architecture nodes below to analyze my engineering decisions, structural design decisions, and system trade-offs."
        />

        {/* Project Selector Tabs */}
        <div className="flex border-b border-slate-800/80 mb-10 justify-center">
          <button
            onClick={() => {
              setActiveProjectTab("intellishop");
              setSelectedNode(null);
            }}
            className={`pb-4 px-6 font-mono text-sm font-bold border-b-2 transition-all ${
              activeProjectTab === "intellishop"
                ? "text-brand-blue border-brand-blue"
                : "text-slate-500 border-transparent hover:text-slate-300"
            }`}
          >
            01 // IntelliShop (Completed)
          </button>
          <button
            onClick={() => {
              setActiveProjectTab("scalecart");
              setSelectedNode(null);
            }}
            className={`pb-4 px-6 font-mono text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeProjectTab === "scalecart"
                ? "text-brand-blue border-brand-blue"
                : "text-slate-500 border-transparent hover:text-slate-300"
            }`}
          >
            02 // ScaleCart (Currently Building)
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
          </button>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Project Details (Left Panel) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <GlassCard className="bg-slate-900/30 p-8 flex flex-col h-full justify-between" hoverEffect={false}>
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-white font-sans">
                    {activeProjectTab === "intellishop" ? "IntelliShop" : "ScaleCart"}
                  </h3>
                  <div className="flex gap-2">
                    {activeProjectTab === "intellishop" ? (
                      <Badge text="Completed" variant="green" />
                    ) : (
                      <Badge text="Currently Building" variant="cyan" pulse={true} />
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                  {activeProjectTab === "intellishop"
                    ? "A smart, monolithic e-commerce API platform built to learn scalable system design foundations. Implemented Spring Boot MVC, database schemas with structured relations, optimized indexes, and REST controllers supporting safe payload validations."
                    : "A highly distributed e-commerce architecture designed to scale. Built with microservices principles, incorporating an Nginx API Gateway routing to spring boot containers, Redis lookup cache systems to shield databases, and an Apache Kafka messaging queue decoupling heavy order pipelines."}
                </p>

                {/* Architecture details lists */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Core Specifications
                  </h4>
                  <ul className="space-y-2.5 font-mono text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400">✔</span>
                      <span>
                        {activeProjectTab === "intellishop"
                          ? "Database Layer: Clean 3NF schemas preventing anomaly cycles"
                          : "Scalability: Database read-scaling using Primary-Replica separation"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400">✔</span>
                      <span>
                        {activeProjectTab === "intellishop"
                          ? "Authentication: JWT sessionless verification"
                          : "Caching: Redis lookup cache reducing DB pressure by 70%"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400">✔</span>
                      <span>
                        {activeProjectTab === "intellishop"
                          ? "Performance: Hibernate indexing configuration"
                          : "Decoupled Processing: Kafka broker queuing asynchronous jobs"}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeProjectTab === "intellishop" ? (
                    <>
                      <Badge text="Java" variant="gray" />
                      <Badge text="Spring Boot" variant="gray" />
                      <Badge text="MySQL" variant="gray" />
                      <Badge text="REST APIs" variant="gray" />
                      <Badge text="OOP" variant="gray" />
                    </>
                  ) : (
                    <>
                      <Badge text="Java" variant="gray" />
                      <Badge text="Spring Boot" variant="gray" />
                      <Badge text="PostgreSQL" variant="gray" />
                      <Badge text="Redis" variant="gray" />
                      <Badge text="Kafka" variant="gray" />
                      <Badge text="Docker" variant="gray" />
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-800/80 mt-auto">
                <a
                  href={activeProjectTab === "intellishop" ? "https://github.com/ha31457/Intelli-Shop-BE" : "https://github.com/ha31457/ScaleCart-BE"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded font-mono text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <GithubIcon size={14} />
                  Code Repository
                </a>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-4 py-2 border border-slate-800 rounded font-mono text-xs font-semibold text-slate-400 hover:text-white transition-all"
                >
                  Reset Info
                </button>
              </div>

            </GlassCard>
          </div>

          {/* Interactive Architecture Visualizer (Right Panel) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <GlassCard className="bg-slate-900/20 border-slate-800/80 p-6 flex flex-col" hoverEffect={false}>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                  System Architecture Map
                </span>
                <div className="flex items-center gap-1 text-[10px] text-slate-600 font-mono">
                  <HelpCircle size={10} />
                  <span>Click components to inspect design details</span>
                </div>
              </div>

              {/* Diagrams */}
              <div className="h-64 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-center items-center relative overflow-hidden">
                {activeProjectTab === "intellishop" ? (
                  /* IntelliShop flow diagram (Monolith) */
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4 w-full justify-around relative">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
                      <path d="M 120,60 Q 220,60 220,60" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
                      <path d="M 330,60 Q 420,60 420,60" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
                    </svg>

                    {/* Client Node */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="px-3 py-2 bg-slate-900 border border-slate-800 rounded font-mono text-[10px] text-slate-400 select-none">
                        Web Browser
                      </div>
                      <span className="text-[8px] font-mono text-slate-600">CLIENT</span>
                    </div>

                    {/* Auth + API Node */}
                    <button
                      onClick={() => handleNodeClick("auth", "intellishop")}
                      className={`px-4 py-2 border rounded font-mono text-[10px] flex flex-col items-center gap-1 shadow cursor-pointer transition-all hover:scale-105 ${
                        selectedNode?.name.includes("Security")
                          ? "bg-brand-blue/10 border-brand-blue text-brand-light"
                          : "bg-slate-900/90 border-slate-700 text-slate-200"
                      }`}
                    >
                      <ShieldCheck size={14} className="text-brand-blue" />
                      <span>Security API</span>
                    </button>

                    {/* JPA Layer */}
                    <button
                      onClick={() => handleNodeClick("jpa", "intellishop")}
                      className={`px-4 py-2 border rounded font-mono text-[10px] flex flex-col items-center gap-1 shadow cursor-pointer transition-all hover:scale-105 ${
                        selectedNode?.name.includes("JPA")
                          ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan"
                          : "bg-slate-900/90 border-slate-700 text-slate-200"
                      }`}
                    >
                      <Layers size={14} className="text-brand-cyan" />
                      <span>Spring JPA</span>
                    </button>

                    {/* MySQL Database */}
                    <button
                      onClick={() => handleNodeClick("mysql", "intellishop")}
                      className={`px-4 py-2 border rounded font-mono text-[10px] flex flex-col items-center gap-1 shadow cursor-pointer transition-all hover:scale-105 ${
                        selectedNode?.name.includes("MySQL")
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                          : "bg-slate-900/90 border-slate-700 text-slate-200"
                      }`}
                    >
                      <Database size={14} className="text-emerald-400" />
                      <span>MySQL (3NF)</span>
                    </button>
                  </div>
                ) : (
                  /* ScaleCart flow diagram (Microservices) */
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg justify-items-center items-center">
                    
                    {/* Gateway (Spring Cloud Gateway) */}
                    <button
                      onClick={() => handleNodeClick("gateway", "scalecart")}
                      className={`px-3 py-2 border rounded font-mono text-[9px] w-full flex flex-col items-center gap-1 shadow cursor-pointer transition-all hover:scale-105 ${
                        selectedNode?.name.includes("Spring Cloud")
                          ? "bg-brand-blue/10 border-brand-blue text-brand-light"
                          : "bg-slate-900/90 border-slate-700 text-slate-200"
                      }`}
                    >
                      <Radio size={12} className="text-brand-blue" />
                      <span>Spring Gateway</span>
                    </button>

                    {/* Cache (Redis) */}
                    <button
                      onClick={() => handleNodeClick("redis", "scalecart")}
                      className={`px-3 py-2 border rounded font-mono text-[9px] w-full flex flex-col items-center gap-1 shadow cursor-pointer transition-all hover:scale-105 ${
                        selectedNode?.name.includes("Redis")
                          ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan"
                          : "bg-slate-900/90 border-slate-700 text-slate-200"
                      }`}
                    >
                      <Layers size={12} className="text-brand-cyan" />
                      <span>Redis Cache</span>
                    </button>

                    {/* Queue (Kafka) */}
                    <button
                      onClick={() => handleNodeClick("kafka", "scalecart")}
                      className={`px-3 py-2 border rounded font-mono text-[9px] w-full flex flex-col items-center gap-1 shadow cursor-pointer transition-all hover:scale-105 ${
                        selectedNode?.name.includes("Kafka")
                          ? "bg-brand-purple/10 border-brand-purple text-purple-300"
                          : "bg-slate-900/90 border-slate-700 text-slate-200"
                      }`}
                    >
                      <Radio size={12} className="text-brand-purple animate-pulse" />
                      <span>Kafka Queue</span>
                    </button>

                    {/* DBMS (PostgreSQL) */}
                    <button
                      onClick={() => handleNodeClick("postgres", "scalecart")}
                      className={`px-3 py-2 border rounded font-mono text-[9px] w-full flex flex-col items-center gap-1 shadow cursor-pointer transition-all hover:scale-105 ${
                        selectedNode?.name.includes("PostgreSQL")
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                          : "bg-slate-900/90 border-slate-700 text-slate-200"
                      }`}
                    >
                      <Database size={12} className="text-emerald-400" />
                      <span>PG Master-Repl</span>
                    </button>

                    {/* Decorative connection info lines */}
                    <div className="col-span-4 text-[8px] font-mono text-slate-600 mt-2 pointer-events-none select-none">
                      CONNECTOR: REST_CLIENT + AMQP_EVENT | LATENCY_GAP: &lt;15ms
                    </div>
                  </div>
                )}
              </div>

              {/* Node Inspection description (Bottom of right panel) */}
              <div className="mt-6 border-t border-slate-800/80 pt-4 text-left min-h-[110px]">
                {selectedNode ? (
                  <div className="space-y-1.5 animate-fadeIn">
                    <span className="text-[10px] font-mono text-brand-sky font-bold uppercase tracking-widest">
                      Node Spec: {selectedNode.name}
                    </span>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {selectedNode.role}
                    </p>
                    <div className="pt-1.5 flex gap-1 items-start text-[10px] font-mono text-amber-400">
                      <span className="font-bold uppercase tracking-widest text-slate-500">Trade-off:</span>
                      <span className="italic leading-normal">{selectedNode.tradeoff}</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs font-mono text-slate-500 italic py-6">
                    💡 Click on any component node in the diagram above to inspect how I designed the service layers and database integrations.
                  </div>
                )}
              </div>

            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};
