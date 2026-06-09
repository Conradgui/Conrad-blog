"use client";

import React from "react";
import { labItems } from "@/content/lab";

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

  return (
    <div className="flex flex-col gap-10 py-6 text-left">
      <div>
        <h1 className="text-3xl font-medium tracking-tight text-[#ece7df]">
          系统实验室 / Lab Playground
        </h1>
        <p className="mt-3 text-base text-text-secondary max-w-2xl leading-relaxed">
          这里存放未成熟的探索、短周期的小原型、 Prompt 测试以及失败的技术探索。Lab 允许粗糙与半成品，旨在快速验证假设。
        </p>
      </div>

      {/* Grid of Lab Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labItems.map((item) => (
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
        ))}
      </div>
    </div>
  );
}
