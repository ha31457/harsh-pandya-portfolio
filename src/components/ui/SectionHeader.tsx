import React from "react";

interface SectionHeaderProps {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "SYSTEM";
  path: string;
  subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  method = "GET",
  path,
  subtitle,
}) => {
  const methodColors = {
    GET: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    POST: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    PUT: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    DELETE: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    SYSTEM: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-0.5 text-xs font-mono font-bold border rounded uppercase ${methodColors[method]}`}
          >
            {method}
          </span>
          <h2 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-white">
            {path}
          </h2>
        </div>
        <p className="text-sm text-slate-400 font-sans max-w-xl">
          {subtitle}
        </p>
      </div>
      
      {/* Visual System Status mimicry */}
      <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-500">
        <span>STATUS:</span>
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          200 OK
        </span>
        <span className="text-slate-700">|</span>
        <span>LATENCY:</span>
        <span className="text-slate-400">12ms</span>
      </div>
    </div>
  );
};
