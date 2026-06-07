"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/content/site.config";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";

export default function WorksSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="works" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <SectionTitle eyebrow="SELECTED PROJECTS" title="精选项目" />

      {/* Grid containing project cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} className="h-full">
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
