import { siteConfigs } from "@/content/site.config";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-12 px-6 sm:px-12 border-t border-white/5 bg-bg-primary/20 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4 z-10 relative">
      <div className="text-[10px] sm:text-xs text-text-muted tracking-wider">
        © {currentYear} {siteConfigs.ai.name} Space. All rights reserved.
      </div>
      <div className="text-[10px] sm:text-xs text-text-muted tracking-widest uppercase">
        AI Product & Systems Portfolio
      </div>
    </footer>
  );
}
