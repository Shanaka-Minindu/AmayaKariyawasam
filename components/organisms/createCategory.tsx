"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addCategory } from "@/lib/actions/admin/admin.CategoryActions";


const CreateCategory = () => {
  const [title, setTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function createCategory() {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setErrorMsg("Please enter a category name.");
      return;
    }

    startTransition(async () => {
      const response = await addCategory({ title });

      if (response.success) {
        setSuccessMsg(response.message || "Category created!");
        setTitle("");
      } else {
        setErrorMsg(
          response.fieldErrors?.title?.[0] ||
            response.error ||
            "Failed to create category."
        );
      }
    });
  }

  return (
    <Card className="w-full max-w-3xl mx-auto rounded-2xl border border-gray-200/80 bg-gray-50/50 shadow-none p-6">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-gray-900">
          Create Category
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex flex-col gap-6">
        {/* Form Field Container */}
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <div className="w-full max-w-md space-y-2">
            <Label htmlFor="category-name" className="text-sm text-gray-600 font-medium">
              Name:
            </Label>
            <Input
              id="category-name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
              disabled={isPending}
              className="bg-white border-gray-300 focus-visible:ring-1 focus-visible:ring-black h-11 rounded-lg"
            />
            {errorMsg && (
              <p className="text-sm text-red-500 font-medium pt-1">{errorMsg}</p>
            )}
            {successMsg && (
              <p className="text-sm text-emerald-600 font-medium pt-1">{successMsg}</p>
            )}
          </div>
        </div>

        {/* Action Button Aligned to Bottom Right */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={createCategory}
            disabled={isPending}
            className="bg-black hover:bg-black/90 text-white px-8 py-2.5 rounded-xl font-semibold transition-all"
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateCategory;