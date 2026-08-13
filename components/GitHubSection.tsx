"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { GitPullRequest, GitBranch, Users, ExternalLink } from "lucide-react";
import { githubStats, personalInfo } from "@/data/portfolioData";

export default function GitHubSection() {
  const [stats, setStats] = React.useState({
    reposCount: githubStats.reposCount,
    followersCount: githubStats.followersCount,
    contributionsThisYear: githubStats.contributionsThisYear,
  });

  React.useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubStats.username}`);
        if (!response.ok) throw new Error("GitHub API failed");
        const data = await response.json();

        let contributions = githubStats.contributionsThisYear;
        try {
          const contribResponse = await fetch(`https://github-contributions-api.deno.dev/${githubStats.username}/count`);
          if (contribResponse.ok) {
            const contribData = await contribResponse.json();
            const currentYear = new Date().getFullYear().toString();
            if (contribData.total && contribData.total[currentYear]) {
              contributions = contribData.total[currentYear];
            } else if (contribData.total) {
              const years = Object.keys(contribData.total);
              if (years.length > 0) {
                const latestYear = years.sort().pop()!;
                contributions = contribData.total[latestYear];
              }
            }
          }
        } catch (e) {
          console.warn("Failed to fetch contribution graph details:", e);
        }

        setStats({
          reposCount: data.public_repos ?? githubStats.reposCount,
          followersCount: data.followers ?? githubStats.followersCount,
          contributionsThisYear: contributions,
        });
      } catch (err) {
        console.error("Error loading live GitHub stats:", err);
      }
    };

    fetchGitHubStats();
  }, []);

  const getColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#5d5bff]/20 border border-[#5d5bff]/10";
      case 2:
        return "bg-[#5d5bff]/40 border border-[#5d5bff]/20";
      case 3:
        return "bg-[#2413ff]/60 border border-[#2413ff]/30 shadow-[0_0_4px_rgba(36,19,255,0.4)]";
      case 4:
        return "bg-[#5d5bff] border border-[#5d5bff]/50 shadow-[0_0_8px_#5d5bff]";
      default:
        return "bg-white/5 border border-white/5";
    }
  };

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
          {/* Info stats (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5d5bff]">
                Contributions
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                GitHub Dashboard
              </h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Visualizing code integrations, repository expansions, and activity streams pushed to @{githubStats.username}.
              </p>
            </div>

            {/* Quick counter cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/2 p-4 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center">
                <GitBranch className="w-4 h-4 text-[#5d5bff] mb-1.5" />
                <span className="text-white text-lg font-black">{stats.reposCount}</span>
                <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Repos</span>
              </div>
              <div className="bg-white/2 p-4 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center">
                <Users className="w-4 h-4 text-[#5d5bff] mb-1.5" />
                <span className="text-white text-lg font-black">{stats.followersCount}</span>
                <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Followers</span>
              </div>
              <div className="bg-white/2 p-4 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center">
                <GitPullRequest className="w-4 h-4 text-[#5d5bff] mb-1.5" />
                <span className="text-white text-lg font-black">{stats.contributionsThisYear}</span>
                <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Pushes</span>
              </div>
            </div>

            {/* View GitHub Link button */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5d5bff]/50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 w-full justify-center"
            >
              View GitHub Profile <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Contribution Graph Graph layout (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col justify-center items-start space-y-4">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest pl-1">
              Simulated Contribution Grid (Current Year)
            </h4>

            {/* Grid Container */}
            <div className="w-full bg-[#030026]/40 p-6 rounded-2xl border border-white/5 overflow-x-auto">
              <div className="flex flex-col gap-1.5 min-w-[500px]">
                {githubStats.contributionData.map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-1.5">
                    {row.map((val, cIdx) => (
                      <div
                        key={cIdx}
                        className={`w-3.5 h-3.5 rounded-sm transition-all duration-500 ${getColor(val)}`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Legends */}
              <div className="flex justify-between items-center mt-6 text-[10px] text-gray-500 font-semibold px-1">
                <span>Less active</span>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-white/5 border border-white/5"></div>
                  <div className="w-2.5 h-2.5 rounded bg-[#5d5bff]/20 border border-[#5d5bff]/10"></div>
                  <div className="w-2.5 h-2.5 rounded bg-[#5d5bff]/40 border border-[#5d5bff]/20"></div>
                  <div className="w-2.5 h-2.5 rounded bg-[#2413ff]/60 border border-[#2413ff]/30"></div>
                  <div className="w-2.5 h-2.5 rounded bg-[#5d5bff] border border-[#5d5bff]/50"></div>
                  <span className="ml-1">More active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
