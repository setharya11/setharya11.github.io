"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BookOpen, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { personalInfo, education, interests, strengths } from "@/data/portfolioData";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#000000]/5 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            About <span className="text-[#4b5563]">Me</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-[#000000] to-[#4b5563] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Panel: Bio, Objective & Strengths (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bio Card */}
            <motion.div variants={cardVariants} className="glass p-8 rounded-2xl border border-black/5 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2 text-[#4b5563]">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Biography</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
                {personalInfo.bio}
              </p>
            </motion.div>

            {/* Objective Card */}
            <motion.div variants={cardVariants} className="glass p-8 rounded-2xl border border-black/5 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold uppercase tracking-wider text-[#4b5563]">
                Career Objective
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
                {personalInfo.objective}
              </p>
            </motion.div>

            {/* Strengths Card */}
            <motion.div variants={cardVariants} className="glass p-8 rounded-2xl border border-black/5 shadow-sm">
              <h3 className="text-lg font-bold uppercase tracking-wider mb-6 text-[#4b5563]">
                Core Strengths
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4b5563] shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm font-medium">{strength}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Panel: Education & Interests (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Education Timeline Card */}
            <motion.div variants={cardVariants} className="glass p-8 rounded-2xl border border-black/5 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-[#4b5563]">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Education</h3>
              </div>
              <div className="space-y-6 relative border-l border-black/10 pl-6 ml-2">
                {education.map((edu, index) => (
                  <div key={index} className="relative space-y-1">
                    {/* timeline node dot */}
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#4b5563] border border-white shadow-[0_0_8px_#4b5563]"></span>
                    
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-black/5 px-2 py-0.5 rounded">
                      {edu.duration}
                    </span>
                    <h4 className="text-slate-900 font-bold text-sm sm:text-base mt-1">{edu.degree}</h4>
                    <p className="text-[#4b5563] text-xs sm:text-sm font-semibold">{edu.institution}</p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 font-medium">{edu.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interests Card */}
            <motion.div variants={cardVariants} className="glass p-8 rounded-2xl border border-black/5 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-[#4b5563]">
                <Heart className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-black/5 border border-black/5 hover:border-[#4b5563]/40 hover:bg-black/10 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
