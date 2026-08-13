"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";
import { leetcodeStats } from "@/data/portfolioData";

export default function LeetCodeSection() {
  const [stats, setStats] = React.useState({
    solved: leetcodeStats.solved,
    total: leetcodeStats.total,
    easy: leetcodeStats.categories.easy.solved,
    easyTotal: leetcodeStats.categories.easy.total,
    medium: leetcodeStats.categories.medium.solved,
    mediumTotal: leetcodeStats.categories.medium.total,
    hard: leetcodeStats.categories.hard.solved,
    hardTotal: leetcodeStats.categories.hard.total,
    contestRating: leetcodeStats.contestRating,
    contestRank: leetcodeStats.contestRank,
  });

  React.useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const [profileRes, solvedRes, contestRes] = await Promise.allSettled([
          fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeStats.username}`),
          fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeStats.username}/solved`),
          fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeStats.username}/contest`)
        ]);

        if (solvedRes.status === "fulfilled" && solvedRes.value.ok) {
          const solvedData = await solvedRes.value.json();
          if (solvedData && typeof solvedData.solvedProblem === "number") {
            setStats((prev) => ({
              ...prev,
              solved: solvedData.solvedProblem,
              easy: solvedData.easySolved ?? prev.easy,
              medium: solvedData.mediumSolved ?? prev.medium,
              hard: solvedData.hardSolved ?? prev.hard,
            }));
          }
        }

        if (profileRes.status === "fulfilled" && profileRes.value.ok) {
          const profileData = await profileRes.value.json();
          if (profileData && profileData.ranking) {
            setStats((prev) => ({
              ...prev,
              contestRank: `Rank #${profileData.ranking.toLocaleString()}`,
            }));
          }
        }

        if (contestRes.status === "fulfilled" && contestRes.value.ok) {
          const contestData = await contestRes.value.json();
          if (contestData && contestData.contestRating) {
            setStats((prev) => ({
              ...prev,
              contestRating: Math.round(contestData.contestRating),
            }));
          }
        }
      } catch (err: any) {
        console.warn("LeetCode live sync:", err?.message || err);
      }
    };

    fetchLeetCodeStats();
  }, []);

  const solvedPercent = (stats.solved / stats.total) * 100;

  // SVG Circle stroke definitions
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (solvedPercent / 100) * circumference;

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="glass p-8 sm:p-12 rounded-3xl border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Circular Progress Solved Count (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row justify-center items-center gap-8 bg-[#030026]/40 p-8 rounded-2xl border border-white/5">
            
            {/* SVG Ring Gauge */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                {/* Background Ring */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-white/5 fill-transparent"
                  strokeWidth="8"
                />
                {/* Foreground Ring */}
                <motion.circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-[#5d5bff] fill-transparent"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>

              {/* Solved label count inner absolute text */}
              <div className="absolute text-center flex flex-col justify-center">
                <span className="text-white text-3xl font-black">{stats.solved}</span>
                <span className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">
                  Solved
                </span>
              </div>
            </div>

            {/* General metrics info */}
            <div className="space-y-4 text-center sm:text-left">
              <div className="space-y-1">
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  Solve Progress
                </span>
                <h4 className="text-white text-lg font-extrabold">Problems Dashboard</h4>
                <p className="text-gray-400 text-xs font-semibold">
                  Competency metrics computed out of {stats.total} total platform challenges.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300">
                  Global Rank: {stats.contestRank}
                </span>
              </div>
            </div>

          </div>

          {/* Detailed Easy/Med/Hard progress counters (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
            
            {/* Upper stats title / contest info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5d5bff]">
                  LeetCode Profile (@{leetcodeStats.username})
                </span>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Algorithmic Problem Solving
                </h3>
              </div>

              {/* Contest rating badge card */}
              <div className="flex gap-4">
                <div className="bg-white/2 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider">Contest Rating</span>
                    <span className="text-white text-sm font-black">{stats.contestRating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Progression Bars */}
            <div className="space-y-4">
              {/* Easy */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                  <span className="text-emerald-400">Easy ({stats.easy})</span>
                  <span className="text-gray-500">Target: {stats.easyTotal}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.easy / stats.easyTotal) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-emerald-400 rounded-full"
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                  <span className="text-amber-500">Medium ({stats.medium})</span>
                  <span className="text-gray-500">Target: {stats.mediumTotal}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.medium / stats.mediumTotal) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                  <span className="text-red-500">Hard ({stats.hard})</span>
                  <span className="text-gray-500">Target: {stats.hardTotal}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.hard / stats.hardTotal) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-red-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Profile redirect action */}
            <a
              href={`https://leetcode.com/u/${leetcodeStats.username}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2413ff] to-[#5d5bff] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_15px_rgba(93,91,255,0.4)] transition-all duration-300 w-full sm:w-fit justify-center"
            >
              Verify LeetCode Profile (@{leetcodeStats.username}) <ExternalLink className="w-4 h-4" />
            </a>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
