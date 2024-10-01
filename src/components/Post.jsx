import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

import { Ellipsis, MessageCircle, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback, useRef } from "react";
import LightGallery from "lightgallery/react";

function Post({ images }) {
  const lightGallery = useRef(null);
  const MAX_VISIBLE_IMAGES = 4; // Limit to display before hiding the rest
  const visibleImages = images.slice(0, MAX_VISIBLE_IMAGES); // First 5 images
  const remainingCount = images.length - MAX_VISIBLE_IMAGES; // Remaining image count

  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  const handleClickImage = (index) => {
    lightGallery.current.openGallery(index);
  };

  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-background">N/A</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">Thanh Tường</CardTitle>
              <CardDescription>
                {new Date(2024, 9, 30, 18, 49, 22).toLocaleString()}
              </CardDescription>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Chỉnh sửa bài viết</DropdownMenuItem>
              <DropdownMenuItem>Chuyển vào thùng rác</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {false ? (
          <p>Card Content</p>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-2">
              {visibleImages.map((image, index) => (
                <div
                  key={index}
                  className="relative hover:cursor-pointer"
                  onClick={() => handleClickImage(index)}
                >
                  <img
                    src={image.src}
                    alt={`Post Image ${index}`}
                    className="object-cover w-full h-64 md:h-72 rounded"
                  />
                  {/* If this is the last image and there are more images, show "+X more" */}
                  {index === MAX_VISIBLE_IMAGES - 1 && remainingCount > 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-3xl font-bold rounded cursor-pointer">
                      +{remainingCount}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <LightGallery
              onInit={onInit}
              dynamic={true}
              plugins={[lgZoom, lgThumbnail]}
              zoom={{ scale: 2.5, enableZoomAfter: 100 }}
              dynamicEl={images}
            ></LightGallery>
          </div>
        )}
      </CardContent>
      <CardFooter className="pb-3">
        <div className="w-full">
          <div className=" flex items-center gap-2">
            <div className="rounded-full p-1.5 bg-primary">
              <ThumbsUp size={15} color="white" strokeWidth={2.5} />
            </div>
            <span>20</span>
          </div>
          <Separator className="my-3" />
          <div className="flex justify-around">
            {/* like */}
            <Toggle
              className="flex items-center gap-2 px-16 md:px-20"
              aria-label="like button"
            >
              <ThumbsUp size={20} />
              <span>Thích</span>
            </Toggle>
            {/* comment */}
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-16 md:px-20"
            >
              <MessageCircle size={20} />
              <span>Bình luận</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Post;
