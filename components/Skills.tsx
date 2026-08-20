"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { skillGroups } from "@/data/portfolioData";

export default function Skills() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  const handleGroupClick = (groupName: string) => {
    setSelectedGroup(selectedGroup === groupName ? null : groupName);
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#4b5563]/5 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            My <span className="text-[#4b5563]">Skills</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-[#000000] to-[#4b5563] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Skill Groups Selector Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedGroup(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              selectedGroup === null
                ? "bg-gradient-to-r from-[#000000] to-[#4b5563] border-transparent text-white shadow-lg"
                : "bg-black/5 border-black/10 text-slate-600 hover:text-slate-900"
            }`}
          >
            All Categories
          </button>
          {skillGroups.map((group) => (
            <button
              key={group.name}
              onClick={() => handleGroupClick(group.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 ${
                selectedGroup === group.name
                  ? "bg-gradient-to-r from-[#000000] to-[#4b5563] border-transparent text-white shadow-lg"
                  : "bg-black/5 border-black/10 text-slate-600 hover:text-slate-900"
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>

        {/* Skills Display Panel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillGroups
            .filter((group) => selectedGroup === null || group.name === selectedGroup)
            .map((group) => {
              const IconComponent = group.icon;
              return (
                <motion.div
                  key={group.name}
                  variants={itemVariants}
                  className="glass p-8 rounded-2xl border border-black/5 flex flex-col justify-start relative group hover:border-[#4b5563]/30 transition-all duration-500 shadow-sm"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-[#4b5563]/10 text-[#4b5563] rounded-xl group-hover:bg-[#4b5563]/25 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wider">
                      {group.name}
                    </h3>
                  </div>

                  {/* Skills Badges Stack */}
                  <div className="flex flex-wrap gap-2.5 flex-1 content-start">
                    {group.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-3.5 py-2 rounded-xl bg-black/5 border border-black/5 text-slate-700 text-sm font-semibold hover:text-slate-900 hover:bg-[#4b5563]/15 hover:border-[#4b5563]/40 transition-all duration-300 shadow-sm flex items-center gap-2 group/skill"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4b5563] group-hover/skill:scale-125 transition-transform" />
                        <span>{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
}
