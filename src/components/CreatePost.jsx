import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ImageUploaderForm from "@/components/ImageUploaderForm";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

function CreatePost() {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuth();

  return (
    <div className="p-4 bg-secondary border rounded-md">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="bg-background">N/A</AvatarFallback>
        </Avatar>

        <Dialog
          open={openDialog}
          onOpenChange={() => setOpenDialog((prev) => !prev)}
        >
          <DialogTrigger className="flex-1">
            <div className="rounded-full text-left bg-background p-3 hover:cursor-pointer hover:bg-background-hover transition-all">
              Bạn đang nghĩ gì thế?
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-6">Tạo bài viết</DialogTitle>
              <ImageUploaderForm onChangeDialog={setOpenDialog} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreatePost;
