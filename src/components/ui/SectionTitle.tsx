import React from "react";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`flex flex-col gap-3 text-left max-w-3xl mb-14 ${className}`}>
      <span className="text-[10px] font-semibold tracking-[0.22em] text-accent-sage uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#ece7df] leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-light mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
