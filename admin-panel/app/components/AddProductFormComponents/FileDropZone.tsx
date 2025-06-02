"use client";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { RootState } from "@/store/store";
import { setFiles, setTitle } from "@/features/product/productSlice";

export const FileDropzone: React.FC = () => {
  const dispatch = useDispatch();
  const { files } = useSelector((state: RootState) => state.product);

  const [dragging, setDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(setFiles(Array.from(e.target.files)));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      console.log("Files dropped:", e.dataTransfer.files);

      dispatch(setFiles(Array.from(e.dataTransfer.files)));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Images</h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragging(false)}
        onClick={openFilePicker}
        className={
          "border rounded-md p-6 text-center cursor-pointer text-sm text-gray-500 hover:bg-gray-50 transition" +
          " " +
          (dragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 border-dashed")
        }
      >
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          type="button"
          className="mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2"
        >
          Add File
        </button>
        <p className="mt-2">Drag and drop files or click to add</p>

        {files.length > 0 && (
          <div className="mt-4 text-left">
            <h4 className="font-medium mb-2">Selected Files:</h4>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
