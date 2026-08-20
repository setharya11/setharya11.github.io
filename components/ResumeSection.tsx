"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FileText, Download, Briefcase, GraduationCap, Award } from "lucide-react";
import { personalInfo, education, experiences, skillGroups } from "@/data/portfolioData";

export default function ResumeSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            My <span className="text-[#4b5563]">Resume</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-[#000000] to-[#4b5563] mx-auto mt-4 rounded-full"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Mock Resume Document Glass Sheet */}
          <div className="glass rounded-3xl border border-black/5 shadow-xl overflow-hidden mb-8">
            
            {/* Header Document bar */}
            <div className="bg-slate-100/80 px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/80"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-slate-600 text-xs font-semibold select-none flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#4b5563]" /> resume_seth_arya.pdf
              </span>
              <div className="w-16"></div> {/* spacer */}
            </div>

            {/* Document Body preview */}
            <div className="p-8 sm:p-12 bg-white space-y-8 select-none text-left">
              {/* Header profile */}
              <div className="border-b border-black/5 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-slate-900 text-2xl font-black">{personalInfo.name}</h3>
                  <p className="text-[#4b5563] text-sm font-semibold mt-0.5">{personalInfo.title}</p>
                </div>
                <div className="text-xs text-slate-500 space-y-1 font-medium">
                  <p>Email: {personalInfo.email}</p>
                  <p>Location: {personalInfo.location}</p>
                </div>
              </div>

              {/* Bio summary */}
              <div className="space-y-2">
                <h4 className="text-slate-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#4b5563]" /> Executive Summary
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {personalInfo.bio}
                </p>
              </div>

              {/* Experiences mock summary */}
              <div className="space-y-4">
                <h4 className="text-slate-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#4b5563]" /> Professional History
                </h4>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                        <span className="text-slate-900">{exp.position}</span>
                        <span className="text-slate-500 font-semibold">{exp.duration}</span>
                      </div>
                      <p className="text-[#4b5563] text-xs font-semibold">{exp.company}</p>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium">
                        {exp.responsibilities[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education mock summary */}
              <div className="space-y-3">
                <h4 className="text-slate-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#4b5563]" /> Education
                </h4>
                {education.slice(0, 1).map((edu, idx) => (
                  <div key={idx} className="space-y-1 text-xs sm:text-sm">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-900">{edu.degree}</span>
                      <span className="text-slate-500 font-semibold">{edu.duration}</span>
                    </div>
                    <p className="text-slate-600 text-xs font-medium">
                      {edu.institution} | {edu.details.split(".")[0]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills summary list */}
              <div className="space-y-2">
                <h4 className="text-slate-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#4b5563]" /> Skill Index
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skillGroups.map((grp) =>
                    grp.skills.map((sk) => (
                      <span
                        key={sk.name}
                        className="px-2 py-1 bg-black/5 border border-black/5 rounded text-[10px] text-slate-600 font-bold"
                      >
                        {sk.name}
                      </span>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Download button wrapper */}
          <div className="flex justify-center">
            <a
              href={personalInfo.resumeUrl}
              download="Seth_Arya_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#000000] to-[#4b5563] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer"
            >
              <Download className="w-4 h-4 animate-bounce duration-2000" /> Download Document PDF
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
