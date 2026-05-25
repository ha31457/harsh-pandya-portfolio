"use client";

import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Terminal, Cpu, Database, Share2, Shield } from "lucide-react";

interface DirectionCard {
  title: string;
  icon: React.ReactNode;
  concept: string;
  body: string;
  metric: string;
}

export const EngineeringDirection: React.FC = () => {
  const directions: DirectionCard[] = [
    {
      title: "Backend Design Patterns",
      icon: <Cpu size={20} className="text-brand-blue" />,
      concept: "Clean REST Architecture & OOP",
      body: "My API designs focus on predictability, explicit request validation, and uniform exception handling. I structure Spring Boot applications using Clean Architecture principles, separating domains from persistence and web delivery frameworks to keep business logic testable and decoupled.",
      metric: "TOMCAT_THREADPOOL_MAX: 200"
    },
    {
      title: "Scalable Databases",
      icon: <Database size={20} className="text-brand-cyan" />,
      concept: "Query Tuning & Storage Layering",
      body: "I understand that database constraints are the bottleneck of almost every large application. I study query plan analyzers, schema normalization tradeoffs, indexing strategies to prevent full-table scans, and memory cache layering using Redis write-through structures to shield datastores.",
      metric: "REDIS_CACHE_TTL: 3600s"
    },
    {
      title: "Asynchronous decoupling",
      icon: <Share2 size={20} className="text-brand-purple" />,
      concept: "Event Streaming with Apache Kafka",
      body: "To scale system write throughput and maintain responsive API loops, I study event-driven architectures. Decoupling non-blocking processes (like transactional emails or analytical updates) into message queues ensures peak traffic spikes do not crash transactional databases.",
      metric: "KAFKA_PARTITIONS_NUM: 8"
    },
    {
      title: "Reliability & Resiliency",
      icon: <Shield size={20} className="text-emerald-400" />,
      concept: "Designing for Graceful Failures",
      body: "Production systems must handle crashes gracefully. I study circuit breaker patterns to prevent cascading failures, exponential backoffs on network API retries, database transaction isolation boundaries, and monitoring diagnostics like memory profiling and thread dumping.",
      metric: "RESILIENCE4J_TIMEOUT: 150ms"
    }
  ];

  return (
    <section id="manifesto" className="py-20 bg-slate-950/20 relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none radial-mask" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          method="PUT"
          path="/api/v1/engineering/direction"
          subtitle="A summary of my core technical philosophies regarding backend robustness, database optimization, message queuing, and reliable microservice topologies."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {directions.map((dir, idx) => (
            <GlassCard
              key={idx}
              className="bg-slate-900/30 border-slate-800/80 p-8 flex flex-col justify-between hover:border-brand-blue/20"
              hoverEffect={true}
            >
              <div>
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center">
                    {dir.icon}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                      {dir.concept}
                    </span>
                    <h4 className="text-lg font-bold text-white font-sans mt-0.5">
                      {dir.title}
                    </h4>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                  {dir.body}
                </p>
              </div>

              {/* Simulated system variables tag */}
              <div className="pt-4 border-t border-slate-800/60 flex justify-between font-mono text-[9px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Terminal size={10} />
                  <span>{dir.metric}</span>
                </div>
                <span>STATUS: STABLE</span>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Engineering Quote / Footer panel */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <GlassCard className="bg-slate-900/10 border-slate-900 p-6 flex flex-col items-center justify-center font-mono text-xs text-slate-500 italic" hoverEffect={false}>
            "System design is not about copying recipes; it's about evaluating trade-offs, calculating resource limits, and designing systems that survive production realities."
          </GlassCard>
        </div>

      </div>
    </section>
  );
};
