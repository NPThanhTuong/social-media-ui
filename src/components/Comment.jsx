import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function Comment({ comment, onEdit, onDelete, onAddReply }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const { user } = useAuth();

  // const handleEdit = () => {
  //   if (isEditing) {
  //     onEdit(comment.id, newContent);
  //   }
  //   setIsEditing(!isEditing);
  // };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  const handleReply = () => {
    onAddReply(comment.id, replyContent);
    setReplyContent("");
    setShowReplyInput(false);
  };

  return (
    <div style={{ marginLeft: comment.parentCommentId ? 50 : 0 }}>
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={comment.user.avatar} />
          <AvatarFallback className="bg-foreground text-background">
            N/A
          </AvatarFallback>
        </Avatar>

        {isEditing ? (
          <div className="flex gap-4">
            <Avatar>
              {/* lay avatar cua user login */}
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-foreground text-background">
                N/A
              </AvatarFallback>
            </Avatar>
            <Input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="bg-secondary py-2 px-4 rounded-3xl">
              <h4 className="mb-1 font-bold">{comment.user.name}</h4>
              <p>{comment.content}</p>
            </div>
            <div className="mt-1">
              {/* <Button
                variant="ghost"
                className="py-1 px-2"
                onClick={handleEdit}
              >
                {isEditing ? "Lưu" : "Sửa"}
              </Button> */}
              {/* 
              Cần kiểm tra nếu người dùng
              <Button onClick={handleDelete}>Xóa</Button> 
            */}
              <Button
                variant="ghost"
                className="py-1 px-2"
                onClick={() => setShowReplyInput(!showReplyInput)}
              >
                Trả lời
              </Button>
            </div>
          </div>
        )}
      </div>

      {showReplyInput && (
        <div className="flex gap-4 mt-3 mb-6">
          <Avatar>
            {/* lay avatar cua user login */}
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-foreground text-background">
              N/A
            </AvatarFallback>
          </Avatar>
          <Input
            type="text"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <Button onClick={handleReply}>Trả lời</Button>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddReply={onAddReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
