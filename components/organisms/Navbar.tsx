"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Expertise", href: "#expertise" },
  { label: "About Me", href: "#about-me" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("expertise");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of navItems) {
        const targetId = item.href.replace("#", "");
        const element = document.getElementById(targetId);

        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(targetId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(targetId);
    }
  };

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      {/* Floating White Pill Navbar Container */}
      <nav className="flex items-center gap-1 rounded-full border border-neutral-200/80 bg-white/80 p-2 shadow-lg shadow-neutral-900/5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80 sm:gap-2">
        {navItems.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className={`relative rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 sm:px-6 sm:text-sm ${
                isActive
                  ? "bg-neutral-900 text-white shadow-md shadow-neutral-900/20 dark:bg-white dark:text-neutral-950"
                  : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white"
              }`}
            >
              {item.label}

              {/* Inner capsule glow matching the sample design pill */}
              {isActive && (
                <span className="absolute inset-0 rounded-full border border-white/20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}