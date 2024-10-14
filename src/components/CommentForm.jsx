import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommentForm = ({ onSubmit, parentId = null }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(parentId, content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Avatar>
        {/* lay avatar cua user login */}
        <AvatarImage src={null} />
        <AvatarFallback className="bg-foreground text-background">
          N/A
        </AvatarFallback>
      </Avatar>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Viết bình luận của bạn..."
        required
      />
      <Button type="submit" size="icon">
        <Send size={20} />
      </Button>
    </form>
  );
};

export default CommentForm;
