"use server";

import { prisma } from "@/lib/prisma";
import { CollView, ServerActionResponse } from "@/types";
import type { Prisma } from "@prisma/client";

export async function getCategorysWithProject(
  slug?: string | null
): Promise<ServerActionResponse<CollView[]>> {
  try {
    // 1. Build where clause based on whether slug is provided or is "ALL"
    const whereClause =
      !slug || slug.trim() === "" || slug.toUpperCase() === "ALL"
        ? {}
        : { slug };

    // 2. Query categories with their nested projects and main image
    const categories = await prisma.category.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        slug: true,
        projects: {
          select: {
            id: true,
            title: true,
            slug: true,
            mainImage: {
              select: {
                url: true,
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    // 3. Transform database output to match the expected CollView interface
    // Explicitly type `cat` and `proj` parameters to resolve TS7006
    const formattedCategories: CollView[] = categories.map((cat: {
      id: string;
      title: string;
      slug: string;
      projects: Array<{
        id: string;
        title: string;
        slug: string;
        mainImage: { url: string } | null;
      }>;
    }) => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug,
      projects: cat.projects.map((proj: {
        id: string;
        title: string;
        slug: string;
        mainImage: { url: string } | null;
      }) => ({
        id: proj.id,
        title: proj.title,
        proSlug: proj.slug,
        mainImage: proj.mainImage?.url ?? "",
      })),
    }));

    return {
      success: true,
      data: formattedCategories,
    };
  } catch (error) {
    console.error("Error fetching categories with projects:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch categories with projects.",
    };
  }
}

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    mainImage: true;
    images: true;
    video: true;
    categories: true;
  };
}>;

export async function getProjectWithRelations(
  slug: string
): Promise<ServerActionResponse<ProjectWithRelations>> {
  try {
    if (!slug) {
      return {
        success: false,
        error: "Project slug is required.",
      };
    }

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        mainImage: true,
        images: true,
        video: true,
        categories: true,
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found.",
      };
    }

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error("Error fetching project with relations:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while fetching the project.",
    };
  }
}