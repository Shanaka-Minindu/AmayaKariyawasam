"use server";

import { Createcategory, GetCategories, ServerActionResponse } from "@/types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper function to turn "Full Stack Dev" -> "full-stack-dev"
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function addCategory({
  title,
}: Createcategory): Promise<ServerActionResponse<string>> {
  try {
    const trimmedTitle = title?.trim();

    if (!trimmedTitle) {
      return {
        success: false,
        error: "Category title is required.",
        fieldErrors: {
          title: ["Title cannot be empty."],
        },
      };
    }

    const slug = generateSlug(trimmedTitle);

    // Check if category title or slug already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ title: trimmedTitle }, { slug }],
      },
    });

    if (existingCategory) {
      return {
        success: false,
        error: "A category with this title already exists.",
        fieldErrors: {
          title: ["Category title must be unique."],
        },
      };
    }

    const newCategory = await prisma.category.create({
      data: {
        title: trimmedTitle,
        slug,
      },
    });

    // Revalidate public and admin pages to show new category immediately
    revalidatePath("/");
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: "Category created successfully!",
      data: newCategory.id,
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      error: "An unexpected error occurred while creating the category.",
    };
  }
}



export async function getCategories(): Promise<ServerActionResponse<GetCategories[]>> {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
      orderBy: {
        title: "desc", // Keeps the categories alphabetically ordered
      },
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: "Failed to fetch categories",
    };
  }
}