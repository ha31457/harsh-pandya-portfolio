"use client";

import React, { useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Badge } from "../ui/Badge";
import { Mail, FileText, Send, CheckCircle } from "lucide-react";

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

const LeetCodeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(245, 158, 11, 0.2)" stroke="#F59E0B" />
    <path d="M2 17l10 5 10-5" stroke="#F59E0B" />
    <path d="M2 12l10 5 10-5" stroke="#F59E0B" />
  </svg>
);
import confetti from "canvas-confetti";

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill in all required form fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "Portfolio Contact Event",
          message: formState.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        
        // Fire premium celebratory confetti
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#3B82F6", "#38BDF8", "#A855F7", "#06B6D4"],
        });

        // Reset form fields
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.error || "Failed to transmit message. Please try again.");
      }
    } catch (error) {
      console.error("Transmit error:", error);
      alert("An unexpected network transmission error occurred. Please check console logs.");
    } finally {
      setIsSubmitting(false);
      // Clear success banner after delay
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }
  };

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/ha31457",
      icon: <GithubIcon size={18} />,
      label: "ha31457",
      color: "hover:text-white hover:border-white/20 hover:bg-white/5",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/pandya-harsh-dushyantbhai/",
      icon: <LinkedinIcon size={18} />,
      label: "pandya-harsh-dushyantbhai",
      color: "hover:text-brand-blue hover:border-brand-blue/20 hover:bg-brand-blue/5",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/harshpandya31457/",
      icon: <LeetCodeIcon size={18} />,
      label: "harshpandya31457",
      color: "hover:text-amber-500 hover:border-amber-500/20 hover:bg-amber-500/5",
    },
    {
      name: "Email",
      url: "mailto:harshpandya31457@gmail.com",
      icon: <Mail size={18} />,
      label: "harshpandya31457@gmail.com",
      color: "hover:text-brand-cyan hover:border-brand-cyan/20 hover:bg-brand-cyan/5",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-950 relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none radial-mask" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          method="POST"
          path="/api/v1/contact"
          subtitle="Initiate a connection. Submit the messaging form below or use direct developer handles to get in touch."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Direct Social Channels (Left - 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            <div className="flex flex-col gap-6">
              <h3 className="font-mono text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                Direct Channels
              </h3>

              <div className="flex flex-col gap-3.5">
                {socials.map((social, sIdx) => (
                  <a
                    key={sIdx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-4 rounded-xl border border-slate-800/80 bg-slate-900/30 flex items-center gap-4 text-slate-300 font-mono transition-all duration-300
                      ${social.color}
                    `}
                  >
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                      {social.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider">{social.name}</span>
                      <span className="text-xs font-semibold text-white mt-0.5">{social.label}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume Callout Card */}
            <GlassCard className="bg-slate-900/20 border-slate-800/60 p-6 flex flex-col gap-4 mt-auto" hoverEffect={true}>
              <div className="flex items-center gap-3">
                <FileText className="text-brand-purple" size={24} />
                <div>
                  <h4 className="text-sm font-bold text-white font-sans">Engineering Curriculum Vitae</h4>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Google Drive Link</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Review my academic credentials, certifications, data science internships, and software systems portfolio in a single PDF.
              </p>
              <a
                href="https://drive.google.com/file/d/1IxUtFg8jIpc1eFyv8hzptphkVvPezSE_/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 bg-slate-900 border border-slate-700 hover:border-brand-purple rounded font-mono text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                Download Resume PDF
              </a>
            </GlassCard>
          </div>

          {/* Contact Messaging Form (Right - 7 Cols) */}
          <div className="lg:col-span-7 flex">
            <GlassCard className="bg-slate-900/30 p-8 flex-1 flex flex-col justify-between border-slate-800/80 h-full" hoverEffect={false}>
              
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 h-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-mono text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Messaging Form
                  </h3>
                  <Badge text="SMTP Service" variant="blue" pulse={true} />
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 items-start">
                    <label className="font-mono text-[10px] text-slate-400 uppercase">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 items-start">
                    <label className="font-mono text-[10px] text-slate-400 uppercase">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@company.com"
                      className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 items-start">
                  <label className="font-mono text-[10px] text-slate-400 uppercase">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Microservices / System Consulting"
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5 items-start flex-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Provide details about your query here..."
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors resize-none flex-1"
                  />
                </div>

                {submitSuccess && (
                  <div className="p-3 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center gap-2 font-mono text-[10px] text-left animate-fadeIn">
                    <CheckCircle size={14} className="flex-shrink-0" />
                    <span>SUCCESS: message sent! Celebratory confetti triggered. I will follow up shortly.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-brand-blue text-white rounded font-mono text-xs font-bold hover:bg-brand-light flex items-center justify-center gap-2 glow-blue shadow-lg cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                >
                  <Send size={12} className={isSubmitting ? "animate-pulse" : ""} />
                  {isSubmitting ? "TRANSMITTING EVENT..." : "SUBMIT_FORM_EVENT"}
                </button>
              </form>

            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};
