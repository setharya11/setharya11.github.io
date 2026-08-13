"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Linkedin } from "@/components/Icons";
import { personalInfo } from "@/data/portfolioData";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmail("");
      setMessage("");

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 1800);
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
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Decorative gradient flare */}
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#2413ff]/5 blur-3xl -z-10 animate-pulse duration-10000"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Get In <span className="text-[#5d5bff]">Touch</span>
          </motion.h2>
          <div className="h-1 w-12 bg-gradient-to-r from-[#2413ff] to-[#5d5bff] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Layout Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column: Contact Cards info (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div variants={itemVariants} className="space-y-2 text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5d5bff]">
                Let&apos;s Build Together
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Connection Hub
              </h3>
              <p className="text-gray-400 text-sm sm:text-base font-medium leading-relaxed">
                Have a project idea, integration query, or open position? Drop a line via the form, or reach out directly on social hubs.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {/* Email Card */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-[#5d5bff]/30 transition-all duration-300 group"
              >
                <div className="p-3 bg-[#5d5bff]/10 text-[#5d5bff] rounded-xl group-hover:bg-[#5d5bff]/25 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                    Direct Email
                  </h4>
                  <span className="text-white text-sm font-semibold mt-0.5 break-all">
                    {personalInfo.email}
                  </span>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-[#5d5bff]/30 transition-all duration-300 group"
              >
                <div className="p-3 bg-[#5d5bff]/10 text-[#5d5bff] rounded-xl group-hover:bg-[#5d5bff]/25 transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                    Professional Network
                  </h4>
                  <span className="text-white text-sm font-semibold mt-0.5">
                    linkedin.com/in/{personalInfo.name.toLowerCase().replace(/\s+/g, "")}
                  </span>
                </div>
              </a>

              {/* Location Card */}
              <div className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-[#5d5bff]/30 transition-all duration-300 group">
                <div className="p-3 bg-[#5d5bff]/10 text-[#5d5bff] rounded-xl group-hover:bg-[#5d5bff]/25 transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                    Headquarters
                  </h4>
                  <span className="text-white text-sm font-semibold mt-0.5">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form with Uiverse container class (lg:col-span-7) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex justify-center lg:justify-end">
            
            {/* Uiverse.io styled form-container */}
            <div className="form-container">
              <form onSubmit={handleSubmit} className="form text-left">
                
                {/* Email field */}
                <div className="form-group">
                  <label htmlFor="email">Company Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message field */}
                <div className="form-group">
                  <label htmlFor="textarea">How Can We Help You?</label>
                  <textarea
                    name="textarea"
                    id="textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, timelines, or role..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submission State Banner */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-emerald-400 font-semibold text-xs flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Message received! I will review and reply shortly.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  className="form-submit-btn cursor-pointer"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1.5">
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      Submit <Send className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>

              </form>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
