import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "./ui/input";
import { Image } from "lucide-react";
import axios from "axios";
import { axiosInstance } from "@/configs/axiosConfig";
import { useToast } from "@/hooks/use-toast";
import { useDialog } from "./UploadPostDialogProvider";
import { InfinitySpin } from "react-loader-spinner";
import Loading from "./Loading";

const formSchema = z.object({
  content: z.string(),
});

const ImageUploaderForm = ({ onChangeDialog }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    // Convert files to preview-able URLs
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Submit the selected images and form data
  const handleSubmit = async (data) => {
    const uploadPromises = selectedImages.map((image) => {
      const formData = new FormData();
      formData.append("file", image.file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

      return axios.post(
        "https://api.cloudinary.com/v1_1/dmcqr73g4/image/upload",
        formData
      );
    });

    try {
      setLoading(true);
      const resCloudinary = await Promise.all(uploadPromises);
      const uploadedUrls = resCloudinary.map((response) => ({
        path: response.data.secure_url,
      }));

      // Need change
      const res = await axiosInstance.post(
        "/posts/user/1",
        {
          content: data?.content,
          images: uploadedUrls,
        }
        // {
        //   headers: {
        //     Authorization:""
        //   },
        // }
      );

      setLoading(false);
      onChangeDialog(false);
      toast({
        title: "Thành công",
        description: "Bài viết đã được đăng tải!",
      });
    } catch (error) {
      console.error("Error uploading images", error);
    }
  };

  // Remove a previewed image
  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Hãy chia sẻ với chúng tôi!" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Image size={30} color="#45bd62" />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Image Previews */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.preview}
                alt={`Preview ${index}`}
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-4 w-full">
          Đăng tải
        </Button>
      </form>
    </Form>
  );
};

export default ImageUploaderForm;
