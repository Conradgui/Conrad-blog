"use client";

import React, { useState } from "react";
import { contact } from "@/content/site.config";

export default function ContactApp() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-10 py-6 text-left w-full">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-medium tracking-tight text-[#ece7df]">
          联系方式 / Contact
        </h1>
        <p className="mt-3 text-base text-text-secondary leading-relaxed">
          如果您对 AI 产品策略、智能工作流、系统交互感兴趣，或者有合作机会，随时欢迎沟通。
        </p>
      </div>

      {/* Contact Sheet */}
      <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6 sm:p-8 flex flex-col gap-8 text-sm">
        {/* Availability Status */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5">
          <span className="text-xs text-text-muted tracking-wider font-semibold">
            当前状态 / Availability
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            Open to AI Product opportunities / 开放合作
          </span>
        </div>

        {/* Email Copy Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
              主要联系邮箱 / Primary Email
            </span>
            <span className="text-base text-[#ece7df] font-mono select-all">
              {contact.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyEmail}
              className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-semibold text-[#ece7df] hover:border-accent-sage hover:bg-accent-sage/10 transition-all duration-300 cursor-pointer"
            >
              {copied ? "已复制！" : "复制邮箱"}
            </button>
            <a
              href={`mailto:${contact.email}`}
              className="px-4 py-2 rounded-full border border-accent-sage/30 bg-accent-sage/5 text-xs font-semibold text-accent-sage hover:border-accent-sage hover:bg-accent-sage/15 transition-all duration-300 cursor-pointer"
            >
              发邮件
            </a>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
          <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
            其他平台 / Social Profiles
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contact.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-accent-sage/30 hover:bg-white/[0.03] transition-all duration-300 text-[#ece7df]"
              >
                <span className="text-xs font-semibold tracking-wider uppercase">
                  {social.label}
                </span>
                <span className="text-xs text-accent-sage">访问 →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
