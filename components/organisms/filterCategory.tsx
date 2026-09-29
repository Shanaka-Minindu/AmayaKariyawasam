"use client";

import React, { useState, useEffect, useTransition } from "react";
import { CollView } from "@/types";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getCategories } from "@/lib/actions/admin/admin.CategoryActions";
import { getCategorysWithProject } from "@/lib/actions/viewAction";
import Category from "./category";

interface CategoryFilterItem {
  id: string;
  title: string;
  slug: string;
}

interface FilterCategoryProps {
  initialCategories?: CategoryFilterItem[];
  initialCategoryData?: CollView[];
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  initialCategories = [],
  initialCategoryData = [],
}) => {
  const [categories, setCategories] =
    useState<CategoryFilterItem[]>(initialCategories);
  const [categoryData, setCategoryData] =
    useState<CollView[]>(initialCategoryData);
  const [selectedSlug, setSelectedSlug] = useState<string>("ALL");
  const [isPending, startTransition] = useTransition();
  const [isLoadingInitial, setIsLoadingInitial] = useState(
    !initialCategories.length || !initialCategoryData.length
  );

  // Initial fetch for categories list and default "ALL" projects data if not passed via props
  useEffect(() => {
    async function loadInitialData() {
      if (initialCategories.length && initialCategoryData.length) return;

      setIsLoadingInitial(true);

      const [catListRes, catDataRes] = await Promise.all([
        getCategories(),
        getCategorysWithProject("ALL"),
      ]);

      if (catListRes.success && catListRes.data) {
        setCategories(catListRes.data);
      }

      if (catDataRes.success && catDataRes.data) {
        setCategoryData(catDataRes.data);
      }

      setIsLoadingInitial(false);
    }

    loadInitialData();
  }, [initialCategories, initialCategoryData]);

  // Handle category filter tab click
  const handleFilterChange = (slug: string) => {
    setSelectedSlug(slug);

    startTransition(async () => {
      const response = await getCategorysWithProject(slug);
      if (response.success && response.data) {
        setCategoryData(response.data);
      }
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
          Categories
        </h1>
      </div>

      {/* Filter Buttons Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <span className="mr-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Filter :
        </span>

        {/* 'ALL' Filter Button */}
        <Button
          variant={selectedSlug === "ALL" ? "default" : "outline"}
          onClick={() => handleFilterChange("ALL")}
          disabled={isPending}
          className="rounded-xl px-5 py-2 transition-all"
        >
          All
        </Button>

        {/* Dynamic Category Buttons */}
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedSlug === cat.slug ? "default" : "outline"}
            onClick={() => handleFilterChange(cat.slug)}
            disabled={isPending}
            className="rounded-xl px-5 py-2 transition-all"
          >
            {cat.title}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {(isLoadingInitial || isPending) && (
        <div className="flex h-64 w-full items-center justify-center gap-2 text-neutral-400">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-sm">Loading category projects...</span>
        </div>
      )}

      {/* Category List Render */}
      {!isLoadingInitial && !isPending && (
        <div className="space-y-6">
          {categoryData.length > 0 ? (
            categoryData.map((category) => (
              <Category key={category.id} category={category} />
            ))
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-3xl border border-dashed border-neutral-200 text-sm text-neutral-400 dark:border-neutral-800">
              No categories or projects found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterCategory;