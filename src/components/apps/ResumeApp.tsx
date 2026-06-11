"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { profileDatas } from "@/content/profile";

import { useWorkspaceStore } from "@/store/workspace.store";

export default function ResumeApp() {
  const { activeItemId, portfolioMode } = useWorkspaceStore();
  const profileData = profileDatas[portfolioMode];
  const [activeTab, setActiveTab] = useState<"resume" | "about">(
    activeItemId === "about" ? "about" : "resume"
  );
  const resolvedActiveTab = activeItemId === "about" ? "about" : activeTab;

  return (
    <div className="flex flex-col gap-8 py-4 text-left leading-relaxed w-full">
      {/* Title & Print CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 print:border-neutral-200 print:pb-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-[#ece7df] font-serif print:text-neutral-900">
            在线简历 / Resume
          </h1>
          <p className="mt-2 text-sm text-text-secondary print:text-neutral-500">
            {portfolioMode === "ai"
              ? "Conrad 的 AI 产品经理履历摘要，保留核心经历、能力结构和项目主线。"
              : "Conrad 的产品经理履历摘要，保留核心经历、能力结构和项目主线。"}
          </p>
        </div>

        {/* Print Button (Hidden during actual print) */}
        <button
          onClick={() => typeof window !== "undefined" && window.print()}
          className="self-start sm:self-center relative overflow-hidden px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest text-[#ece7df] uppercase border border-accent-sage/30 bg-accent-sage/5 hover:border-accent-sage hover:bg-accent-sage/15 transition-all duration-300 cursor-pointer print:hidden"
        >
          打印 / 导出 PDF
        </button>
      </div>

      {/* Tabs Switcher (Hidden during print) */}
      <div className="flex border-b border-white/5 pb-2 gap-8 print:hidden select-none">
        <button
          onClick={() => setActiveTab("resume")}
          className={`pb-3 text-sm tracking-wider font-semibold uppercase relative transition-all duration-300 cursor-pointer focus:outline-none ${
            resolvedActiveTab === "resume" ? "text-accent-sage" : "text-text-muted hover:text-[#ece7df]"
          }`}
        >
          <span>简历摘要 / Resume Summary</span>
          {resolvedActiveTab === "resume" && (
            <motion.div
              layoutId="resumeActiveTab"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-sage"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`pb-3 text-sm tracking-wider font-semibold uppercase relative transition-all duration-300 cursor-pointer focus:outline-none ${
            resolvedActiveTab === "about" ? "text-accent-sage" : "text-text-muted hover:text-[#ece7df]"
          }`}
        >
          <span>关于我 / About Me</span>
          {resolvedActiveTab === "about" && (
            <motion.div
              layoutId="resumeActiveTab"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-sage"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="w-full">
        {/* 1. Resume Summary Tab (Forced visible during print) */}
        <div className={`${resolvedActiveTab === "resume" ? "block" : "hidden print:block"} flex flex-col gap-8 print:gap-6 print:text-xs`}>
          {/* Core Summary */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-accent-sage print:text-neutral-800">
              核心摘要 / Professional Summary
            </h3>
            <p className="text-base text-text-secondary leading-relaxed print:text-neutral-800 print:leading-normal">
              {profileData.resumeSummary}
            </p>
          </div>

          {/* Experience details */}
          <div className="flex flex-col gap-6 print:gap-4">
            <h3 className="text-xs uppercase font-bold tracking-widest text-accent-sage border-b border-white/5 pb-2 print:text-neutral-800 print:border-neutral-200">
              工作履历 / Selected Experience
            </h3>
            <div className="flex flex-col gap-6 print:gap-4">
              {profileData.selectedExperience.map((exp, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-8 pb-6 border-b border-white/5 last:border-none last:pb-0 print:border-neutral-200 print:pb-4">
                  <span className="text-xs font-semibold text-accent-sage tracking-wider sm:w-28 shrink-0 mt-0.5 print:text-neutral-700">
                    {exp.period}
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-[#ece7df] print:text-neutral-900">
                      {exp.role}
                    </h4>
                    <span className="text-xs text-text-muted block mt-0.5 print:text-neutral-500">
                      {exp.company}
                    </span>
                    <ul className="list-disc list-inside text-sm text-text-secondary leading-relaxed mt-3 flex flex-col gap-1.5 print:text-neutral-800 print:leading-normal">
                      {exp.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8 print:border-neutral-200 print:pt-6 print:gap-4">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-accent-sage mb-4 print:text-neutral-800">
                核心能力 / Core Competencies
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-text-secondary print:text-neutral-800">
                {profileData.coreCapabilities.slice(0, 5).map((cap) => (
                  <li key={cap.name}>• <b>{cap.name}</b>：{cap.description}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-accent-sage mb-4 print:text-neutral-800">
                教育经历 / Education
              </h3>
              <div className="flex flex-col gap-1.5 text-sm text-text-secondary print:text-neutral-800">
                <p className="font-semibold text-[#ece7df] print:text-neutral-900">{profileData.education.degree}</p>
                <p className="text-text-muted print:text-neutral-500">{profileData.education.school} • {profileData.education.period}</p>
                <p className="text-text-secondary mt-2 print:text-neutral-700">{profileData.education.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. About Me Tab (Hidden during print) */}
        <div className={`${resolvedActiveTab === "about" ? "block" : "hidden"} print:hidden flex flex-col gap-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Vision & Philosophy */}
            <div className="flex flex-col gap-6">
              {/* Who I Am */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 text-left">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-3">
                  关于我 / Who I Am
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {profileData.whoIAm}
                </p>
              </div>

              {/* What I Care About */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 text-left">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-3">
                  关注重点 / What I Care About
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {profileData.whatICareAbout}
                </p>
              </div>

              {/* How I Work */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 text-left">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-3">
                  转向 AI 产品 / How I Work
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {profileData.howIWork}
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/5 text-left">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-3">
                  当前方向 / Direction
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {profileData.careerDirection}
                </p>
              </div>
            </div>

            {/* Right Column: Capabilities & Tools */}
            <div className="flex flex-col gap-6">
              {/* Core Capabilities */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 text-left">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-4">
                  核心能力 / Core Capabilities
                </h3>
                <div className="flex flex-col gap-4">
                  {profileData.coreCapabilities.map((cap) => (
                    <div key={cap.name} className="border-l border-white/10 pl-4 py-0.5">
                      <h4 className="text-sm font-semibold text-[#ece7df]">{cap.name}</h4>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{cap.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Methods */}
              <div className="glass-card p-6 rounded-2xl border border-white/5 text-left">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-4">
                  工具与方法箱 / Tools & Methods
                </h3>
                <div className="flex flex-col gap-4">
                  {profileData.toolsAndMethods.map((tool) => (
                    <div key={tool.category} className="flex flex-col gap-1.5">
                      <span className="text-[9px] text-text-muted uppercase tracking-wider font-semibold">
                        {tool.category}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {tool.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs text-[#ece7df] bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
