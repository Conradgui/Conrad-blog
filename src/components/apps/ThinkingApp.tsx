"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useWorkspaceStore } from "@/store/workspace.store";
import { thinkingItems } from "@/content/thinking";
import { noteItems } from "@/content/notes";
import { projects } from "@/content/site.config";
import { labItems } from "@/content/lab";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function ThinkingApp() {
  const { activeItemId, openApp } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState<"methodology" | "notes">(
    activeItemId === "notes" || noteItems.some((n) => n.id === activeItemId) ? "notes" : "methodology"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const resolvedActiveTab =
    activeItemId === "notes" || noteItems.some((n) => n.id === activeItemId) ? "notes" : activeTab;

  // Filter notes based on query
  const filteredNotes = noteItems.filter((note) => {
    const term = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(term) ||
      note.summary.toLowerCase().includes(term) ||
      note.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  });

  // If a specific item is selected, render details view
  const isDetailView = activeItemId && activeItemId !== "notes" && activeItemId !== "methodology";

  if (isDetailView) {
    const thinkingItem = thinkingItems.find((t) => t.id === activeItemId);
    const noteItem = noteItems.find((n) => n.id === activeItemId);

    // 1. Render Methodology Framework details
    if (thinkingItem) {
      const relatedProjects = projects.filter((p) => thinkingItem.relatedProjectIds?.includes(p.id));
      const relatedLabs = labItems.filter((l) => thinkingItem.relatedProjectIds?.includes(l.id));
      const hasRelated = relatedProjects.length > 0 || relatedLabs.length > 0;
      return (
        <div className="text-left py-4 flex flex-col gap-6">
          {/* Header */}
          <div>
            <span className="text-[10px] tracking-[0.25em] font-semibold text-accent-sage uppercase block mb-2">
              METHODOLOGY / 系统方法模型
            </span>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#ece7df] font-serif mt-2">
              {thinkingItem.title}
            </h1>
            <p className="text-base sm:text-lg text-text-secondary mt-4 leading-relaxed max-w-3xl">
              {thinkingItem.problem}
            </p>
          </div>

          {/* Related Projects */}
          {hasRelated && (
            <div className="flex flex-wrap items-center gap-3 border-y border-white/5 py-4 my-2">
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                应用项目 / Projects
              </span>
              <div className="flex flex-wrap gap-2">
                {relatedProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => openApp("projects", p.id)}
                    className="text-xs text-accent-sage hover:text-[#ece7df] border border-accent-sage/20 bg-accent-sage/5 px-2.5 py-1 rounded-full transition-colors duration-300 cursor-pointer focus:outline-none"
                  >
                    {p.title}
                  </button>
                ))}
                {relatedLabs.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => openApp("lab")}
                    className="text-xs text-accent-sage hover:text-[#ece7df] border border-accent-sage/20 bg-accent-sage/5 px-2.5 py-1 rounded-full transition-colors duration-300 cursor-pointer focus:outline-none"
                  >
                    {l.title.split("｜")[0]} (实验室)
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Markdown Content Body */}
          <div className="prose prose-invert w-full text-base text-text-secondary leading-relaxed mt-6 flex flex-col gap-5">
            <ReactMarkdown
              components={{
                h3: ({ node: _node, ...props }) => (
                  <h3 className="text-xl font-semibold text-[#ece7df] mt-8 mb-4 border-l-2 border-accent-sage/60 pl-4" {...props} />
                ),
                p: ({ node: _node, ...props }) => <p className="mb-4" {...props} />,
                li: ({ node: _node, ...props }) => <li className="list-disc list-inside mb-2.5 pl-2" {...props} />,
                blockquote: ({ node: _node, ...props }) => (
                  <blockquote className="border-l-2 border-white/15 pl-4 py-2 my-4 italic text-text-muted bg-white/[0.01] rounded-r-md" {...props} />
                ),
              }}
            >
              {thinkingItem.contentBody}
            </ReactMarkdown>
          </div>
        </div>
      );
    }

    // 2. Render Note/Insight details
    if (noteItem) {
      const relatedProjects = projects.filter((p) => noteItem.relatedProjectIds?.includes(p.id));
      const relatedLabs = labItems.filter((l) => noteItem.relatedProjectIds?.includes(l.id));
      const hasRelated = relatedProjects.length > 0 || relatedLabs.length > 0;
      return (
        <div className="text-left py-4 flex flex-col gap-6">
          {/* Detail Header */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-accent-sage uppercase">
                RESEARCH / {noteItem.type}
              </span>
              <span className="text-text-muted text-[10px]">•</span>
              <span className="text-text-muted text-[10px]">{noteItem.createdAt}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#ece7df] font-serif mt-2">
              {noteItem.title}
            </h1>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 py-1">
            {noteItem.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-text-muted border border-white/5 bg-white/[0.01] px-2.5 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Projects */}
          {hasRelated && (
            <div className="flex flex-wrap items-center gap-3 border-y border-white/5 py-4 my-2">
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                应用项目 / Projects
              </span>
              <div className="flex flex-wrap gap-2">
                {relatedProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => openApp("projects", p.id)}
                    className="text-xs text-accent-sage hover:text-[#ece7df] border border-accent-sage/20 bg-accent-sage/5 px-2.5 py-1 rounded-full transition-colors duration-300 cursor-pointer focus:outline-none"
                  >
                    {p.title}
                  </button>
                ))}
                {relatedLabs.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => openApp("lab")}
                    className="text-xs text-accent-sage hover:text-[#ece7df] border border-accent-sage/20 bg-accent-sage/5 px-2.5 py-1 rounded-full transition-colors duration-300 cursor-pointer focus:outline-none"
                  >
                    {l.title.split("｜")[0]} (实验室)
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Markdown Content Body */}
          <div className="prose prose-invert w-full text-base text-text-secondary leading-relaxed mt-6 flex flex-col gap-5">
            <ReactMarkdown
              components={{
                h3: ({ node: _node, ...props }) => (
                  <h3 className="text-xl font-semibold text-[#ece7df] mt-8 mb-4 border-l-2 border-accent-sage/60 pl-4" {...props} />
                ),
                p: ({ node: _node, ...props }) => <p className="mb-4" {...props} />,
                li: ({ node: _node, ...props }) => <li className="list-disc list-inside mb-2.5 pl-2" {...props} />,
                blockquote: ({ node: _node, ...props }) => (
                  <blockquote className="border-l-2 border-white/15 pl-4 py-2 my-4 italic text-text-muted bg-white/[0.01] rounded-r-md" {...props} />
                ),
                code: ({ node: _node, ...props }) => (
                  <code className="bg-white/5 px-1.5 py-0.5 rounded text-accent-sage font-mono text-xs border border-white/10" {...props} />
                ),
                pre: ({ node: _node, ...props }) => (
                  <pre className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 overflow-x-auto font-mono text-sm text-[#ece7df] leading-relaxed my-4" {...props} />
                ),
              }}
            >
              {noteItem.contentBody}
            </ReactMarkdown>
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

  // 3. Render List View
  return (
    <div className="flex flex-col gap-10 py-6 text-left w-full">
      <div>
        <h1 className="text-3xl font-medium tracking-tight text-[#ece7df] font-serif">
          思维模型与研究 / Insights & Thinking
        </h1>
        <p className="mt-3 text-base text-text-secondary max-w-2xl leading-relaxed">
          关于大模型控制流设计、人机协同（HITL）以及多角色智能体交互的工作方法与研究随笔沉淀。
        </p>
      </div>

      {/* List Switcher Tabs */}
      <div className="flex border-b border-white/5 pb-2 gap-8 select-none">
        <button
          onClick={() => setActiveTab("methodology")}
          className={`pb-3 text-sm tracking-wider font-semibold uppercase relative transition-all duration-300 cursor-pointer focus:outline-none ${
            resolvedActiveTab === "methodology" ? "text-accent-sage" : "text-text-muted hover:text-[#ece7df]"
          }`}
        >
          <span>核心方法模型 / System Thinking</span>
          {resolvedActiveTab === "methodology" && (
            <motion.div
              layoutId="thinkingActiveTab"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-sage"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`pb-3 text-sm tracking-wider font-semibold uppercase relative transition-all duration-300 cursor-pointer focus:outline-none ${
            resolvedActiveTab === "notes" ? "text-accent-sage" : "text-text-muted hover:text-[#ece7df]"
          }`}
        >
          <span>研究随笔 / Research Notes</span>
          {resolvedActiveTab === "notes" && (
            <motion.div
              layoutId="thinkingActiveTab"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-sage"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
      </div>

      {/* Switcher Display */}
      {resolvedActiveTab === "methodology" ? (
        /* Systems Thinking methodology grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {thinkingItems.map((item) => (
            <button
              key={item.id}
              onClick={() => openApp("thinking", item.id)}
              className="glass-card p-6 rounded-2xl border border-white/5 text-left flex flex-col justify-between hover:border-accent-sage/35 transition-all duration-300 focus:outline-none cursor-pointer animate-in fade-in duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-semibold tracking-widest text-accent-sage uppercase">
                    {item.type}
                  </span>
                  <span className="text-[10px] text-text-muted font-light">{item.updatedAt}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#ece7df] mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>
              <span className="text-xs text-accent-sage font-medium mt-8 inline-flex items-center gap-1">
                阅读详细框架 <span>→</span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        /* Research Notes with search bar */
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
          {/* Search bar row */}
          <div className="flex justify-end mb-2">
            <div className="w-full md:w-64 border border-white/5 bg-white/[0.01] rounded-full px-4 py-2 flex items-center gap-2.5">
              <svg
                className="w-4 h-4 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="搜索随笔或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-[#ece7df] placeholder-text-muted w-full"
              />
            </div>
          </div>

          {/* Notes list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => openApp("thinking", note.id)}
                  className="glass-card p-6 rounded-2xl border border-white/5 text-left flex flex-col justify-between hover:border-accent-sage/35 transition-all duration-300 focus:outline-none cursor-pointer"
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[9px] font-semibold tracking-widest text-accent-sage uppercase">
                        {note.type}
                      </span>
                      <span className="text-text-muted text-[9px]">•</span>
                      <span className="text-[10px] text-text-muted font-light">{note.createdAt}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#ece7df] mb-2">{note.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {note.summary}
                    </p>
                  </div>

                  {/* Tags footer */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-text-muted border border-white/5 bg-white/[0.01] px-2.5 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))
            ) : (
              <div className="col-span-full px-6 py-16 text-center text-xs text-text-muted border border-white/5 rounded-2xl bg-white/[0.01]">
                没有匹配的随笔条目
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
