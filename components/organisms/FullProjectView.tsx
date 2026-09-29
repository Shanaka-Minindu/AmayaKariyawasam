"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Requirement 2: Exclude mainImage and use only gallery images
  const galleryImages = activeProject?.images || [];

  // Derive the active index directly during render if activeMediaUrl matches
  const activeIndexFromUrl = activeMediaUrl
    ? galleryImages.findIndex((img) => img.url === activeMediaUrl)
    : -1;

  // Selected index defaults to matching URL index if valid, otherwise fallback to local index state
  const displayIndex =
    activeIndexFromUrl !== -1 ? activeIndexFromUrl : currentImageIndex;

  // Navigation Callbacks
  const handlePrevImage = useCallback(() => {
    if (galleryImages.length === 0) return;
    const newIndex =
      displayIndex === 0 ? galleryImages.length - 1 : displayIndex - 1;
    setCurrentImageIndex(newIndex);
    // Sync store URL if active
    if (galleryImages[newIndex]) {
      openMediaModal(galleryImages[newIndex].url);
    }
  }, [galleryImages, displayIndex, openMediaModal]);

  const handleNextImage = useCallback(() => {
    if (galleryImages.length === 0) return;
    const newIndex =
      displayIndex === galleryImages.length - 1 ? 0 : displayIndex + 1;
    setCurrentImageIndex(newIndex);
    // Sync store URL if active
    if (galleryImages[newIndex]) {
      openMediaModal(galleryImages[newIndex].url);
    }
  }, [galleryImages, displayIndex, openMediaModal]);

  // Keyboard Navigation
  useEffect(() => {
    if (!activeMediaUrl) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") closeMediaModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMediaUrl, handlePrevImage, handleNextImage, closeMediaModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
        
        {/* Close Modal Button */}
        <button
          onClick={closeProject}
          className="absolute right-6 top-6 z-10 rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
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
          <div className="flex h-64 w-full items-center justify-center text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Loaded Content */}
        {!isLoading && activeProject && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            
            {/* Left Column: Media Gallery */}
            <div className="space-y-6 md:col-span-7">
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={img.id}
                      onClick={() => {
                        setCurrentImageIndex(idx);
                        openMediaModal(img.url);
                      }}
                      className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100/80 dark:border-neutral-800 dark:bg-neutral-800/80"
                    >
                      <Image
                        src={img.url}
                        alt={activeProject.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Video Player */}
              {activeProject.video?.url && (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-neutral-200 bg-black dark:border-neutral-800">
                  <video
                    src={activeProject.video.url}
                    controls
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Right Column: Title & Description */}
            <div className="flex flex-col justify-start md:col-span-5">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl">
                {activeProject.title}
              </h2>

              {/* Category Badges */}
              {activeProject.categories && activeProject.categories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeProject.categories.map((cat: fullView) => (
                    <span
                      key={cat.id}
                      className="rounded-full bg-neutral-200/60 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
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

      {/* Lightbox Full Screen Slider */}
      {activeMediaUrl && galleryImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-in fade-in duration-150">
          
          <button
            onClick={closeMediaModal}
            className="absolute right-6 top-6 z-20 rounded-full bg-neutral-900/80 p-2.5 text-white transition-colors hover:bg-neutral-800"
            aria-label="Close full view"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="absolute top-6 left-6 z-20 rounded-full bg-neutral-900/80 px-4 py-1.5 text-xs font-medium text-neutral-300">
            {displayIndex + 1} / {galleryImages.length}
          </div>

          {galleryImages.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-4 z-20 rounded-full bg-neutral-900/80 p-3 text-white transition-colors hover:bg-neutral-800 md:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <div className="relative h-[85vh] w-[90vw] max-w-6xl">
            <Image
              src={galleryImages[displayIndex]?.url ?? activeMediaUrl}
              alt={`Full view image ${displayIndex + 1}`}
              fill
              priority
              className="object-contain"
            />
          </div>

          {galleryImages.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-4 z-20 rounded-full bg-neutral-900/80 p-3 text-white transition-colors hover:bg-neutral-800 md:right-8"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FullProjectView;