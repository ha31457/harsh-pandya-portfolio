"use client";

import React, { useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Badge } from "../ui/Badge";
import { Database, Layers, Radio, ShieldCheck, HelpCircle } from "lucide-react";

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
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "core" | "async" | "roadmap">("overview");
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
              setActiveSubTab("overview");
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
              setActiveSubTab("overview");
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Project Details (Left Panel) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
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

                {/* Sub Tab selection for ScaleCart detailed specs */}
                {activeProjectTab === "scalecart" && (
                  <div className="flex flex-wrap border-b border-slate-800/80 mb-5 font-mono text-[10px] gap-1">
                    <button
                      onClick={() => setActiveSubTab("overview")}
                      className={`pb-2 px-2.5 font-bold border-b-2 transition-all ${
                        activeSubTab === "overview" ? "text-brand-blue border-brand-blue" : "text-slate-500 border-transparent hover:text-slate-300"
                      }`}
                    >
                      OVERVIEW
                    </button>
                    <button
                      onClick={() => setActiveSubTab("core")}
                      className={`pb-2 px-2.5 font-bold border-b-2 transition-all ${
                        activeSubTab === "core" ? "text-brand-blue border-brand-blue" : "text-slate-500 border-transparent hover:text-slate-300"
                      }`}
                    >
                      CORE ARCHITECTURE
                    </button>
                    <button
                      onClick={() => setActiveSubTab("async")}
                      className={`pb-2 px-2.5 font-bold border-b-2 transition-all ${
                        activeSubTab === "async" ? "text-brand-blue border-brand-blue" : "text-slate-500 border-transparent hover:text-slate-300"
                      }`}
                    >
                      ASYNC PATTERNS
                    </button>
                    <button
                      onClick={() => setActiveSubTab("roadmap")}
                      className={`pb-2 px-2.5 font-bold border-b-2 transition-all ${
                        activeSubTab === "roadmap" ? "text-brand-blue border-brand-blue" : "text-slate-500 border-transparent hover:text-slate-300"
                      }`}
                    >
                      RESILIENCE & ROADMAP
                    </button>
                  </div>
                )}

                {/* Descriptions based on selected project */}
                {activeProjectTab === "intellishop" ? (
                  <div className="space-y-4">
                    <h4 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wide">
                      Shop Management System | Full-Stack Software Project
                    </h4>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                      Built a full-stack shop management software for a local medical and grocery store to digitize billing, inventory, customer credit management, and business operations. Developed the backend using Java Spring Boot and PostgreSQL, and designed a modern React-based frontend. Implemented features such as inventory tracking, expiry alerts, automated monthly billing for credit customers, barcode/manual product billing, customer transaction management, supplier and employee management, and sales analytics. Designed an optimized relational database schema with scalable architecture and real-world business workflow handling.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5 text-xs md:text-sm text-slate-300 leading-relaxed font-sans max-h-[300px] overflow-y-auto pr-2">
                    {activeSubTab === "overview" && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wide">
                          High-Scale Order & Inventory Backend
                        </h4>
                        <p>
                          ScaleCart is a highly distributed order and inventory microservice suite structured to simulate high-load production-grade transactions.
                        </p>
                        <div className="bg-slate-950/80 border border-slate-800 rounded p-3 font-mono text-[10px] space-y-1">
                          <div className="text-slate-500">RUNTIME_SPECIFICATION:</div>
                          <div><span className="text-slate-400">Language:</span> Java 23</div>
                          <div><span className="text-slate-400">Framework:</span> Spring Boot 4.0 / Spring Security</div>
                          <div><span className="text-slate-400">Persistent:</span> PostgreSQL 17 / Hibernate</div>
                          <div><span className="text-slate-400">Caching & Messaging:</span> Redis, Apache Kafka</div>
                        </div>
                      </div>
                    )}

                    {activeSubTab === "core" && (
                      <div className="space-y-2.5">
                        <div>
                          <strong className="text-white block font-mono text-[11px] uppercase tracking-wide">Authentication & Authorization</strong>
                          <p className="text-xs mt-0.5">JWT-based auth with RBAC (CUSTOMER, SELLER, ADMIN). Refresh token rotation with reuse detection — if a stolen token is reused, all sessions for that user are immediately revoked. Access tokens expire in 15 mins, and long-lived refresh tokens (7 days) are stored in the DB for server-side invalidation.</p>
                        </div>
                        <div>
                          <strong className="text-white block font-mono text-[11px] uppercase tracking-wide">Product Catalog Caching & Pagination</strong>
                          <p className="text-xs mt-0.5">Product reads are cached in Redis with a 5-min TTL. Updates trigger cache invalidation via a write-invalidate pattern. Search results use filtered keyset pagination with Base64-encoded opaque cursors, providing O(log n) search performance via composite indexing on `(status, category, price, created_at, id)`.</p>
                        </div>
                        <div>
                          <strong className="text-white block font-mono text-[11px] uppercase tracking-wide">Order Idempotency & Stock Allocation</strong>
                          <p className="text-xs mt-0.5">Order placement is idempotent (requests filtered via Redis lookup with DB unique constraint fallbacks). Handles concurrent stock reservation without DB locks via optimistic locking (`@Version`) with 3-attempt retries and exponential backoff. Available stock is calculated dynamically (`quantity - reserved`) using a decoupled reserved column.</p>
                        </div>
                      </div>
                    )}

                    {activeSubTab === "async" && (
                      <div className="space-y-2.5">
                        <div>
                          <strong className="text-white block font-mono text-[11px] uppercase tracking-wide">Payment Saga (Choreographed System)</strong>
                          <p className="text-xs mt-0.5">Choreography-based distributed saga across Order and Payment services via Kafka. Payment success triggers stock confirmation and order confirmation. Payment failure triggers stock release and order failure with reasons. Modeled for drop-in real payment integration.</p>
                        </div>
                        <div>
                          <strong className="text-white block font-mono text-[11px] uppercase tracking-wide">Transactional Outbox Pattern</strong>
                          <p className="text-xs mt-0.5">To prevent dual-write inconsistencies, orders and outbox events are committed inside a single database transaction. A scheduled poller publishes events every 5 seconds to Kafka topics (`order.placed`, `payment.events`, `order.lifecycle`, `inventory.events`), guaranteeing at-least-once message delivery.</p>
                        </div>
                      </div>
                    )}

                    {activeSubTab === "roadmap" && (
                      <div className="space-y-2 text-xs">
                        <div>
                          <strong className="text-white block font-mono text-[11px] uppercase tracking-wide">Resilience Configurations</strong>
                          <p className="text-slate-300">Redis failures are non-fatal: idempotency checks fall back to the DB, and product caches fall through to the DB via a custom `CacheErrorHandler`. All Redis calls are safely wrapped in try-catches.</p>
                        </div>
                        <div className="pt-1.5 border-t border-slate-800/40">
                          <strong className="text-brand-sky block font-mono text-[11px] uppercase tracking-wide">Planned Enhancements (Roadmap)</strong>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-400 pl-1 mt-1 font-sans text-[11px]">
                            <li><strong>Dead Letter Queue:</strong> Failed Kafka messages routed to DLQ with retry/requeue.</li>
                            <li><strong>Distributed Tracing:</strong> OpenTelemetry trace propagation across HTTP/Kafka.</li>
                            <li><strong>Circuit Breakers:</strong> wrapping stock reservation calls with Resilience4j.</li>
                            <li><strong>Rate Limiting:</strong> Redis-backed per-customer Bucket4j limits on order place.</li>
                            <li><strong>Integration Testing:</strong> saga verification using Testcontainers (Postgres, Redis, Kafka).</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-800/80 mt-6">
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

          {/* Interactive Architecture Visualizer (Right Panel - Styled with horizontal scrolls for mobile) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <GlassCard className="bg-slate-900/20 border-slate-800/80 p-6 flex flex-col h-full" hoverEffect={false}>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                  System Architecture Map
                </span>
                <div className="flex items-center gap-1 text-[10px] text-slate-600 font-mono">
                  <HelpCircle size={10} />
                  <span>Click components to inspect design details</span>
                </div>
              </div>

              {/* Diagrams Wrapper - Provided with horizontal overflow scroll for small viewports */}
              <div className="w-full min-w-0 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-center items-center relative overflow-x-auto overflow-y-hidden md:overflow-hidden select-none h-64 scrollbar-thin scrollbar-thumb-slate-800">
                <div className="min-w-[480px] md:min-w-0 w-full flex justify-center items-center h-full">
                  {activeProjectTab === "intellishop" ? (
                    /* IntelliShop flow diagram (Monolith) */
                    <div className="flex items-center gap-4 w-full justify-around relative">
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
                    <div className="grid grid-cols-4 gap-4 w-full justify-items-center items-center">
                      
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
