"use client";

import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Badge } from "../ui/Badge";
import { Calendar, Award, Briefcase, GraduationCap, CheckCircle } from "lucide-react";

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-slate-950 relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none radial-mask" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          method="GET"
          path="/api/v1/experience/timeline"
          subtitle="Explore my professional experience, academic achievements, and academic milestones."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Professional Experience (Left Panel - 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <h3 className="font-mono text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Briefcase size={16} className="text-brand-blue" />
              Professional Experience
            </h3>

            {/* Navrachana University Intern Entry */}
            <GlassCard className="bg-slate-900/30 p-6 border-slate-800/80" hoverEffect={true}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white font-sans">
                    Student Intern
                  </h4>
                  <span className="text-xs font-mono text-brand-sky font-semibold">
                    Navrachana University
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge text="Current Role" variant="cyan" pulse={true} />
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Calendar size={12} />
                    Active
                  </span>
                </div>
              </div>

              {/* Responsibilities list */}
              <ul className="space-y-3 font-sans text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-brand-cyan mt-0.5 flex-shrink-0" />
                  <span>
                    Assisting the lead faculty in coordinating academic teaching sessions for <strong className="text-white">Data Science</strong> classes, bridging theoretical topics with practical implementation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-brand-cyan mt-0.5 flex-shrink-0" />
                  <span>
                    Helping students master core concepts in database management systems, data analysis pipelines, and structural query logic.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-brand-cyan mt-0.5 flex-shrink-0" />
                  <span>
                    Conducting collaborative code reviews and problem-solving exercises during academic workshops to accelerate peer technical growth.
                  </span>
                </li>
              </ul>

              {/* System logs decoration at bottom */}
              <div className="mt-6 pt-4 border-t border-slate-800/40 flex justify-between font-mono text-[9px] text-slate-600">
                <span>ROLE_ID: NUV_INTERN_2026</span>
                <span>DEPT: DATA_SCIENCE</span>
              </div>
            </GlassCard>
          </div>

          {/* Academic Milestones & Achievements (Right Panel - 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <h3 className="font-mono text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <GraduationCap size={16} className="text-brand-purple" />
              Education & Achievements
            </h3>

            {/* B.Tech Details */}
            <GlassCard className="bg-slate-900/30 p-6 border-slate-800/80" hoverEffect={true}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-[10px] font-mono text-brand-purple font-bold uppercase tracking-widest">
                    Degree Program
                  </span>
                  <h4 className="text-base font-bold text-white font-sans mt-0.5">
                    Bachelor of Technology
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    Computer Science and Engineering
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-mono font-bold text-brand-purple">8.33</span>
                  <span className="text-[9px] font-mono text-slate-500"> / 10 CGPA</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Currently moving into my <strong className="text-white">4th year</strong> of studies. Specialized courses include Object-Oriented Programming, Database Management Systems, Data Structures & Algorithms, and Computer Networks.
              </p>
            </GlassCard>

            {/* Scholarship Award */}
            <GlassCard className="bg-slate-900/30 p-6 border-slate-800/80 flex items-start gap-4" hoverEffect={true}>
              <div className="p-2.5 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple mt-1">
                <Award size={20} className="animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[9px] font-mono text-brand-purple font-bold uppercase tracking-widest">
                    Academic Honour
                  </span>
                  <Badge text="Merit Award" variant="purple" />
                </div>
                <h4 className="text-sm font-bold text-white font-sans mt-0.5">
                  20% Merit-Based Scholarship
                </h4>
                <p className="text-xs text-slate-400 font-sans mt-1.5 leading-relaxed">
                  Awarded by Navrachana University for consistent academic performance and outstanding marks in core Computer Science curriculum modules.
                </p>
              </div>
            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};
