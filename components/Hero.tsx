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
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-[#000000]/10 blur-3xl -z-10 animate-pulse duration-5000"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-[#4b5563]/15 blur-3xl -z-10 animate-pulse duration-8000"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Intro text */}
        <motion.div
          className="md:col-span-7 flex flex-col justify-center space-y-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
            <span className="h-px w-8 bg-[#4b5563]"></span>
            <span className="text-[#4b5563] font-bold text-xs uppercase tracking-widest">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-slate-900"
          >
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#4b5563] to-[#000000]">{personalInfo.name}</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl font-bold text-slate-700"
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-slate-600 max-w-xl text-base sm:text-lg leading-relaxed font-medium"
          >
            {personalInfo.description}
          </motion.p>

          {/* Social Icons */}
          <motion.div variants={itemVariants} className="flex gap-4 items-center">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-100 border border-slate-200 hover:border-[#4b5563]/50 hover:bg-[#4b5563]/10 rounded-xl text-slate-700 hover:text-[#000000] transition-all duration-300 shadow-sm"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-100 border border-slate-200 hover:border-[#4b5563]/50 hover:bg-[#4b5563]/10 rounded-xl text-slate-700 hover:text-[#000000] transition-all duration-300 shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 bg-slate-100 border border-slate-200 hover:border-[#4b5563]/50 hover:bg-[#4b5563]/10 rounded-xl text-slate-700 hover:text-[#000000] transition-all duration-300 shadow-sm"
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

            {/* Download Resume */}
            <a
              href={personalInfo.resumeUrl}
              download="Seth_Arya_Resume.pdf"
              className="h-11 px-6 rounded-lg text-sm font-semibold border border-slate-300 hover:border-[#4b5563]/40 hover:bg-slate-100 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all duration-300 shadow-sm"
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
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#4b5563]/30 animate-spin duration-30000 -z-10"></div>
          <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-black/5 -z-10"></div>

          {/* Glowing Neon Backdrop */}
          <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#000000] to-[#4b5563] opacity-15 blur-2xl -z-10"></div>

          {/* Interactive Profile Glass Frame */}
          <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-3xl glass border border-black/10 flex items-center justify-center overflow-hidden p-2.5 shadow-xl relative group bg-white/60">
            {/* Custom Profile Picture Frame */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.jpg"
                alt={personalInfo.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 z-10"></div>
              <div className="absolute bottom-3 left-3 right-3 z-20 text-center">
                <span className="text-white font-bold text-sm sm:text-base tracking-wide block drop-shadow-md">
                  {personalInfo.name}
                </span>
                <span className="text-slate-200 text-[11px] font-semibold block drop-shadow-sm">
                  {personalInfo.title}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
