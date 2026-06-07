"use client";

import React, { useEffect, useState } from "react";

export default function OrbitLayer() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setRotation(y * 0.06);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="absolute right-[-10vw] top-[8vh] w-[55vw] h-[55vw] rounded-full border border-[rgba(150,160,152,0.08)] pointer-events-none transition-transform duration-200 ease-out z-1 print:hidden"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Inner orbit 1 */}
      <div className="absolute inset-[14%] rounded-full border border-[rgba(150,160,152,0.05)]" />
      {/* Inner orbit 2 */}
      <div className="absolute inset-[28%] rounded-full border border-[rgba(150,160,152,0.05)]" />
      {/* Visual node points representing system nodes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-sage opacity-40" />
      <div className="absolute bottom-1/4 left-0 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent-sage opacity-25" />
      <div className="absolute top-1/3 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-accent-sage opacity-35" />
    </div>
  );
}
