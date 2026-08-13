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
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#5d5bff]/5 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            My <span className="text-[#5d5bff]">Skills</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-[#2413ff] to-[#5d5bff] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Skill Groups Selector Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedGroup(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              selectedGroup === null
                ? "bg-gradient-to-r from-[#2413ff] to-[#5d5bff] border-transparent text-white shadow-lg"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
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
                  ? "bg-gradient-to-r from-[#2413ff] to-[#5d5bff] border-transparent text-white shadow-lg"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
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
                  className="glass p-8 rounded-2xl border border-white/5 flex flex-col justify-start relative group hover:border-[#5d5bff]/30 transition-all duration-500"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-[#5d5bff]/10 text-[#5d5bff] rounded-xl group-hover:bg-[#5d5bff]/25 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
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
                        className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm font-semibold hover:text-white hover:bg-[#5d5bff]/20 hover:border-[#5d5bff]/40 transition-all duration-300 shadow-sm flex items-center gap-2 group/skill"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5d5bff] group-hover/skill:scale-125 transition-transform" />
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
