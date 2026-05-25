"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Avatar3D } from "./Avatar3D";
import { FileText, ArrowUpRight, Mail } from "lucide-react";

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

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden bg-slate-950">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-linear-grid pointer-events-none radial-mask" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Animated badges row */}
            <motion.div className="flex flex-wrap gap-2.5" variants={itemVariants}>
              <Badge text="Backend Focused" variant="blue" pulse={true} />
              <Badge text="8.33 CGPA" variant="cyan" />
              <Badge text="Merit Scholar" variant="purple" />
              <Badge text="Student Intern @ NUV" variant="gray" />
            </motion.div>

            {/* Name and Role Title */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <h1 className="text-sm md:text-base font-mono font-bold tracking-widest text-brand-sky uppercase">
                Hello, I am Harsh Pandya
              </h1>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-sans leading-none">
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-sky to-brand-purple">scalable systems</span> and reliable software.
              </h2>
            </motion.div>

            {/* Subtext */}
            <motion.p
              className="text-base sm:text-lg text-slate-400 font-sans max-w-xl leading-relaxed"
              variants={itemVariants}
            >
              Backend Engineer | Distributed Systems Enthusiast | System Design Learner. Focus areas include Java, Spring Boot, microservices architecture, and caching strategies. Driven by a career goal to design large-scale infrastructure at Google.
            </motion.p>

            {/* Micro Metrics Panel */}
            <motion.div
              className="grid grid-cols-3 gap-6 border-y border-slate-800/80 py-4 w-full max-w-xl font-mono text-left"
              variants={itemVariants}
            >
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">FOCUS LAYER</div>
                <div className="text-sm font-bold text-white mt-1">Backend APIs</div>
              </div>
              <div className="border-l border-slate-800/80 pl-6">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">ARCHITECTURE</div>
                <div className="text-sm font-bold text-white mt-1">Distributed</div>
              </div>
              <div className="border-l border-slate-800/80 pl-6">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">MINDSET</div>
                <div className="text-sm font-bold text-white mt-1">Fault-Tolerant</div>
              </div>
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-2"
              variants={itemVariants}
            >
              <a
                href="#projects"
                className="px-6 py-3 font-mono text-xs font-semibold bg-brand-blue text-white rounded hover:bg-brand-light transition-all flex items-center gap-1.5 glow-blue shadow-lg hover:scale-105"
              >
                View Projects
                <ArrowUpRight size={14} />
              </a>

              <a
                href="https://drive.google.com/file/d/1IxUtFg8jIpc1eFyv8hzptphkVvPezSE_/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 font-mono text-xs font-semibold border border-slate-700 bg-slate-900/60 text-slate-200 rounded hover:bg-slate-800/80 transition-all flex items-center gap-1.5 hover:border-slate-500 hover:scale-105"
              >
                <FileText size={14} />
                Download Resume
              </a>

              <a
                href="#contact"
                className="px-6 py-3 font-mono text-xs font-semibold text-slate-400 hover:text-white transition-all hover:underline"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Short social line */}
            <motion.div className="flex items-center gap-4 mt-6 text-slate-500" variants={itemVariants}>
              <span className="text-[10px] font-mono tracking-widest uppercase">Quick Links //</span>
              <div className="flex items-center gap-3">
                <a href="https://github.com/ha31457" target="_blank" rel="noopener noreferrer" className="hover:text-brand-sky transition-colors">
                  <GithubIcon size={16} />
                </a>
                <a href="https://www.linkedin.com/in/pandya-harsh-dushyantbhai/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-sky transition-colors">
                  <LinkedinIcon size={16} />
                </a>
                <a href="mailto:harshpandya31457@gmail.com" className="hover:text-brand-sky transition-colors">
                  <Mail size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Canvas / Photo column */}
          <motion.div
            className="lg:col-span-5 w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="w-full max-w-md bg-slate-900/10 border border-slate-900/40 rounded-3xl relative overflow-hidden backdrop-blur-3xl shadow-3xl">
              {/* Outer visual framing elements */}
              <div className="absolute top-2 left-4 font-mono text-[9px] text-slate-600 pointer-events-none select-none">
                ENV_VISUALIZER::ACTIVE
              </div>
              <div className="absolute top-2 right-4 flex gap-1 items-center pointer-events-none">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-800"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-800"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              
              <Avatar3D />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
