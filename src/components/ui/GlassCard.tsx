"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "cyan" | "none";
  hoverEffect?: boolean;
  onClick?: () => void;
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glowColor = "none",
  hoverEffect = true,
  onClick,
  id,
}) => {
  const glowClasses = {
    blue: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-brand-blue/30",
    purple: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-brand-purple/30",
    cyan: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-brand-cyan/30",
    none: "",
  };

  const baseClasses = `
    glass-panel rounded-xl p-6 transition-all duration-300 relative overflow-hidden
    ${hoverEffect ? "hover:-translate-y-1 hover:bg-slate-900/50" : ""}
    ${glowColor !== "none" && hoverEffect ? glowClasses[glowColor] : ""}
    ${className}
  `;

  if (hoverEffect) {
    return (
      <motion.div
        id={id}
        className={baseClasses}
        onClick={onClick}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Subtle interior glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        {children}
      </motion.div>
    );
  }

  return (
    <div id={id} className={baseClasses} onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
