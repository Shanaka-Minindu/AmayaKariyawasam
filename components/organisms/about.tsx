"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu, Recycle } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: Layers,
      title: "Warp & Weft Knit Innovation",
      description: "Engineering advanced performance knits directly from the yarn level up.",
    },
    {
      icon: Cpu,
      title: "3D Digital Tooling",
      description: "Utilizing CLO 3D to accelerate functional zonal body-mapping and sample pipelines.",
    },
    {
      icon: Sparkles,
      title: "Co-creation with Nike",
      description: "5+ years of experience driving seasonal collections at MAS Kreeda with cross-functional teams.",
    },
    {
      icon: Recycle,
      title: "Sustainable Chemistries",
      description: "Pairing modern visualization tools with sustainable textile chemistries for high-impact material narratives.",
    },
  ];

  return (
    <section id="about" className="relative w-full overflow-hidden bg-amber-100/60 px-6 py-20 sm:px-10 md:px-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col items-start justify-between gap-4 border-b border-amber-950/20 pb-8 md:flex-row md:items-end"
        >
          <div>
            <span className="font-serif italic text-2xl font-normal text-amber-900 sm:text-3xl">
              About Me
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tight text-amber-950 sm:text-6xl md:text-7xl">
              AMAYA KARIYAWASAM
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold uppercase tracking-wider text-amber-900/80 md:text-right">
            Senior Textile Designer | Specializing in Warp & Weft Knit Innovation, 3D Digital Tooling
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Quote & Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between space-y-8 lg:col-span-7"
          >
            <div className="relative border-l-4 border-amber-950 pl-6 sm:pl-8">
              <p className="font-serif italic text-2xl leading-relaxed text-amber-950 sm:text-3xl md:text-4xl">
                "I bridge the gap between Art, Science, and Athlete Experience."
              </p>
            </div>

            <div className="space-y-6 text-base leading-relaxed text-amber-950/80 sm:text-lg">
              <p>
                With <span className="font-bold text-amber-950">5+ years of industry experience</span> including direct co-creation for <span className="font-bold text-amber-950">Nike seasonal collections</span> at MAS Kreeda, I bring proven expertise collaborating with cross-functional teams, mill partners, and garment technicians to drive concept-to-sample pipelines.
              </p>

              <p>
                I engineer advanced performance knits from the yarn level up. My focus pairs 3D visualization tools like <span className="font-bold text-amber-950">CLO 3D</span> with sustainable textile chemistries to deliver functional zonal body-mapping and high-impact material narratives.
              </p>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 shadow-sm">
                <span className="block text-3xl font-black text-amber-950 sm:text-4xl">5+</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900/70">Years Experience</span>
              </div>
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 shadow-sm">
                <span className="block text-3xl font-black text-amber-950 sm:text-4xl">Nike</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900/70">Co-Creation</span>
              </div>
              <div className="col-span-2 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 shadow-sm sm:col-span-1">
                <span className="block text-3xl font-black text-amber-950 sm:text-4xl">3D</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900/70">CLO Digital Tooling</span>
              </div>
            </div>
          </motion.div>

          {/* Cards / Expertise Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group rounded-2xl border border-amber-200/60 bg-white/70 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                >
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-amber-950 p-3 text-amber-50 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-amber-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-amber-900/80">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}