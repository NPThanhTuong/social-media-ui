import { useEffect, useState } from "react";
import Post from "@/components/Post";
import { axiosInstance } from "@/configs/axiosConfig";
import Loading from "./Loading";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [likedPostId, setLikedPostId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        // Need change
        const userId = 1;
        const resPost = await axiosInstance.get(`posts/user/${userId}/friends`);
        const resLikedPostIds = await axiosInstance.get(
          `posts/user/${userId}/liked/id`
        );

        const dataPost = resPost.data;
        const dataLikedPostIds = resLikedPostIds.data;

        setPosts(dataPost);
        setLikedPostId(dataLikedPostIds);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
  return (
    <div className="mt-10 space-y-6">
      {loading ? (
        <Loading title="" />
      ) : (
        posts.map((post) => (
          <Post
            id={post.id}
            key={post.id + "_postId"}
            content={post.content}
            createdAt={post.createdAt}
            images={post.images}
            owner={post.owner}
            totalComment={post.totalComment}
            totalLike={post.totalLike}
            isLiked={likedPostId.some((id) => id === post.id)}
          />
        ))
      )}
    </div>
  );
}

export default PostList;
