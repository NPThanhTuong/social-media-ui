import React, { useState } from 'react';
import AvatarUploader from './AvatarUploader';
import CoverImageUploader from './CoverImageUploader';
import UserNavigation from './UserNavigation';
import UserInfo from './UserInfo';
import PostList from './PostList';

const user = {
  role_id: 1,
  name: 'Nguyễn Ngọc Ánh',
  dob: '1990-01-01',
  phone: '0912000001',
  email: 'nnanh124@gmail.com',
  avatar: '/images/img1.jpg',
  bio: 'Lập trình viên',
  cover_image: '/images/img4.jpg',
  created_at: '2023-10-14 12:00:00',
  updated_at: '2023-10-14 12:00:00',
};

const UserProfile = () => {
  const [coverImage, setCoverImage] = useState(user.cover_image);
  const [newAvatar, setNewAvatar] = useState(user.avatar);
  const [activeTab, setActiveTab] = useState('Timeline');

  return (
    <div className="relative">
      <CoverImageUploader coverImage={coverImage} onCoverImageChange={setCoverImage} />
      
      <div className="flex flex-col items-center mt-8">
        <div className="w-full max-w-4xl">
          <div style={{ transform: 'translateY(50px)' }}>
            <div className="relative container mx-auto px-4 -mt-16">
              <div className="flex items-center gap-4">
                <AvatarUploader avatar={newAvatar} onAvatarChange={setNewAvatar} />
                <div className="text-black">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <div className="flex gap-4 mt-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Update Info</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <UserNavigation activeTab={activeTab} onTabClick={setActiveTab} />
          </div>
          <div className="mt-8 container mx-auto">
            {activeTab === 'Timeline' && (
              <div > <PostList /> </div>)}
            {activeTab === 'Profile' && (
              <div className="flex items-center gap-4">
                <UserInfo user={user} />
              </div>
            )}
            {activeTab === 'Friends' && <div>Hiển thị danh sách bạn bè ở đây...</div>}
            {activeTab === 'Photos' && <div>Hiển thị album ảnh ở đây...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
