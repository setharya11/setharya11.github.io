"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";
import { experiences } from "@/data/portfolioData";

export default function Experience() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 85, damping: 15 },
    },
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#000000]/5 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Work <span className="text-[#4b5563]">Experience</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-[#000000] to-[#4b5563] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-black/10 -translate-x-1/2"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Pulse Node */}
                  <div className="absolute left-4 md:left-1/2 top-8 w-8 h-8 -translate-x-1/2 flex items-center justify-center z-10">
                    <span className="absolute w-4 h-4 rounded-full bg-[#4b5563] border border-white shadow-[0_0_8px_#4b5563]"></span>
                    <span className="absolute w-8 h-8 rounded-full border border-[#4b5563]/40 animate-ping duration-3000"></span>
                  </div>

                  {/* Left Column Spacer for Desktop */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* Card Column */}
                  <motion.div
                    variants={cardVariants}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8"
                  >
                    <div className="glass p-8 rounded-2xl border border-black/5 space-y-6 hover:border-[#4b5563]/30 transition-all duration-300 relative group shadow-sm">
                      {/* Top ribbon for Internship */}
                      {exp.position.toLowerCase().includes("intern") && (
                        <span className="absolute top-4 right-4 bg-[#4b5563]/10 border border-[#4b5563]/30 text-[#4b5563] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          Internship
                        </span>
                      )}

                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-[#4b5563]" />
                          <span>{exp.duration}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#4b5563] transition-colors">
                          {exp.position}
                        </h3>
                        <p className="text-sm font-semibold text-slate-700">{exp.company}</p>
                      </div>

                      {/* Responsibilities bullets */}
                      <ul className="space-y-2.5">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <ChevronRight className="w-4 h-4 text-[#4b5563] shrink-0 mt-0.5" />
                            <span className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                              {resp}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack tags */}
                      <div className="pt-2 border-t border-black/5 space-y-2">
                        <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                          Tech Utilized
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 bg-black/5 border border-black/5 rounded-lg text-xs font-medium text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
