import React, { useState } from 'react';

const AvatarUploader = ({ avatar, onAvatarChange }) => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

  const handleAvatarImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newAvatarURL = URL.createObjectURL(file);
      onAvatarChange(newAvatarURL);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHoveringAvatar(true)}
      onMouseLeave={() => setIsHoveringAvatar(false)}
    >
      <img
        src={avatar}
        alt="Avatar"
        className="w-40 h-40 rounded-full border-4 border-white cursor-pointer"
        onClick={() => setIsAvatarOpen(true)}
      />
      {isHoveringAvatar && (
        <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-center justify-center text-white text-center rounded-b-full cursor-pointer">
          <label htmlFor="avatar-image-upload" className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7-7h4l7 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21h8M12 17a4 4 0 110-8 4 4 0 010 8z" />
              </svg> */}
              {/* <span className="font-bold text-blue-500">Edit</span> */}
            </div>
          </label>
          <input
            type="file"
            id="avatar-image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarImageChange}
          />
        </div>
      )}

      {isAvatarOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="relative">
            <img src={avatar} alt="Avatar lớn" className="w-96 h-96 rounded-full" />
            <button
              onClick={() => setIsAvatarOpen(false)}
              className="absolute top-2 right-2 text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;
