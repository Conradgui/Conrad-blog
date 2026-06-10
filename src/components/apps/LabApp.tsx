"use client";

import React from "react";
import { labItems, LabItem } from "@/content/lab";

export default function LabApp() {
  const statusColors = {
    building: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    paused: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const statusLabels = {
    building: "进行中",
    completed: "已闭环",
    paused: "已暂停",
    failed: "实验失败",
  };

  // Filter items by section
  const aiPmItems = labItems.filter((item) => item.section === "ai-pm");
  const codexPluginItems = labItems.filter((item) => item.section === "codex-plugin");

  const renderCard = (item: LabItem) => (
    <div
      key={item.id}
      className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] font-semibold tracking-widest text-text-muted uppercase">
            {item.updatedAt}
          </span>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColors[item.status]}`}
          >
            {statusLabels[item.status]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#ece7df] mb-4">
          {item.title}
        </h3>

        {/* Hypothesis & Details */}
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-accent-sage font-semibold">
              实验出发点 / Problem
            </span>
            <p className="text-text-secondary leading-relaxed">{item.problem}</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-accent-sage font-semibold">
              核心假设 / Hypothesis
            </span>
            <p className="text-text-secondary leading-relaxed">{item.hypothesis}</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-accent-sage font-semibold">
              验证结果 / Results
            </span>
            <p className="text-text-secondary leading-relaxed">{item.results}</p>
          </div>

          <div className="flex flex-col gap-1 border-t border-white/5 pt-4 mt-2">
            <span className="text-[10px] uppercase tracking-wider text-accent-sage font-semibold">
              验证结论 / Conclusion
            </span>
            <p className="text-text-muted italic leading-relaxed">{item.conclusion}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.techUsed.map((t) => (
            <span
              key={t}
              className="text-xs text-text-muted border border-white/5 px-2 py-0.5 rounded bg-white/[0.01]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Continue Build indicator & Repo Link */}
        <div className="flex items-center gap-4">
          {item.repositoryUrl && (
            <a
              href={item.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent-sage hover:text-accent-sage/80 hover:underline flex items-center gap-1 cursor-pointer font-medium transition-all duration-300"
            >
              <span>GitHub</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}
          <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
            {item.continueBuild ? (
              <span className="text-accent-sage">● 计划继续孵化</span>
            ) : (
              <span className="text-text-muted">○ 实验已关闭归档</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-12 py-6 text-left">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-medium tracking-tight text-[#ece7df]">
          产品实验室 / Product Lab Playground
        </h1>
        <p className="mt-4 text-base text-text-secondary max-w-3xl leading-relaxed border-l-2 border-accent-sage/30 pl-4 italic">
          这里收纳一些没有进入主项目区的产品实验和工具封装：有些是面向 AI PM 工作流的原型，有些是把已有项目进一步封装成 Codex Plugin。它们的重点不是“又做了几个项目”，而是展示我如何把一个产品判断变成可运行 MVP、可复用流程、验证证据和安全边界。
        </p>
      </div>

      {/* Part 1: AI PM / AI Product Experiments */}
      <div className="flex flex-col gap-6">
        <div className="border-b border-white/5 pb-2">
          <h2 className="text-xl font-semibold text-[#ece7df] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-sage" />
            AI PM / AI Product Experiments
          </h2>
          <p className="text-xs text-text-muted mt-1">
            面向 AI 产品经理工作流与人机协同原型的产品实验
          </p>
        </div>
        
        {aiPmItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiPmItems.map(renderCard)}
          </div>
        ) : (
          <p className="text-sm text-text-muted italic">暂无实验项目</p>
        )}
      </div>

      {/* Part 2: Codex Plugin Experiments */}
      <div className="flex flex-col gap-6">
        <div className="border-b border-white/5 pb-2">
          <h2 className="text-xl font-semibold text-[#ece7df] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-sage" />
            Codex Plugin Experiments
          </h2>
          <p className="text-xs text-text-muted mt-1">
            把成熟的产品方法论与智能体治理流程封装为 Codex 平台插件
          </p>
        </div>

        {codexPluginItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {codexPluginItems.map(renderCard)}
          </div>
        ) : (
          <p className="text-sm text-text-muted italic">暂无实验项目</p>
        )}
      </div>
    </div>
  );
}
