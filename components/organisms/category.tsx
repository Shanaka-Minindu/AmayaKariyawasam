"use client";

import React from "react";
import { CollView } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectView from "./projectView";

interface CategoryProps {
  category: CollView;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const { title, projects } = category;

  return (
    <Card className="w-full rounded-3xl border border-neutral-200/80 bg-neutral-50/50 shadow-none dark:border-neutral-800 dark:bg-neutral-900/30">
      <CardHeader className="p-6 pb-2 md:p-8 md:pb-4">
        {/* Category Title matching sample design */}
        <CardTitle className="text-2xl font-bold tracking-tight text-center text-amber-950 dark:text-neutral-100 md:text-3xl">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-2 md:p-8 md:pt-4">
        {projects && projects.length > 0 ? (
          /* Responsive 4-column layout matching the design mockup */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectView
                key={project.id}
                id={project.id}
                title={project.title}
                proSlug={project.proSlug}
                mainImage={project.mainImage}
              />
            ))}
          </div>
        ) : (
          /* Empty fallback state */
          <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-neutral-200 text-xs text-neutral-400 dark:border-neutral-800">
            No projects available in this category.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Category;