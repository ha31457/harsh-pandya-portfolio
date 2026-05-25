"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Terminal, ShieldAlert } from "lucide-react";

export const Footer: React.FC = () => {
  const [latency, setLatency] = useState(12);

  // Simulate subtle fluctuating server latency for premium interactivity
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next < 5 ? 5 : next > 25 ? 25 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900/60 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none radial-mask opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Developer status dashboard block */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-500 justify-center md:justify-start">
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-850 px-2 py-1 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400">UPTIME: 99.98%</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-850 px-2 py-1 rounded">
              <Terminal size={10} className="text-brand-cyan" />
              <span className="text-slate-400">PING: {latency}ms</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-850 px-2 py-1 rounded">
              <ShieldAlert size={10} className="text-brand-purple" />
              <span className="text-slate-400">REGION: ap-south-1</span>
            </div>
          </div>

          {/* Quick Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-brand-blue text-slate-400 hover:text-white transition-all cursor-pointer group shadow"
            title="Scroll to top"
          >
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Separator line */}
        <div className="border-t border-slate-900/60 my-6"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-600">
          <div>
            <span>© {new Date().getFullYear()} Harsh Pandya. All rights reserved. Built with Next.js & Three.js.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-slate-400 transition-colors">/about</a>
            <a href="#skills" className="hover:text-slate-400 transition-colors">/skills</a>
            <a href="#projects" className="hover:text-slate-400 transition-colors">/projects</a>
            <a href="#simulator" className="hover:text-slate-400 transition-colors">/simulator</a>
            <a href="#contact" className="hover:text-slate-400 transition-colors">/contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
