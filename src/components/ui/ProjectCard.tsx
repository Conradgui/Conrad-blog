import React from "react";
import { Project } from "@/content/site.config";
import { useWorkspaceStore } from "@/store/workspace.store";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { openApp } = useWorkspaceStore();
  
  const statusColors: Record<string, string> = {
    mature: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    shipped: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    building: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    prototype: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    research: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  const statusLabels: Record<string, string> = {
    mature: "已交付",
    shipped: "已上线",
    building: "持续构建",
    prototype: "原型验证",
    research: "深度研究",
    archived: "已归档",
  };

  return (
    <button
      onClick={() => openApp("projects", project.id)}
      className="w-full h-full glass-card flex flex-col justify-between p-8 rounded-[30px] text-left cursor-pointer hover:border-accent-sage/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent-sage/35"
    >
      <div>
        {/* Card Header (Category and Status) */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] tracking-[0.2em] font-medium text-accent-sage uppercase">
            {project.category}
          </span>
          {project.status && (
            <span
              className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${statusColors[project.status]}`}
            >
              {statusLabels[project.status]}
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-2xl font-medium text-text-primary mb-3 tracking-tight">
          {project.title}
        </h3>

        {/* Project One-liner */}
        <p className="text-sm text-text-secondary leading-relaxed mb-6 font-normal">
          {project.oneLiner}
        </p>

        {/* Personal Angle / Inside View (Crucial for personal portfolio context) */}
        <div className="border-t border-white/5 pt-5 mt-5">
          <div className="flex items-start gap-2">
            <span className="text-[10px] uppercase font-semibold text-accent-sage tracking-wider mt-0.5">
              个人视角 / Build Focus
            </span>
          </div>
          <p className="text-xs text-text-muted mt-2 leading-relaxed italic">
            {project.personalAngle}
          </p>
        </div>
      </div>

      {/* Card Footer (Tags) */}
      <div className="flex flex-wrap gap-2 mt-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-text-muted px-2.5 py-1 rounded-full border border-white/5 bg-white/[0.01]"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
