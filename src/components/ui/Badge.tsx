import React from "react";

interface BadgeProps {
  text: string;
  variant?: "blue" | "purple" | "cyan" | "green" | "gray";
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "blue",
  pulse = false,
}) => {
  const styles = {
    blue: "bg-brand-blue/10 text-brand-light border-brand-blue/30 glow-blue/10",
    purple: "bg-brand-purple/10 text-purple-300 border-brand-purple/30 glow-purple/10",
    cyan: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30 glow-cyan/10",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    gray: "bg-slate-800/50 text-slate-300 border-slate-700/50",
  };

  const pulseDots = {
    blue: "bg-brand-light",
    purple: "bg-brand-purple",
    cyan: "bg-brand-cyan",
    green: "bg-emerald-400",
    gray: "bg-slate-400",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium 
        rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105
        ${styles[variant]}
      `}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseDots[variant]}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseDots[variant]}`}></span>
        </span>
      )}
      {text}
    </span>
  );
};
