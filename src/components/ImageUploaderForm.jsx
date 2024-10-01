import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn/UI Button component
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

// Define your form schema using Zod (optional)
const formSchema = z.object({
  content: z.string(),
});

const ImageUploaderForm = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  // React Hook Form Setup
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
  const handleSubmit = (data) => {
    console.log("Form data: ", data);
    console.log("Uploaded images: ", selectedImages);
    // Perform submission logic here (e.g., send form data and images to server)
  };

  // Remove a previewed image
  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Text Fields */}
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
          Đăng bài
        </Button>
      </form>
    </Form>
  );
};

export default ImageUploaderForm;
