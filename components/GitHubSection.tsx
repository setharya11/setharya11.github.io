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

  const [contributionGrid, setContributionGrid] = React.useState<number[][]>(githubStats.contributionData);
  const [totalLastYear, setTotalLastYear] = React.useState<number>(80);

  React.useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user profile stats
        const response = await fetch(`https://api.github.com/users/${githubStats.username}`);
        if (response.ok) {
          const data = await response.json();
          setStats((prev) => ({
            ...prev,
            reposCount: data.public_repos ?? prev.reposCount,
            followersCount: data.followers ?? prev.followersCount,
          }));
        }

        // Fetch live contribution grid details from jogruber v4 API
        const contribResponse = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubStats.username}?y=last`);
        if (contribResponse.ok) {
          const contribData = await contribResponse.json();
          if (contribData.contributions && Array.isArray(contribData.contributions)) {
            const contributionsList: Array<{ date: string; count: number; level: number }> = contribData.contributions;
            
            // Calculate total for last year
            const totalCount = contributionsList.reduce((acc, curr) => acc + curr.count, 0);
            setTotalLastYear(totalCount);
            setStats((prev) => ({ ...prev, contributionsThisYear: totalCount }));

            // Convert linear contribution list (up to last 364 days / 52 weeks) into 7 rows x 52 columns matrix
            // Row 0 = Sunday, Row 6 = Saturday
            const grid: number[][] = Array.from({ length: 7 }, () => []);
            const recentDays = contributionsList.slice(-364); // last 52 weeks

            recentDays.forEach((day) => {
              const dayOfWeek = new Date(day.date).getDay(); // 0 to 6
              grid[dayOfWeek].push(day.level);
            });

            if (grid[0].length > 0) {
              setContributionGrid(grid);
            }
          }
        }
      } catch (err) {
        console.error("Error loading live GitHub stats:", err);
      }
    };

    fetchGitHubStats();
  }, []);

  const getColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-200 border border-emerald-300";
      case 2:
        return "bg-emerald-400 border border-emerald-500";
      case 3:
        return "bg-emerald-600 border border-emerald-700 shadow-xs";
      case 4:
        return "bg-emerald-800 border border-emerald-900 shadow-sm";
      default:
        return "bg-slate-100 border border-slate-200";
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
          className="glass p-8 sm:p-12 rounded-3xl border border-black/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm"
        >
          {/* Info stats (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
                Contributions
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                GitHub Dashboard
              </h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Visualizing code integrations, repository expansions, and activity streams pushed to @{githubStats.username}.
              </p>
            </div>

            {/* Quick counter cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/5 p-4 rounded-2xl border border-black/5 flex flex-col justify-center items-center text-center">
                <GitBranch className="w-4 h-4 text-[#4b5563] mb-1.5" />
                <span className="text-slate-900 text-lg font-black">{stats.reposCount}</span>
                <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Repos</span>
              </div>
              <div className="bg-black/5 p-4 rounded-2xl border border-black/5 flex flex-col justify-center items-center text-center">
                <Users className="w-4 h-4 text-[#4b5563] mb-1.5" />
                <span className="text-slate-900 text-lg font-black">{stats.followersCount}</span>
                <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Followers</span>
              </div>
              <div className="bg-black/5 p-4 rounded-2xl border border-black/5 flex flex-col justify-center items-center text-center">
                <GitPullRequest className="w-4 h-4 text-[#4b5563] mb-1.5" />
                <span className="text-slate-900 text-lg font-black">{stats.contributionsThisYear}</span>
                <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">Pushes</span>
              </div>
            </div>

            {/* View GitHub Link button */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-black/5 hover:bg-black/10 border border-black/10 hover:border-[#4b5563]/50 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 w-full justify-center"
            >
              View GitHub Profile <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Contribution Graph Graph layout (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col justify-center items-start space-y-4">
            <div className="flex justify-between items-center w-full pr-1">
              <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest pl-1">
                Live GitHub Contribution Grid
              </h4>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {totalLastYear} contributions in the last year
              </span>
            </div>

            {/* Grid Container */}
            <div className="w-full bg-slate-50 p-6 rounded-2xl border border-black/5 overflow-x-auto">
              <div className="flex flex-col gap-1.5 min-w-[500px]">
                {contributionGrid.map((row, rIdx) => (
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
              <div className="flex justify-between items-center mt-6 text-[10px] text-slate-500 font-semibold px-1">
                <span>Less active</span>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded bg-emerald-200 border border-emerald-300"></div>
                  <div className="w-2.5 h-2.5 rounded bg-emerald-400 border border-emerald-500"></div>
                  <div className="w-2.5 h-2.5 rounded bg-emerald-600 border border-emerald-700"></div>
                  <div className="w-2.5 h-2.5 rounded bg-emerald-800 border border-emerald-900"></div>
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
