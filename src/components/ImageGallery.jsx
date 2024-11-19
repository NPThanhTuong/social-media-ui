import React, { useEffect, useState } from "react";
import userApi from "@/apis/user.api";

const ImageGallery = () => {
    const [images, setImages] = useState([]); // State lưu danh sách hình ảnh
    const [loading, setLoading] = useState(true); // State kiểm tra trạng thái tải
    const [error, setError] = useState(null); // State kiểm tra lỗi
    const [selectedImage, setSelectedImage] = useState(null); // State lưu ảnh được chọn để phóng to

    // Lấy danh sách hình ảnh từ API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await userApi.getUserImages("/users/images"); // Gửi request API
                console.log({ response });
                setImages(response); // Lưu dữ liệu hình ảnh vào state
            } catch (err) {
                setError("Không thể tải hình ảnh!"); // Nếu có lỗi, lưu lỗi vào state
                console.error("Error fetching images:", err);
            } finally {
                setLoading(false); // Dừng trạng thái tải
            }
        };

        fetchImages();
    }, []);

    // Đóng modal khi người dùng click vào vùng tối
    const handleCloseModal = () => {
        setSelectedImage(null); // Đặt lại ảnh đã chọn về null
    };

    if (loading) {
        return <div className="text-center mt-4">Đang tải hình ảnh...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-center mt-4 mb-6">
                Hình ảnh của bạn
            </h2>

            {/* Modal phóng to hình ảnh */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                    onClick={handleCloseModal} // Click vào vùng tối để đóng modal
                >
                    <img
                        src={selectedImage}
                        alt="Phóng to hình ảnh"
                        className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out transform"
                        style={{
                            width: "55%", // Đặt chiều rộng ảnh phóng to là 80% của chiều rộng màn hình
                            height: "auto", // Đảm bảo tỷ lệ ảnh được giữ nguyên
                            maxWidth: "500px", // Giới hạn ảnh không vượt quá 900px
                        }}
                    />
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
                        onClick={() => setSelectedImage(image.path)} // Khi click vào hình, mở modal
                    >
                        <img
                            src={image.path}
                            alt={`Image ${index}`}
                            className="w-full h-full object-cover cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
