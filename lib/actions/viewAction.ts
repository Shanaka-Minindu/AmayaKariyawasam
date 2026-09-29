"use server";

import { prisma } from "@/lib/prisma";
import { CollView, ServerActionResponse } from "@/types";

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
    const formattedCategories: CollView[] = categories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug,
      projects: cat.projects.map((proj) => ({
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