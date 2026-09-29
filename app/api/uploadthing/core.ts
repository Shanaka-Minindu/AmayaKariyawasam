import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // 1. Single Main Image
  mainImageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async () => ({ userId: "admin" }))
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, key: file.key };
    }),

  // 2. Multiple Gallery Images
  galleryImagesUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 6 } })
    .middleware(async () => ({ userId: "admin" }))
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, key: file.key };
    }),

  // 3. Single Optional Video
  videoUploader: f({ video: { maxFileSize: "64MB", maxFileCount: 1 } })
    .middleware(async () => ({ userId: "admin" }))
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, key: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;