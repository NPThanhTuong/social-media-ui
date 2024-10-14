import { axiosInstance } from "@/configs/axiosConfig";
import { useEffect, useRef, useState } from "react";
import Comment from "@/components/Comment";
import CommentForm from "./CommentForm";
import { ScrollArea } from "./ui/scroll-area";

function CommentSystem({ postId }) {
  const [comments, setComments] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch the comments from API when the component is mounted
    fetchComments();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      console.log(scrollRef.current);
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comments/post/${postId}`); // Replace with your API endpoint
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async (parentCommentId = null, replyContent) => {
    try {
      const response = await axiosInstance.post(`comments/post/${postId}`, {
        content: replyContent,
        parentId: parseInt(parentCommentId),
      });
      fetchComments(); // Refresh comments after adding
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleEditComment = async (commentId, newContent) => {
    try {
      await axiosInstance.put(`/comments/${commentId}`, {
        content: newContent,
      });
      fetchComments(); // Refresh comments after editing
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      fetchComments(); // Refresh comments after deleting
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="pb-6">
      <ScrollArea
        ref={scrollRef}
        className="w-full h-[300px] md:h-[350px] lg:h-[400px] mb-6"
      >
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              onAddReply={handleAddComment}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </ScrollArea>

      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
}

export default CommentSystem;
