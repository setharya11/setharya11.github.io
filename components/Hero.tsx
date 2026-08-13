"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

export default function Hero() {
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden"
    >
      {/* Dynamic Floating Background Elements */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-[#2413ff]/10 blur-3xl -z-10 animate-pulse duration-5000"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-[#5d5bff]/15 blur-3xl -z-10 animate-pulse duration-8000"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Intro text */}
        <motion.div
          className="md:col-span-7 flex flex-col justify-center space-y-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
            <span className="h-px w-8 bg-[#5d5bff]"></span>
            <span className="text-[#5d5bff] font-bold text-xs uppercase tracking-widest">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white"
          >
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#5d5bff] to-[#2413ff]">{personalInfo.name}</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl font-bold text-gray-300"
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 max-w-xl text-base sm:text-lg leading-relaxed font-medium"
          >
            {personalInfo.description}
          </motion.p>

          {/* Social Icons */}
          <motion.div variants={itemVariants} className="flex gap-4 items-center">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 hover:border-[#5d5bff]/50 hover:bg-[#5d5bff]/10 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 hover:border-[#5d5bff]/50 hover:bg-[#5d5bff]/10 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 bg-white/5 border border-white/10 hover:border-[#5d5bff]/50 hover:bg-[#5d5bff]/10 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Buttons using custom CSS .btn-12 */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-x-6 gap-y-4 pt-4 items-center"
          >
            {/* View Projects */}
            <button
              onClick={() => handleScrollTo("#projects")}
              className="btn-12"
            >
              <span>Explore Board</span>
              <span>View Projects</span>
            </button>

            {/* Contact Me */}
            <button
              onClick={() => handleScrollTo("#contact")}
              className="btn-12"
            >
              <span>Let&apos;s Chat</span>
              <span>Contact Me</span>
            </button>

            {/* Download Resume (standard download button with custom style matching dark theme) */}
            <a
              href={personalInfo.resumeUrl}
              download="Seth_Arya_Resume.pdf"
              className="h-11 px-6 rounded-lg text-sm font-semibold border border-white/10 hover:border-[#5d5bff]/40 hover:bg-white/5 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Image / Abstract Shape Placeholder */}
        <motion.div
          className="md:col-span-5 flex justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Animated Background Ring */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#5d5bff]/30 animate-spin duration-30000 -z-10"></div>
          <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-white/5 -z-10"></div>

          {/* Glowing Neon Backdrop */}
          <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#2413ff] to-[#5d5bff] opacity-20 blur-2xl -z-10"></div>

          {/* Interactive Profile Glass Frame */}
          <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-3xl glass border border-white/10 flex items-center justify-center overflow-hidden p-3 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#020024] to-transparent opacity-60 z-10"></div>
            
            {/* Custom Interactive Avatar Graphic */}
            <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#06004f] to-[#020024] border border-white/5 flex flex-col justify-center items-center text-center p-6 relative">
              {/* Star details inside shape */}
              <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <div className="absolute bottom-8 right-6 w-2 h-2 rounded-full bg-[#5d5bff]/60 blur-xs"></div>
              
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#2413ff] to-[#5d5bff] flex items-center justify-center mb-4 border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-500">
                <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-widest select-none">
                  SA
                </span>
                <div className="absolute inset-0 rounded-full bg-white/10 border border-white/20 animate-ping duration-3000"></div>
              </div>
              <span className="text-white font-bold text-sm tracking-wide z-20 group-hover:text-[#5d5bff] transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-gray-400 text-xs font-semibold mt-1 z-20">
                AI / Web Architect
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow link indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:text-[#5d5bff] transition-colors" onClick={() => handleScrollTo("#about")}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-inherit">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
}
