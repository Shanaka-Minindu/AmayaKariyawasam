/* eslint-disable react-hooks/static-components */

"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UploadDropzone } from "@/lib/uploadthing";
import { GetCategories } from "@/types";
import { Trash2, Loader2, UploadCloud, Film } from "lucide-react";
import { getCategories } from "@/lib/actions/admin/admin.CategoryActions";
import { createProjectAction } from "@/lib/actions/admin/admin.CreateProject";
import dynamic from "next/dynamic";


interface UploadedFile {
  url: string;
  key?: string;
}

const CreateProject = () => {
  const [categories, setCategories] = useState<GetCategories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  // Uploaded Files State
  const [mainImage, setMainImage] = useState<UploadedFile | null>(null);
  const [galleryImages, setGalleryImages] = useState<UploadedFile[]>([]);
  const [video, setVideo] = useState<UploadedFile | null>(null);

  // Upload Progress Tracking (0 - 100)
  const [mainProgress, setMainProgress] = useState<number | null>(null);
  const [galleryProgress, setGalleryProgress] = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState<number | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  
  // Load categories on mount
  useEffect(() => {
    async function loadCategories() {
      const res = await getCategories();
      if (res.success && res.data) {
        setCategories(res.data);
      }
    }
    loadCategories();
  }, []);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
    );
  }
  const UploadDropzone = dynamic(
    () => import("@/lib/uploadthing").then((mod) => mod.UploadDropzone),
    { ssr: false }
  );
  function createProject() {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!selectedCategory || !title || !slug || !description || !mainImage) {
      setErrorMsg("Please complete all required fields and upload a main cover image.");
      return;
    }

    startTransition(async () => {
      const res = await createProjectAction({
        title,
        slug,
        description,
        categoryId: selectedCategory,
        mainImage,
        galleryImages,
        video,
      });

      if (res.success) {
        setSuccessMsg("Project created successfully!");
        setTitle("");
        setSlug("");
        setDescription("");
        setSelectedCategory("");
        setMainImage(null);
        setGalleryImages([]);
        setVideo(null);
      } else {
        setErrorMsg(res.error || "Failed to create project.");
      }
    });
  }

  const isUploading =
    mainProgress !== null || galleryProgress !== null || videoProgress !== null;

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-3xl border border-gray-200 bg-gray-50/50 p-8 shadow-none">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-gray-900">
          Add Project
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex flex-col gap-6">
        {/* Category Dropdown */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">Category:</Label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value || "")}
          >
            <SelectTrigger className="w-full bg-white h-11 border-gray-300 rounded-lg">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Project Name and Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">Project Name</Label>
            <Input
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Modern Villa Interior"
              className="bg-white border-gray-300 h-11 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">Slug</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="modern-villa-interior"
              className="bg-white border-gray-300 h-11 rounded-lg"
            />
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">
            Project Description
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Write a brief overview..."
            className="bg-white border-gray-300 rounded-xl resize-none"
          />
        </div>

        {/* 1. Main Cover Image Upload & Preview */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">Main image:</Label>
          <div className="flex items-center gap-4">
            {mainImage ? (
              <div className="relative w-40 h-28 rounded-xl overflow-hidden border border-gray-200 group bg-white">
                <img
                  src={mainImage.url}
                  alt="Main Cover Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setMainImage(null)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="w-48" suppressHydrationWarning>
                <UploadDropzone
                  endpoint="mainImageUploader"
                  onUploadProgress={(p) => setMainProgress(p)}
                  onClientUploadComplete={(res) => {
                    setMainProgress(null);
                    if (res?.[0]) {
                      setMainImage({ url: res[0].url, key: res[0].key });
                    }
                  }}
                  onUploadError={(err) => {
                    setMainProgress(null);
                    setErrorMsg(`Main image upload failed: ${err.message}`);
                  }}
                  content={{
                    label: mainProgress !== null ? `Uploading: ${mainProgress}%` : "Upload Cover Image",
                  }}
                  appearance={{
                    container: "border border-dashed border-gray-300 bg-white rounded-2xl p-4 cursor-pointer hover:bg-gray-100/50 transition flex flex-col items-center justify-center min-h-[110px]",
                    button: "bg-black text-white text-xs px-3 py-1.5 rounded-md mt-2",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 2. Gallery Images Upload & Preview */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">Images</Label>
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-48" suppressHydrationWarning>
              <UploadDropzone
                endpoint="galleryImagesUploader"
                onUploadProgress={(p) => setGalleryProgress(p)}
                onClientUploadComplete={(res) => {
                  setGalleryProgress(null);
                  if (res) {
                    const files = res.map((f) => ({ url: f.url, key: f.key }));
                    setGalleryImages((prev) => [...prev, ...files]);
                  }
                }}
                onUploadError={(err) => {
                  setGalleryProgress(null);
                  setErrorMsg(`Gallery upload failed: ${err.message}`);
                }}
                content={{
                  label: galleryProgress !== null ? `Uploading: ${galleryProgress}%` : "Upload Gallery Images",
                }}
                appearance={{
                  container: "border border-dashed border-gray-300 bg-white rounded-2xl p-4 cursor-pointer hover:bg-gray-100/50 transition flex flex-col items-center justify-center min-h-[110px]",
                  button: "bg-black text-white text-xs px-3 py-1.5 rounded-md mt-2",
                }}
              />
            </div>

            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative w-28 h-28 rounded-xl overflow-hidden border border-gray-200 group bg-white"
              >
                <img
                  src={img.url}
                  alt={`Gallery item ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setGalleryImages((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Optional Video Upload & Preview */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">Video (Optional)</Label>
          <div className="flex items-center gap-4">
            {video ? (
              <div className="relative w-52 h-32 rounded-xl overflow-hidden border border-gray-200 bg-black flex items-center justify-center group">
                <video src={video.url} controls className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setVideo(null)}
                  className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="w-48" suppressHydrationWarning>
                <UploadDropzone
                  endpoint="videoUploader"
                  onUploadProgress={(p) => setVideoProgress(p)}
                  onClientUploadComplete={(res) => {
                    setVideoProgress(null);
                    if (res?.[0]) {
                      setVideo({ url: res[0].url, key: res[0].key });
                    }
                  }}
                  onUploadError={(err) => {
                    setVideoProgress(null);
                    setErrorMsg(`Video upload failed: ${err.message}`);
                  }}
                  content={{
                    label: videoProgress !== null ? `Uploading: ${videoProgress}%` : "Upload Video",
                  }}
                  appearance={{
                    container: "border border-dashed border-gray-300 bg-white rounded-2xl p-4 cursor-pointer hover:bg-gray-100/50 transition flex flex-col items-center justify-center min-h-[110px]",
                    button: "bg-black text-white text-xs px-3 py-1.5 rounded-md mt-2",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg">
            {successMsg}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="button"
            onClick={createProject}
            disabled={isPending || isUploading}
            className="bg-black hover:bg-black/90 text-white px-8 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {(isPending || isUploading) && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {isUploading
              ? "Uploading media..."
              : isPending
              ? "Saving project..."
              : "Add project"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateProject;