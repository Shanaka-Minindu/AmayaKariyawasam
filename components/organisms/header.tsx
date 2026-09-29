"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="relative flex min-h-85 sm:min-h-120 md:min-h-150 lg:min-h-170 w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-amber-100 via-amber-200/80 to-amber-400 p-6 pb-6 sm:p-10 sm:pb-8 md:p-16 md:pb-12">
      
      {/* Continuous Marquee Background Animated Text: "Hey, there" */}
      <div className="absolute inset-x-0 top-1/4 z-0 flex whitespace-nowrap overflow-hidden pointer-events-none -translate-y-1/2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 18,
            ease: "linear",
          }}
          className="flex min-w-full shrink-0 items-center gap-12 sm:gap-24 pr-12 sm:pr-24"
        >
          {/* First Text Set */}
          <h1 className="font-serif italic text-amber-950/20 md:text-amber-950/25 select-none text-[120px] sm:text-[170px] md:text-[220px] lg:text-[250px] leading-none tracking-tight">
            Hey, there
          </h1>
          <h1 className="font-serif italic text-amber-950/20 md:text-amber-950/25 select-none text-[120px] sm:text-[170px] md:text-[220px] lg:text-[250px] leading-none tracking-tight">
            
          </h1>

          {/* Duplicate Set for Seamless Loop */}
          <h1 className="font-serif italic text-amber-950/20 md:text-amber-950/25 select-none text-[120px] sm:text-[170px] md:text-[220px] lg:text-[250px] leading-none tracking-tight">
            Hey, there
          </h1>
          <h1 className="font-serif italic text-amber-950/20 md:text-amber-950/25 select-none text-[120px] sm:text-[170px] md:text-[220px] lg:text-[250px] leading-none tracking-tight">
            
          </h1>
        </motion.div>
      </div>

      {/* Enlarged Portrait Image (Anchored directly to the bottom) */}
      <div className="absolute bottom-0 left-1/2 z-10 h-[75vh] sm:h-[82vh] md:h-[88vh] w-full max-w-4xl -translate-x-1/2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-full w-full"
        >
          <Image
            src="/amaya.png"
            alt="Amaya Kariyawasam"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 80vw"
            className="object-contain object-bottom drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Bottom Row: Name Heading & Right-Aligned Textile Designer Text */}
      <div className="z-30 mt-auto flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        
        {/* Left Side: Large Name Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="leading-none"
        >
          <span className="block text-2xl font-black uppercase tracking-wider text-amber-950 sm:text-4xl">
            I AM
          </span>
          <h2 className="text-5xl font-black uppercase tracking-tight text-amber-950 sm:text-7xl md:text-8xl lg:text-9xl">
            AMAYA<br />KARIYAWASAM
          </h2>
        </motion.div>

        {/* Right Side: "Textile Designer" typography replaces button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-start leading-tight text-left sm:items-end sm:text-right"
        >
          <span className="font-serif italic text-3xl font-normal text-amber-950 sm:text-4xl md:text-5xl lg:text-6xl">
            Textile
          </span>
          <span className="text-2xl font-black uppercase tracking-wider text-amber-950 sm:text-3xl md:text-4xl lg:text-5xl">
            Designer
          </span>
        </motion.div>
      </div>
    </header>
  );
}