"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Terminal, Menu, X, FileText } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Simulator", href: "#simulator" },
    { name: "Manifesto", href: "#manifesto" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple origin-left z-50"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-slate-950/85 backdrop-blur-md border-b border-slate-900/80 shadow-lg"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group font-mono text-sm font-bold text-white tracking-tight">
              <div className="p-1.5 rounded-lg bg-brand-blue/10 border border-brand-blue/30 group-hover:bg-brand-blue/20 transition-all">
                <Terminal size={16} className="text-brand-sky" />
              </div>
              <span>harsh<span className="text-brand-blue">.dev</span></span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-mono text-xs font-semibold text-slate-400 hover:text-white hover:underline decoration-brand-blue underline-offset-4 transition-all"
                >
                  {link.name.toLowerCase()}()
                </a>
              ))}
            </div>

            {/* Resume Button */}
            <div className="hidden md:block">
              <a
                href="https://drive.google.com/file/d/1IxUtFg8jIpc1eFyv8hzptphkVvPezSE_/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 font-mono text-xs font-semibold border border-slate-700 bg-slate-900/40 text-slate-300 rounded hover:border-brand-blue hover:text-white transition-all flex items-center gap-1.5"
              >
                <FileText size={12} />
                resume.pdf
              </a>
            </div>

            {/* Mobile Drawer Trigger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border border-slate-800 rounded bg-slate-900 text-slate-400 hover:text-white"
              >
                {isOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <motion.div
            className="md:hidden border-b border-slate-900 bg-slate-950/95 backdrop-blur-lg px-4 py-4 space-y-3 font-mono text-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-slate-400 hover:text-white border-b border-slate-900/40"
              >
                {link.name.toLowerCase()}()
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1IxUtFg8jIpc1eFyv8hzptphkVvPezSE_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 border border-slate-800 bg-slate-900 text-slate-300 rounded flex items-center justify-center gap-1.5 mt-4"
            >
              <FileText size={12} />
              resume.pdf
            </a>
          </motion.div>
        )}
      </nav>
    </>
  );
};
