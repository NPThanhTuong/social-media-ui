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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Ellipsis, MessageCircle, ThumbsUp, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback, useRef } from "react";
import LightGallery from "lightgallery/react";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "@/configs/axiosConfig";
import CommentSystem from "./CommentSystem";

function Post({
  id,
  content,
  images,
  owner,
  totalComment,
  totalLike,
  createdAt,
  isLiked,
}) {
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

  const handleClickLikePost = async (pressed) => {
    try {
      // Need change
      const userId = 1;
      const likeReactionId = 1;
      const res = await axiosInstance.post(`/posts/user/${userId}/like`, {
        postId: id,
        reactionId: likeReactionId,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarImage src={owner.avatar} />
              <AvatarFallback className="bg-background">N/A</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{owner.name}</CardTitle>
              <CardDescription>
                {new Date(createdAt).toLocaleString()}
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
        <p>{content}</p>
        {images.length > 0 && (
          <div className="mt-6">
            <div
              className={twMerge(
                "grid gap-2",
                images.length == 1 ? "grid-cols-1" : "grid-cols-2"
              )}
            >
              {visibleImages.map((image, index) => (
                <div
                  key={index}
                  className="relative hover:cursor-pointer"
                  onClick={() => handleClickImage(index)}
                >
                  <img
                    src={image.path}
                    alt={`Post Image ${index + 1}`}
                    className="object-cover w-full h-64 md:h-72 lg:h-[450px] rounded"
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
              zoom={{ scale: 1.5, enableZoomAfter: 100 }}
              dynamicEl={images.map((image, index) => ({
                src: image.path,
                thumb: image.path,
                subHtml: `<h4>Image ${index + 1} title</h4><p>Image ${
                  index + 1
                } descriptions.</p>`,
              }))}
            ></LightGallery>
          </div>
        )}
      </CardContent>
      <CardFooter className="pb-3">
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full p-1.5 bg-primary">
                <ThumbsUp size={15} color="white" strokeWidth={2.5} />
              </div>
              <span>{totalLike}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hover:underline hover:cursor-pointer">
                {totalComment} bình luận
              </span>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="flex justify-around">
            {/* like */}
            <Toggle
              className="flex items-center gap-2 px-16 md:px-20"
              aria-label="like button"
              defaultPressed={isLiked}
              onPressedChange={handleClickLikePost}
            >
              <ThumbsUp size={20} />
              <span>Thích</span>
            </Toggle>
            {/* comment */}

            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-16 md:px-20"
                >
                  <MessageCircle size={20} />
                  <span>Bình luận</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="w-full md:h-3/4 lg:w-2/3 container mx-auto">
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Bình luận bài biết</DrawerTitle>
                    <DrawerDescription>
                      Hãy cùng chia sẻ với bạn bè nào.
                    </DrawerDescription>
                  </DrawerHeader>

                  <div className="mt-6">
                    <CommentSystem postId={id} />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Post;
