"use client";

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspace.store";
import { projects } from "@/content/site.config";
import AppIcon from "@/components/ui/AppIcon";
import { caseStudies } from "@/content/cases";
import { thinkingItems } from "@/content/thinking";
import { noteItems } from "@/content/notes";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function ProjectsApp() {
  const { activeItemId, openApp } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState<"library" | "cases">("library");

  // Categories based on Maturity Level
  const matureProjects = projects.filter((p) => p.status === "mature" || p.status === "shipped");
  const buildingProjects = projects.filter((p) => p.status && ["building", "prototype", "research"].includes(p.status));

  // If an item is selected, render details (either project details or case study details)
  if (activeItemId) {
    const project = projects.find((p) => p.id === activeItemId);
    const caseStudy = caseStudies.find((c) => c.id === activeItemId);

    // 1. Render Case Study Details View
    if (caseStudy) {
      const relatedProject = projects.find((p) => p.id === caseStudy.projectId);
      return (
        <div className="text-left py-4 flex flex-col gap-8">
          {/* Detail Header */}
          <div>
            <span className="text-[10px] tracking-[0.25em] font-semibold text-accent-sage uppercase block mb-2">
              CASE STUDY / 深度案例拆解
            </span>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#ece7df] font-serif mt-2">
              {caseStudy.title}
            </h1>
            {relatedProject && (
              <button
                onClick={() => openApp("projects", relatedProject.id)}
                className="text-xs text-text-muted mt-4 hover:text-accent-sage transition-colors duration-300 flex items-center gap-1.5 cursor-pointer focus:outline-none"
              >
                <span>关联项目：</span>
                <span className="underline font-medium text-accent-sage/90">{relatedProject.title}</span>
                <span>→</span>
              </button>
            )}
          </div>

          {/* Case Detailed Sections */}
          <div className="flex flex-col gap-8 w-full border-t border-white/5 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                  问题背景 / Context
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{caseStudy.context}</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                  痛点挑战 / Problem
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{caseStudy.problem}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                  约束条件 / Constraints
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{caseStudy.constraints}</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                  核心决策 / Decision
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{caseStudy.decision}</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 border-t border-white/5 pt-6">
              <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                备选方案 / Alternatives Considered
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                {caseStudy.alternativesConsidered}
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 border-t border-white/5 pt-6">
              <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                解决方案 / Solution
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">{caseStudy.solution}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                  工程实现 / Implementation
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{caseStudy.implementation}</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                  测试验证 / Validation
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{caseStudy.validation}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                  项目产出 / Outcome
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{caseStudy.outcome}</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-accent-sage mb-3">
                  深度复盘 / Reflection
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{caseStudy.reflection}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. Render Project Details View
    if (project) {
      const relatedCases = caseStudies.filter((c) => project.relatedCaseIds?.includes(c.id));
      const relatedThinking = thinkingItems.filter((t) => project.relatedThinkingIds?.includes(t.id));
      const relatedNotes = noteItems.filter((n) => project.relatedNoteIds?.includes(n.id));

      return (
        <div className="text-left py-4 flex flex-col gap-8">
          {/* Detail Header */}
          <div>
            <span className="text-[10px] tracking-[0.25em] font-semibold text-accent-sage uppercase">
              {project.category} / {(project.status === "mature" || project.status === "shipped") ? "已上线" : "探索原型"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#ece7df] font-serif mt-2">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-text-secondary mt-4 leading-relaxed max-w-3xl">
              {project.oneLiner}
            </p>
          </div>

          {/* Project Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-white/5 py-6">
            <div>
              <span className="text-[10px] text-text-muted uppercase tracking-wider block">项目定位</span>
              <span className="text-sm text-[#ece7df] mt-1.5 block font-medium">{project.category}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase tracking-wider block">技术标签</span>
              <span className="text-sm text-[#ece7df] mt-1.5 block">{project.tags.join(" • ")}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase tracking-wider block">当前状态</span>
              <span className="text-sm text-accent-sage font-medium mt-1.5 block capitalize">{project.status}</span>
            </div>
          </div>

          {/* Project Detailed Explanations */}
          <div className="flex flex-col gap-8 w-full">
            <div className="prose prose-invert text-base text-text-secondary leading-relaxed flex flex-col gap-5">
              <ReactMarkdown
                components={{
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold text-[#ece7df] mt-8 mb-4 border-l-2 border-accent-sage/60 pl-4" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                  li: ({ node, ...props }) => <li className="list-disc list-inside mb-2.5 pl-2" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-2 border-white/15 pl-4 py-2 my-4 italic text-text-muted bg-white/[0.01] rounded-r-md" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-white/5 px-1.5 py-0.5 rounded text-accent-sage font-mono text-xs border border-white/10" {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 overflow-x-auto font-mono text-sm text-[#ece7df] leading-relaxed my-4" {...props} />
                  ),
                }}
              >
                {project.contentBody}
              </ReactMarkdown>
            </div>

            {/* System Association Network */}
            {(relatedCases.length > 0 || relatedThinking.length > 0 || relatedNotes.length > 0) && (
              <div className="border-t border-white/5 pt-8 mt-4 flex flex-col gap-6">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-accent-sage">
                  系统关联网络 / Relationship Network
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Related Cases (Redirects inside ProjectsApp!) */}
                  {relatedCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => openApp("projects", c.id)}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-accent-sage/30 hover:bg-white/[0.03] transition-all duration-300 text-left cursor-pointer focus:outline-none"
                    >
                      <span className="text-[9px] uppercase tracking-wider text-text-muted font-semibold">
                        关联问题解剖 / Case Study
                      </span>
                      <span className="text-xs font-semibold text-[#ece7df] hover:text-accent-sage transition-colors duration-200">
                        {c.title}
                      </span>
                    </button>
                  ))}

                  {/* Related Thinking */}
                  {relatedThinking.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => openApp("thinking", t.id)}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-accent-sage/30 hover:bg-white/[0.03] transition-all duration-300 text-left cursor-pointer focus:outline-none"
                    >
                      <span className="text-[9px] uppercase tracking-wider text-text-muted font-semibold">
                        关联方法模型 / Methodology
                      </span>
                      <span className="text-xs font-semibold text-[#ece7df] hover:text-accent-sage transition-colors duration-200">
                        {t.title}
                      </span>
                    </button>
                  ))}

                  {/* Related Notes */}
                  {relatedNotes.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => openApp("thinking", n.id)}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-accent-sage/30 hover:bg-white/[0.03] transition-all duration-300 text-left cursor-pointer focus:outline-none"
                    >
                      <span className="text-[9px] uppercase tracking-wider text-text-muted font-semibold">
                        关联研究随笔 / Research Note
                      </span>
                      <span className="text-xs font-semibold text-[#ece7df] hover:text-accent-sage transition-colors duration-200">
                        {n.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-12">
        <p className="text-text-muted">内容未找到</p>
      </div>
    );
  }

  // 3. Render Projects & Cases List View
  return (
    <div className="flex flex-col gap-10 py-6 text-left w-full">
      <div>
        <h1 className="text-3xl font-medium tracking-tight text-[#ece7df] font-serif">
          项目与深度案例 / Projects & Cases
        </h1>
        <p className="mt-3 text-base text-text-secondary max-w-2xl leading-relaxed">
          这里收录了我独立构建的产品项目、实验原型以及在限制条件下的具体技术取舍、实验验证与闭环复盘案例。
        </p>
      </div>

      {/* List Switcher Tabs */}
      <div className="flex border-b border-white/5 pb-2 gap-8 select-none">
        <button
          onClick={() => setActiveTab("library")}
          className={`pb-3 text-sm tracking-wider font-semibold uppercase relative transition-all duration-300 cursor-pointer focus:outline-none ${
            activeTab === "library" ? "text-accent-sage" : "text-text-muted hover:text-[#ece7df]"
          }`}
        >
          <span>精选项目 / Builds Library</span>
          {activeTab === "library" && (
            <motion.div
              layoutId="projectsActiveTab"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-sage"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("cases")}
          className={`pb-3 text-sm tracking-wider font-semibold uppercase relative transition-all duration-300 cursor-pointer focus:outline-none ${
            activeTab === "cases" ? "text-accent-sage" : "text-text-muted hover:text-[#ece7df]"
          }`}
        >
          <span>案例拆解 / Case Studies</span>
          {activeTab === "cases" && (
            <motion.div
              layoutId="projectsActiveTab"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-sage"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
      </div>

      {/* Switcher Display */}
      {activeTab === "library" ? (
        <div className="flex flex-col gap-10">
          {/* Active Builds */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.25em] text-accent-sage/80 pb-2 border-b border-white/5">
              持续迭代与构建项目 / Active Builds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {buildingProjects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => openApp("projects", proj.id)}
                  className="glass-card p-6 rounded-2xl border border-white/5 text-left flex flex-col justify-between hover:border-accent-sage/35 transition-all duration-300 focus:outline-none cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-semibold tracking-widest text-text-muted uppercase">
                        {proj.category}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {proj.status === "prototype" ? "原型" : "研究"}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-[#ece7df] mb-2">{proj.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{proj.oneLiner}</p>
                  </div>
                  <span className="text-xs text-accent-sage font-medium mt-6 inline-flex items-center gap-1">
                    探索详情 <span>→</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Shipped Projects */}
          {matureProjects.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.25em] text-accent-sage/80 pb-2 border-b border-white/5">
                成熟或已上线项目 / Shipped Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {matureProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => openApp("projects", proj.id)}
                    className="glass-card p-6 rounded-2xl border border-white/5 text-left flex flex-col justify-between hover:border-accent-sage/35 transition-all duration-300 focus:outline-none cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-semibold tracking-widest text-text-muted uppercase">
                          {proj.category}
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          已上线
                        </span>
                      </div>
                      <h4 className="text-xl font-semibold text-[#ece7df] mb-2">{proj.title}</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{proj.oneLiner}</p>
                    </div>
                    <span className="text-xs text-accent-sage font-medium mt-6 inline-flex items-center gap-1">
                      探索详情 <span>→</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Case Studies Tab view */
        <div className="flex flex-col gap-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {caseStudies.map((c) => (
              <button
                key={c.id}
                onClick={() => openApp("projects", c.id)}
                className="glass-card p-6 rounded-2xl border border-white/5 text-left flex flex-col justify-between hover:border-accent-sage/35 transition-all duration-300 focus:outline-none cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-semibold tracking-widest text-text-muted uppercase">
                      {c.category}
                    </span>
                    <span className="text-[10px] text-text-muted font-light">{c.updatedAt}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-[#ece7df] mb-2">{c.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {c.problem}
                  </p>
                </div>
                <span className="text-xs text-accent-sage font-medium mt-6 inline-flex items-center gap-1">
                  阅读拆解过程 <span>→</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
