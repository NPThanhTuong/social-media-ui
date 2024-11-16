import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Loading from "./Loading";

const ImageUploader = ({ onUploadSuccess, buttonText = "Tải lên" }) => {
    const [selectedImage, setSelectedImage] = useState(null); // Ảnh đã chọn (preview)
    const [uploading, setUploading] = useState(false); // Trạng thái đang tải lên
    const { toast } = useToast();

    // Xử lý chọn ảnh và tải lên
    const handleImageUpload = async (event) => {
        const file = event.target.files[0]; // Lấy file từ input
        if (!file) return;

        // Tạo URL preview
        const previewUrl = URL.createObjectURL(file);
        setSelectedImage(previewUrl); // Hiển thị ảnh preview trong giao diện

        // Chuẩn bị FormData để gửi đến Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET); // Lấy từ biến môi trường

        try {
            setUploading(true); // Hiển thị trạng thái tải lên

            // Gửi request upload đến Cloudinary
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );

            // URL ảnh đã tải lên
            const uploadedUrl = response.data.secure_url;

            setUploading(false); // Kết thúc trạng thái tải lên
            toast({
                title: "Thành công",
                description: "Hình ảnh đã được tải lên!",
            });

            // Gọi callback nếu có
            if (onUploadSuccess) {
                onUploadSuccess(uploadedUrl); // Cung cấp URL đã tải lên cho component cha
            }
        } catch (error) {
            setUploading(false); // Xử lý lỗi khi tải lên thất bại
            console.error("Error uploading image:", error);
            toast({
                title: "Lỗi",
                description: "Có lỗi xảy ra khi tải lên hình ảnh.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-4">
            {/* Hiển thị ảnh preview */}
            {selectedImage && (
                <div className="mb-4">
                    {/* <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                    /> */}
                </div>
            )}

            {/* Input và nút tải lên */}
            <div className="relative">
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload} // Gọi hàm xử lý upload
                    className="hidden"
                    id={`file-input-${buttonText}`} // Tạo ID độc lập dựa trên buttonText
                />
                <Button
                    onClick={() => document.getElementById(`file-input-${buttonText}`).click()} // Kích hoạt input khi nhấn nút
                    className="flex items-center"
                >
                    {/* <Image size={20} color="#45bd62" className="mr-2" /> */}
                    {uploading ? "Đang tải..." : buttonText}
                </Button>
            </div>

            {/* Hiển thị loading spinner khi đang tải lên */}
            {uploading && <Loading />}
        </div>
    );
};

export default ImageUploader;
