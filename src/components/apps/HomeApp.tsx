"use client";

import React from "react";
import { useWorkspaceStore } from "@/store/workspace.store";
import AppIcon from "@/components/ui/AppIcon";

export default function HomeApp() {
  const { openApp } = useWorkspaceStore();

  return (
    <div className="flex flex-col gap-10 py-6 text-left">
      {/* Welcome Message */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#ece7df]">
          工作台主页 / Workspace Home
        </h1>
        <p className="mt-3 text-base text-text-secondary font-light max-w-2xl leading-relaxed">
          欢迎进入 Clancy 的数字工作室。这里不是展示静态简历的货架，而是一个正在运行的个人系统。您可以通过快捷操作或下方 Dock 探索各个模块。
        </p>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Status & Exploring */}
        <div className="flex flex-col gap-6">
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-sage animate-ping" />
              当前构建 / Currently Building
            </h3>
            <p className="text-base font-semibold text-[#ece7df]">Personal Portfolio OS</p>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              重构个人工作台，实现内容与视觉系统的解耦，建立完全受控的单页容器应用状态。
            </p>
          </div>

          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-sage" />
              前沿探索 / Currently Exploring
            </h3>
            <p className="text-base font-semibold text-[#ece7df]">
              Agent Runtime / Evaluation & Memory Governance
            </p>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              探索大语言模型在长期对话和复杂业务工作流中的状态恢复、短期记忆写入与评估模型设计。
            </p>
          </div>
        </div>

        {/* Right Column: Featured & Quick Actions */}
        <div className="flex flex-col gap-6">
          {/* Featured Project */}
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-4">
                精选作品 / Featured Build
              </h3>
              <p className="text-base font-semibold text-[#ece7df]">Zero-to-One Product Discovery</p>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                一个用于 AI 辅助产品探索的 workflow 项目。采用 Stage Gate 和 Controller / Producer / Auditor 架构以防止大模型信息缺失时过早产出 PRD 路线图。
              </p>
            </div>
            <button
              onClick={() => openApp("projects", "zero-to-one")}
              className="mt-6 self-start text-xs font-semibold tracking-wider text-accent-sage hover:text-[#ece7df] transition-colors duration-300 flex items-center gap-1 cursor-pointer"
            >
              分析此项目 <span>→</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-accent-sage mb-4">
              快速操作 / Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openApp("projects")}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-medium text-text-secondary hover:border-accent-sage hover:text-[#ece7df] transition-all duration-300 cursor-pointer"
              >
                <AppIcon name="projects" className="w-3.5 h-3.5" />
                <span>精选项目列表</span>
              </button>
              <button
                onClick={() => openApp("thinking")}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-medium text-text-secondary hover:border-accent-sage hover:text-[#ece7df] transition-all duration-300 cursor-pointer"
              >
                <AppIcon name="thinking" className="w-3.5 h-3.5" />
                <span>阅读系统方法论</span>
              </button>
              <button
                onClick={() => openApp("thinking", "notes")}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-medium text-text-secondary hover:border-accent-sage hover:text-[#ece7df] transition-all duration-300 cursor-pointer"
              >
                <AppIcon name="thinking" className="w-3.5 h-3.5" />
                <span>查看研究笔记</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
