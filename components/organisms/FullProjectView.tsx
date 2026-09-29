"use client";

import React from "react";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { useProjectModalStore } from "@/store/useProjectModalStore";
import { fullView } from "@/types";

const FullProjectView = () => {
  const {
    isOpen,
    isLoading,
    activeProject,
    activeMediaUrl,
    error,
    closeProject,
    openMediaModal,
    closeMediaModal,
  } = useProjectModalStore();

  if (!isOpen) return null;

  // Combine main image and gallery images into a unified gallery list
  const allImages = [
    ...(activeProject?.mainImage ? [activeProject.mainImage] : []),
    ...(activeProject?.images || []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
        
        {/* Close Modal Button */}
        <button
          onClick={closeProject}
          className="absolute right-6 top-6 rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          aria-label="Close project modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="flex h-64 w-full flex-col items-center justify-center gap-3 text-neutral-400">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-600 dark:text-neutral-300" />
            <p className="text-sm">Loading project...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex h-64 w-full items-center justify-center text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Loaded Content */}
        {!isLoading && activeProject && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            
            {/* Left Column: Media Gallery (Grid layout matching your diagram) */}
            <div className="space-y-4 md:col-span-7">
              {/* Images Grid */}
              <div className="grid grid-cols-2 gap-3">
                {allImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => openMediaModal(img.url)}
                    className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800"
                  >
                    <Image
                      src={img.url}
                      alt={activeProject.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 30vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Video Player (Added directly into the media gallery flow) */}
              {activeProject.video?.url && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 bg-black dark:border-neutral-800">
                  <video
                    src={activeProject.video.url}
                    controls
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Right Column: Title & Description */}
            <div className="flex flex-col justify-start md:col-span-5">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {activeProject.title}
              </h2>

              {/* Category Badges */}
              {activeProject.categories && activeProject.categories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {activeProject.categories.map((cat:fullView) => (
                    <span
                      key={cat.id}
                      className="rounded-full bg-neutral-200/60 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Project Description */}
              <p className="mt-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {activeProject.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Full Screen Image View (Requirement 4) */}
      {activeMediaUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-150">
          <button
            onClick={closeMediaModal}
            className="absolute right-6 top-6 rounded-full bg-neutral-800/80 p-2.5 text-white transition-colors hover:bg-neutral-700"
            aria-label="Close full view"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative h-[85vh] w-[90vw] max-w-6xl">
            <Image
              src={activeMediaUrl}
              alt="Full view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FullProjectView;