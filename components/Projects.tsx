"use client";

import React, { useState } from "react";
import { motion as motion_pkg, AnimatePresence, Variants } from "framer-motion";
import { Globe, Eye, X, Check } from "lucide-react";
import { Github } from "@/components/Icons";
import { projects } from "@/data/portfolioData";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#000000]/5 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion_pkg.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            My <span className="text-[#4b5563]">Projects</span>
          </motion_pkg.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-[#000000] to-[#4b5563] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <motion_pkg.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12"
        >
          {projects.map((project) => (
            <motion_pkg.div
              key={project.id}
              variants={itemVariants}
              className="flex flex-col"
            >
              {/* Uiverse.io Card 3D Flip style */}
              <div className="card-3d">
                <div className="card-3d-content">
                  
                  {/* Front Side: Display Image & Banner info */}
                  <div className="card-3d-front">
                    <div className="card-img-container">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Floating glowing circles */}
                      <div className="card-circle absolute -bottom-10 -left-10" id="circle-bottom"></div>
                      <div className="card-circle absolute -top-8 -right-8" id="circle-right"></div>
                    </div>

                    <div className="card-3d-front-content">
                      <span className="card-badge uppercase tracking-wider">
                        {project.techStack[0]}
                      </span>

                      <div className="card-description-box">
                        <h3 className="text-slate-900 text-lg font-extrabold tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-slate-700 text-xs sm:text-sm font-medium mt-1">
                          {project.description}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-[10px] bg-black/5 border border-black/10 px-2 py-0.5 rounded text-slate-600 font-semibold">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side: Glow borders, inspect CTA actions */}
                  <div className="card-3d-back">
                    <div className="card-3d-back-content">
                      <div className="space-y-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
                          Project Overview
                        </span>
                        <h3 className="text-slate-900 text-xl font-extrabold">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                          {project.fullDescription.slice(0, 160)}...
                        </p>
                      </div>

                      {/* Call-to-action details modal clicker */}
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="w-full py-3 bg-[#4b5563] hover:bg-[#000000] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 border border-[#4b5563]/50 shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" /> Inspect Project Details
                        </button>
                        
                        <div className="flex gap-2">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 bg-black/5 hover:bg-black/10 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-lg border border-black/10 flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" /> Code
                          </a>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 bg-gradient-to-r from-[#000000] to-[#4b5563] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300"
                          >
                            <Globe className="w-3.5 h-3.5" /> Demo
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion_pkg.div>
          ))}
        </motion_pkg.div>
      </div>

      {/* Details Modal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion_pkg.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          >
            <motion_pkg.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#4b5563] hover:border-[#4b5563]/40 transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto flex-1">
                {/* Hero visual */}
                <div className="h-64 sm:h-80 w-full relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#4b5563]">
                      Project Description
                    </h4>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#4b5563]">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#4b5563] shrink-0 mt-0.5" />
                          <span className="text-slate-600 text-xs sm:text-sm font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badge lists */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#4b5563]">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal action bar footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4 justify-end">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300 flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" /> Source Code
                </a>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-[#000000] to-[#4b5563] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  <Globe className="w-4 h-4" /> Live Demo
                </a>
              </div>
            </motion_pkg.div>
          </motion_pkg.div>
        )}
      </AnimatePresence>
    </section>
  );
}
