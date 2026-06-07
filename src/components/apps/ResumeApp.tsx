"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { profileData } from "@/content/profile";

import { useWorkspaceStore } from "@/store/workspace.store";

export default function ResumeApp() {
  const { activeItemId } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState<"resume" | "about">(
    activeItemId === "about" ? "about" : "resume"
  );

  React.useEffect(() => {
    if (activeItemId === "about") {
      setActiveTab("about");
    } else {
      setActiveTab("resume");
    }
  }, [activeItemId]);

  return (
    <div className="flex flex-col gap-8 py-4 text-left leading-relaxed w-full">
      {/* Title & Print CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 print:border-neutral-200 print:pb-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-[#ece7df] font-serif print:text-neutral-900">
            在线简历 / Resume
          </h1>
          <p className="mt-2 text-sm text-text-secondary print:text-neutral-500">
            Clancy 的产品工程履历概要，支持直接在线预览或保存为 PDF 归档。
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
            activeTab === "resume" ? "text-accent-sage" : "text-text-muted hover:text-[#ece7df]"
          }`}
        >
          <span>简历摘要 / Resume Summary</span>
          {activeTab === "resume" && (
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
            activeTab === "about" ? "text-accent-sage" : "text-text-muted hover:text-[#ece7df]"
          }`}
        >
          <span>关于我 / About Me</span>
          {activeTab === "about" && (
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
        <div className={`${activeTab === "resume" ? "block" : "hidden print:block"} flex flex-col gap-8 print:gap-6 print:text-xs`}>
          {/* Core Summary */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-accent-sage print:text-neutral-800">
              核心摘要 / Professional Summary
            </h3>
            <p className="text-base text-text-secondary leading-relaxed print:text-neutral-800 print:leading-normal">
              专注于 AI Agent 工作流、状态机控制与数据管道自动化的产品经理与系统工程师。致力于消除语言模型的黑盒随机性，通过 Stage Gate 阻尼和 Controller-Producer-Auditor 设计模式实现高可靠性智能系统。
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
                核心技术栈 / Core Competencies
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-text-secondary print:text-neutral-800">
                <li>• <b>Agent 编排与控制流</b>：Controller-Producer-Auditor 架构, 有限状态机设计</li>
                <li>• <b>大模型应用</b>：LangChain, Vector RAG (Pinecone / Chroma), Prompt Engineering</li>
                <li>• <b>技术与框架</b>：Next.js, TypeScript, React Canvas, Tailwind CSS, Zustand</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-accent-sage mb-4 print:text-neutral-800">
                教育经历 / Education
              </h3>
              <div className="flex flex-col gap-1.5 text-sm text-text-secondary print:text-neutral-800">
                <p className="font-semibold text-[#ece7df] print:text-neutral-900">产品设计与信息系统 学士</p>
                <p className="text-text-muted print:text-neutral-500">Tech University • 2018 - 2022</p>
                <p className="text-text-secondary mt-2 print:text-neutral-700">重点研究：信息提取、人机交互与产品工程化发现机制。</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. About Me Tab (Hidden during print) */}
        <div className={`${activeTab === "about" ? "block" : "hidden"} print:hidden flex flex-col gap-8`}>
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
                  工作方法论 / How I Work
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {profileData.howIWork}
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
