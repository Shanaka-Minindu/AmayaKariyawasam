"use server";

import { prisma } from "@/lib/prisma";
import { CreateProjectInput, ServerActionResponse } from "@/types";
import { revalidatePath } from "next/cache";

export async function createProjectAction(
  data: CreateProjectInput
): Promise<ServerActionResponse<string>> {
  try {
    const {
      title,
      slug,
      description,
      categoryId,
      mainImage,
      galleryImages = [],
      video,
    } = data;

    if (!title || !slug || !description || !categoryId || !mainImage) {
      return {
        success: false,
        error: "Please fill out all required fields and upload a main image.",
      };
    }

    // Single query create — Prisma wraps all nested creates in an atomic transaction automatically
    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        // Create Main Cover Image inline
        mainImage: {
          create: {
            url: mainImage.url,
            key: mainImage.key ?? null,
          },
        },
        // Connect category
        categories: {
          connect: [{ id: categoryId }],
        },
        // Create Gallery Images inline
        ...(galleryImages.length > 0
          ? {
              images: {
                create: galleryImages.map((img) => ({
                  url: img.url,
                  key: img.key ?? null,
                })),
              },
            }
          : {}),
        // Create Video inline
        ...(video?.url
          ? {
              video: {
                create: {
                  url: video.url,
                  key: video.key ?? null,
                },
              },
            }
          : {}),
      },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");

    return {
      success: true,
      message: "Project created successfully!",
      data: project.id,
    };
  } catch (error) {
    console.error("Error creating project:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while saving the project.",
    };
  }
}