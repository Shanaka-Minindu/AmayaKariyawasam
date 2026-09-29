"use client";

import Image from "next/image";
import React from "react";
import { ColProject } from "@/types";
import { useProjectModalStore } from "@/store/useProjectModalStore";

const ProjectView = ({ id, mainImage, proSlug, title }: ColProject) => {
  const openProject = useProjectModalStore((state) => state.openProject);

  return (
    <div
      onClick={() => openProject(proSlug)}
      className="group cursor-pointer rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-4 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-100/60 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200/60 dark:bg-neutral-800">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
            No image
          </div>
        )}
      </div>

      <h3 className="mt-4 font-medium text-neutral-800 dark:text-neutral-200 text-sm tracking-tight">
        {title}
      </h3>
    </div>
  );
};

export default ProjectView;