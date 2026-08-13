"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Award, Calendar, Hash, FileText, CheckCircle2 } from "lucide-react";
import { certifications } from "@/data/portfolioData";

export default function Certifications() {
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleVerify = (id: string) => {
    setVerifyingId(id);
    setTimeout(() => {
      setVerifyingId(null);
      setSuccessId(id);
      setTimeout(() => {
        setSuccessId(null);
      }, 3000);
    }, 1500);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 85 } },
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#2413ff]/5 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            My <span className="text-[#5d5bff]">Certifications</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-[#2413ff] to-[#5d5bff] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.credentialId}
              variants={itemVariants}
              className="glass p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[#5d5bff]/30 transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Ribbon icon badge */}
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-[#5d5bff]/10 text-[#5d5bff] rounded-xl group-hover:bg-[#5d5bff]/25 transition-all">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-lg">
                    <Calendar className="w-3 h-3 text-[#5d5bff]" /> {cert.date}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-[#5d5bff] text-xs sm:text-sm font-semibold">{cert.issuer}</p>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Credential ID verifying bar */}
              <div className="pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <Hash className="w-3.5 h-3.5 text-[#5d5bff]" />
                  <span>ID: {cert.credentialId}</span>
                </div>

                <button
                  onClick={() => handleVerify(cert.credentialId)}
                  disabled={verifyingId !== null || successId === cert.credentialId}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10 hover:border-[#5d5bff]/50 hover:bg-[#5d5bff]/10 text-gray-300 hover:text-white transition-all duration-300 relative flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {verifyingId === cert.credentialId ? (
                      <motion.span
                        key="verifying"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1"
                      >
                        {/* Loading spinner */}
                        <svg className="animate-spin h-3.5 w-3.5 text-[#5d5bff]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </motion.span>
                    ) : successId === cert.credentialId ? (
                      <motion.span
                        key="verified"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1 text-emerald-400 font-bold"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </motion.span>
                    ) : (
                      <motion.span
                        key="verify"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> Verify ID
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
