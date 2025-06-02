'use client';
import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setMainImage, setPreviewImages } from '@/redux/slices/productSlice';


const ImageUploader = () => {
  const dispatch = useAppDispatch();
  const { mainImage, previewImages } = useAppSelector((state) => state.product);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<HTMLInputElement | null>(null);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) dispatch(setMainImage(file));
  };

  const handlePreviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) dispatch(setPreviewImages([...previewImages, ...files]));
  };

  const removePreviewImage = (index: number) => {
    const updated = [...previewImages];
    updated.splice(index, 1);
    dispatch(setPreviewImages(updated));
  };

  return (
    <div className='space-y-4'>
      <div>
        <label className='block font-medium'>Main Image</label>
        <div
          className='border-2 border-dashed rounded-xl p-4 text-center cursor-pointer'
          onClick={() => fileRef.current?.click()}
        >
          {mainImage ? (
            <img
              src={URL.createObjectURL(mainImage)}
              alt='Main'
              className='h-32 mx-auto object-contain'
            />
          ) : (
            <span>Click to upload main image</span>
          )}
          <input
            type='file'
            accept='image/*'
            hidden
            ref={fileRef}
            onChange={handleMainImageChange}
          />
        </div>
      </div>

      <div>
        <label className='block font-medium'>Preview Images</label>
        <div
          className='border-2 border-dashed rounded-xl p-4 text-center cursor-pointer'
          onClick={() => previewRef.current?.click()}
        >
          <span>Click to upload preview images</span>
          <input
            type='file'
            multiple
            accept='image/*'
            hidden
            ref={previewRef}
            onChange={handlePreviewImageChange}
          />
        </div>
        {previewImages.length > 0 && (
          <div className='flex gap-2 mt-2 flex-wrap'>
            {previewImages.map((file, i) => (
              <div key={i} className='relative w-24 h-24'>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${i}`}
                  className='w-full h-full object-cover rounded'
                />
                <button
                  type='button'
                  onClick={() => removePreviewImage(i)}
                  className='absolute top-0 right-0 bg-black bg-opacity-60 text-white p-1 rounded-full'
                >
           
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
