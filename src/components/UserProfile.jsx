import React, { useEffect, useState } from "react";
import AvatarUploader from "./AvatarUploader";
import CoverImageUploader from "./CoverImageUploader";
import UserNavigation from "./UserNavigation";
import UserInfo from "./UserInfo";
import PostList from "./PostList";
import ImageGallery from "./ImageGallery";
import ImageUploader from "./ImageUploader";
import Friends from "../pages/FriendsPage/Friends";
import userApi from "@/apis/user.api";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import friendShipApi from "@/apis/friendShipApi";


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [activeTab, setActiveTab] = useState("Timeline");
  const [showModal, setShowModal] = useState(false); // Quản lý trạng thái modal
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    phone: "",
  });
  const [friends, setFriends] = useState([])


  useEffect(() => {
    fetchUser();
    fetchFriends();
  }, []);

  async function fetchFriends() {
    const friendsData = await friendShipApi.getFriends();
    if (!friendsData) return;
    setFriends(friendsData)
  }

  async function fetchUser() {
    try {
      const userData = await userApi.getInfo();
      setUser(userData.result);
      setCoverImage(userData.result.coverImage);
      setNewAvatar(userData.result.avatar);
      setFormData({
        name: userData.result.name,
        bio: userData.result.bio || "",
        phone: userData.result.phone || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUser = await userApi.updateProfile({
        ...formData,
        avatar: newAvatar,
        coverImage: coverImage,
      });
      if (updatedUser) {
        setUser(updatedUser);
        setShowModal(false);
        alert("Hồ sơ đã được cập nhật thành công!");
      } else {
        alert("Cập nhật hồ sơ thất bại.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Đã xảy ra lỗi khi lưu hồ sơ.");
    }
  };

  if (!user) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="relative">
      {/* Ảnh bìa */}
      <CoverImageUploader
        coverImage={coverImage}
        onCoverImageChange={setCoverImage}
      />

      <div className="flex flex-col items-center mt-8">
        <div className="w-full max-w-5xl">
          <div className="relative -mt-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <AvatarUploader
                  avatar={newAvatar}
                  onAvatarChange={setNewAvatar}
                />
                <div className="text-black">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.name}
                  </h2>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex items-center bg-gray-200 hover:bg-gray-300 text-black font-medium px-4 py-2 rounded-lg shadow-sm transition duration-300 ease-in-out"
                    >
                      <PencilSquareIcon className="w-5 h-5 mr-2" />
                      Cập nhật trang cá nhân
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-12">
            <UserNavigation activeTab={activeTab} onTabClick={setActiveTab} />
          </div>

          {/* Nội dung Tab */}
          <div className="mt-8 container mx-auto">
            {activeTab === "Timeline" && (
              <div>
                <PostList />
              </div>
            )}
            {activeTab === "Profile" && (
              <div className="flex items-center gap-4">
                <UserInfo user={user} />
              </div>
            )}
            {activeTab === "Friends" && (
              < Friends type="friends" key="friend" list={friends} />
            )}
            {activeTab === "Photos" && (
              // <div className="text-gray-700">Hiển thị album ảnh ở đây...</div>
              <ImageGallery />
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-2xl shadow-lg relative max-h-[90vh] overflow-y-auto transform transition duration-300 ease-in-out">
            {/* Nút đóng */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
              Chỉnh sửa trang cá nhân
            </h2>

            {/* Nội dung modal */}
            <div className="space-y-6">
              {/* Avatar */}
              <div className="w-full flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={newAvatar || "https://via.placeholder.com/100"} // URL ảnh hiện tại hoặc placeholder
                    alt="Ảnh đại diện"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <div>
                  <ImageUploader
                    onUploadSuccess={(uploadedUrl) => {
                      setNewAvatar(uploadedUrl); // Cập nhật avatar sau khi upload thành công
                    }}
                    buttonText="Thêm"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="w-full relative">
                <img
                  src={coverImage || "https://via.placeholder.com/500x200"} // URL ảnh hiện tại hoặc placeholder
                  alt="Ảnh bìa"
                  className="w-full h-40 rounded-lg object-cover"
                />
                <div className="absolute top-2 right-2">
                  <ImageUploader
                    onUploadSuccess={(uploadedUrl) => {
                      setCoverImage(uploadedUrl); // Cập nhật cover image sau khi upload thành công
                    }}
                    buttonText="Chỉnh sửa"
                  />
                </div>
              </div>

              {/* Form chỉnh sửa */}
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium">Tên</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên của bạn"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Giới thiệu ngắn về bạn"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex justify-end items-center gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg shadow-md transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



    </div>
  );
};

export default UserProfile;
