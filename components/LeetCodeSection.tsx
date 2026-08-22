"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Trophy, Flame, ExternalLink } from "lucide-react";
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
    streak: leetcodeStats.streak,
  });

  React.useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const query = `
          query userProfileDetails($username: String!) {
            matchedUser(username: $username) {
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
              }
              userCalendar {
                streak
                totalActiveDays
              }
            }
          }
        `;

        const res = await fetch("https://leetcode.com/graphql/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            variables: { username: leetcodeStats.username },
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const acStats = json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
          const ranking = json?.data?.matchedUser?.profile?.ranking;
          const streak = json?.data?.matchedUser?.userCalendar?.streak;

          if (Array.isArray(acStats)) {
            const allCount = acStats.find((s: any) => s.difficulty === "All")?.count;
            const easyCount = acStats.find((s: any) => s.difficulty === "Easy")?.count;
            const mediumCount = acStats.find((s: any) => s.difficulty === "Medium")?.count;
            const hardCount = acStats.find((s: any) => s.difficulty === "Hard")?.count;

            setStats((prev) => ({
              ...prev,
              solved: allCount ?? prev.solved,
              easy: easyCount ?? prev.easy,
              medium: mediumCount ?? prev.medium,
              hard: hardCount ?? prev.hard,
              contestRank: ranking ? `Rank #${ranking.toLocaleString()}` : prev.contestRank,
              streak: typeof streak === "number" && streak > prev.streak ? streak : prev.streak,
            }));
          }
        }
      } catch (err) {
        // Fallback to static preset in portfolioData.ts if CORS blocked
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
          className="glass p-8 sm:p-12 rounded-3xl border border-black/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm"
        >
          {/* Main profile stats overview (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-black/5">

            {/* SVG Circular Progress Gauge */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Background track */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-slate-200 fill-transparent"
                  strokeWidth="8"
                />
                {/* Animated progress circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-[#4b5563] fill-transparent"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner counter */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 leading-none">{stats.solved}</span>
                <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">
                  Solved
                </span>
              </div>
            </div>

            {/* General metrics info */}
            <div className="space-y-4 text-center sm:text-left">
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  Solve Progress
                </span>
                <h4 className="text-slate-900 text-lg font-extrabold">Problems Dashboard</h4>
                <p className="text-slate-600 text-xs font-semibold">
                  Competency metrics computed out of {stats.total} total platform challenges.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-2.5 py-1 bg-black/5 border border-black/10 rounded-lg text-xs font-semibold text-slate-700">
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
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
                  LeetCode Profile (@{leetcodeStats.username})
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Algorithmic Problem Solving
                </h3>
              </div>

              {/* Badges card: Contest rating & Active Streak */}
              <div className="flex gap-3.5">
                {/* Active Streak Badge */}
                <div className="bg-orange-50 px-3.5 py-2 rounded-xl border border-orange-200 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-orange-600 text-[8px] font-extrabold uppercase tracking-wider">Active Streak</span>
                    <span className="text-orange-950 text-sm font-black">{stats.streak} Days</span>
                  </div>
                </div>

                {/* Contest Rating Badge */}
                <div className="bg-black/5 px-3.5 py-2 rounded-xl border border-black/5 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-[8px] font-bold uppercase tracking-wider">Contest Rating</span>
                    <span className="text-slate-900 text-sm font-black">{stats.contestRating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Progression Concentric Circular Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {/* Easy Circle */}
              <div className="bg-black/5 p-4 rounded-2xl border border-black/5 flex flex-col items-center justify-center text-center space-y-3">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                    {/* Outer Track (Total) */}
                    <circle
                      cx="45"
                      cy="45"
                      r="36"
                      className="stroke-slate-200 fill-transparent"
                      strokeWidth="6"
                    />
                    {/* Inner Progress Arc (Solved) */}
                    <motion.circle
                      cx="45"
                      cy="45"
                      r="36"
                      className="stroke-emerald-500 fill-transparent"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 36}
                      initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                      whileInView={{ strokeDashoffset: (2 * Math.PI * 36) * (1 - stats.easy / stats.easyTotal) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-slate-900 font-extrabold text-base leading-none">{stats.easy}</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-tight mt-0.5">/ {stats.easyTotal}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Easy</span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {((stats.easy / stats.easyTotal) * 100).toFixed(1)}% Solved
                  </span>
                </div>
              </div>

              {/* Medium Circle */}
              <div className="bg-black/5 p-4 rounded-2xl border border-black/5 flex flex-col items-center justify-center text-center space-y-3">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                    {/* Outer Track (Total) */}
                    <circle
                      cx="45"
                      cy="45"
                      r="36"
                      className="stroke-slate-200 fill-transparent"
                      strokeWidth="6"
                    />
                    {/* Inner Progress Arc (Solved) */}
                    <motion.circle
                      cx="45"
                      cy="45"
                      r="36"
                      className="stroke-amber-500 fill-transparent"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 36}
                      initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                      whileInView={{ strokeDashoffset: (2 * Math.PI * 36) * (1 - stats.medium / stats.mediumTotal) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-slate-900 font-extrabold text-base leading-none">{stats.medium}</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-tight mt-0.5">/ {stats.mediumTotal}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Medium</span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {((stats.medium / stats.mediumTotal) * 100).toFixed(1)}% Solved
                  </span>
                </div>
              </div>

              {/* Hard Circle */}
              <div className="bg-black/5 p-4 rounded-2xl border border-black/5 flex flex-col items-center justify-center text-center space-y-3">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                    {/* Outer Track (Total) */}
                    <circle
                      cx="45"
                      cy="45"
                      r="36"
                      className="stroke-slate-200 fill-transparent"
                      strokeWidth="6"
                    />
                    {/* Inner Progress Arc (Solved) */}
                    <motion.circle
                      cx="45"
                      cy="45"
                      r="36"
                      className="stroke-red-500 fill-transparent"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 36}
                      initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                      whileInView={{ strokeDashoffset: (2 * Math.PI * 36) * (1 - stats.hard / stats.hardTotal) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-slate-900 font-extrabold text-base leading-none">{stats.hard}</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-tight mt-0.5">/ {stats.hardTotal}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">Hard</span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {((stats.hard / stats.hardTotal) * 100).toFixed(1)}% Solved
                  </span>
                </div>
              </div>
            </div>

            {/* Profile redirect action */}
            <a
              href={`https://leetcode.com/u/${leetcodeStats.username}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#000000] to-[#4b5563] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] transition-all duration-300 w-full sm:w-fit justify-center"
            >
              Verify LeetCode Profile (@{leetcodeStats.username}) <ExternalLink className="w-4 h-4" />
            </a>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
