"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import GitHubSection from "@/components/GitHubSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import ResumeSection from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen text-slate-900 font-sans overflow-x-hidden selection:bg-slate-300 selection:text-slate-900">
          {/* Scrollable background stars */}
          <StarBackground />

          {/* Transparent Header */}
          <Navbar />

          <main className="w-full">
            {/* Sections mapped according to specifications */}
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <GitHubSection />
            <LeetCodeSection />
            <ResumeSection />
            <Contact />
          </main>

          {/* Quick links & Back-to-top floating actions */}
          <Footer />
        </div>
      )}
    </>
  );
}
