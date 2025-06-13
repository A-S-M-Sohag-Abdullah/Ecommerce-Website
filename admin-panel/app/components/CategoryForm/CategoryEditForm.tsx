"use client";
import React, { useEffect, useState } from "react";
import {
  setName,
  setDescription,
  setImage,
  resetCategory,
} from "@/features/category/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { getCategoryByName } from "@/api/categoryApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface CategoryFormProps {
  categoryname: string | undefined;
}

function CategoryEditForm({ categoryname }: CategoryFormProps) {
  const dispatch = useDispatch();
  const { name, description, image } = useSelector(
    (state: RootState) => state.category
  );
  const [imagePerivew, setImagePerivew] = useState<
    string | ArrayBuffer | null
  >();

  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    dispatch(setImage(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const filePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImagePerivew(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const PopulateCategoryForm = async (categoryname: string) => {
    const categoryData = await getCategoryByName(categoryname);

    if (categoryData) {
      dispatch(setDescription(categoryData?.description));

      let imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${categoryData.image}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], categoryData.image, { type: "image/jpeg" });
      dispatch(setImage(file));
    }
  };

  useEffect(() => {
    if (image) filePreview(image);
  }, [image]);

  useEffect(() => {
    if (categoryname) {
      dispatch(setName(categoryname));
      PopulateCategoryForm(categoryname);
    }
    return () => {
      dispatch(resetCategory());
    };
  }, [categoryname]);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Category Info</h2>
      <input
        type="text"
        placeholder="Category Name"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        defaultValue={name}
        onChange={(e) => dispatch(setName(e.target.value))}
      />
      <textarea
        placeholder="Category Description"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        rows={4}
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
      />

      <label className="block text-sm text-gray-600 mb-1">Image</label>
      <div
        className={`border border-dashed rounded p-4 text-center cursor-pointer transition-colors ${
          isDragging ? "bg-blue-50 border-blue-300" : "bg-white"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />

        <p className="text-xs text-gray-400 mb-4">Or drag and drop files</p>

        <label
          htmlFor="file-upload"
          className="mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2 inline-block"
        >
          Add File
        </label>

        {image && <p className="text-xs mt-2 text-gray-700">{image.name}</p>}
      </div>
      {imagePerivew && (
        <div className="relative mt-4 w-fit">
          <img
            src={imagePerivew as string}
            alt={`Preview `}
            className="size-12 rounded-sm"
          />
          <span
            className="absolute top-[-5px] right-[-5px] bg-blue-600 rounded-full text-white flex justify-center items-center size-3.5 shadow-2xl cursor-pointer text-xs"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setImage(null));
              setImagePerivew("");
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
      )}
    </div>
  );
}

export default CategoryEditForm;
