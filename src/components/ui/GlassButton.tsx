import React from "react";
import Link from "next/link";

type GlassButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export default function GlassButton({
  children,
  href,
  onClick,
  variant = "secondary",
}: GlassButtonProps) {
  const baseClass = `
    relative inline-flex items-center justify-center overflow-hidden px-6 py-3.5 rounded-full text-xs font-medium tracking-widest text-[#ece7df] uppercase
    border backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
    hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
    after:content-[''] after:absolute after:left-[-120%] after:top-0 after:w-[120%] after:h-full
    after:bg-gradient-to-r after:from-transparent after:via-white/8 after:to-transparent
    after:transition-all after:duration-[800ms] hover:after:left-[120%]
  `;

  const variantClass =
    variant === "primary"
      ? "border-[rgba(142,160,147,0.3)] bg-[rgba(142,160,147,0.08)] hover:border-accent-sage hover:bg-[rgba(142,160,147,0.12)]"
      : "border-white/6 bg-white/3 hover:border-accent-sage/45";

  const combinedClass = `${baseClass} ${variantClass}`.trim();

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${combinedClass} cursor-pointer`}>
        {children}
      </button>
    );
  }

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          className={combinedClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return <span className={combinedClass}>{children}</span>;
}
