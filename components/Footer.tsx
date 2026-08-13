"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  const handleScrollTo = (id: string) => {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#020024]/50 py-12 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo and copyright */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left select-none">
          <span className="text-white font-extrabold text-sm uppercase tracking-wider">
            {personalInfo.name} <span className="text-[#5d5bff]">.</span>
          </span>
          <span className="text-gray-500 text-xs font-semibold">
            &copy; {currentYear} Seth Arya. All rights reserved. Premium Static Build.
          </span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {["#home", "#about", "#skills", "#experience", "#projects", "#certifications", "#contact"].map((link) => (
            <a
              key={link}
              href={link}
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo(link);
              }}
              className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {link.slice(1) || "home"}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="flex gap-4 items-center">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white/5 border border-white/10 hover:border-[#5d5bff]/50 hover:bg-[#5d5bff]/10 rounded-lg text-gray-400 hover:text-white transition-all duration-300"
            aria-label="GitHub Link"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white/5 border border-white/10 hover:border-[#5d5bff]/50 hover:bg-[#5d5bff]/10 rounded-lg text-gray-400 hover:text-white transition-all duration-300"
            aria-label="LinkedIn Link"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2.5 bg-white/5 border border-white/10 hover:border-[#5d5bff]/50 hover:bg-[#5d5bff]/10 rounded-lg text-gray-400 hover:text-white transition-all duration-300"
            aria-label="Email Link"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Floating Scroll back to top button */}
      {showScrollTop && (
        <button
          onClick={() => handleScrollTo("#home")}
          className="fixed bottom-6 right-6 z-35 p-3 rounded-xl bg-[#5d5bff] hover:bg-[#2413ff] text-white border border-[#5d5bff]/40 shadow-[0_0_15px_rgba(93,91,255,0.4)] transition-all duration-300 focus:outline-none cursor-pointer"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 animate-pulse" />
        </button>
      )}
    </footer>
  );
}
