import React, { useState } from 'react';

const CoverImageUploader = ({ coverImage, onCoverImageChange }) => {
  const [isCoverOpen, setIsCoverOpen] = useState(false);

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newCoverImageURL = URL.createObjectURL(file);
      onCoverImageChange(newCoverImageURL);
    }
  };

  return (
    <>
      <div
        className="h-80 w-full max-w-5xl mx-auto bg-cover bg-center rounded-b-2xl relative cursor-pointer"
        style={{ backgroundImage: `url(${coverImage})` }}
        onClick={() => setIsCoverOpen(true)}
      >
        <div className="absolute bottom-2 right-4">
          <label
            htmlFor="cover-image-upload"
            className="text-white px-4 py-2 rounded cursor-pointer hover:bg-opacity-70"
          >
            Thay đổi ảnh bìa
          </label>
          <input
            type="file"
            id="cover-image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleCoverImageChange}
          />
        </div>
      </div>

      {isCoverOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={coverImage}
              alt="Ảnh bìa lớn"
              style={{ width: '1000px', height: '440px' }}
              className="rounded"
            />
            <button
              onClick={() => setIsCoverOpen(false)}
              className="absolute top-2 right-2 text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverImageUploader;
