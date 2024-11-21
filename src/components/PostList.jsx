import { useEffect, useState } from "react";
import Post from "@/components/Post";
import { axiosInstance } from "@/configs/axiosConfig";
import Loading from "./Loading";
import { useAuth } from "@/context/AuthContext";

function PostList({ postHref }) {
  const [posts, setPosts] = useState([]);
  const [likedPostId, setLikedPostId] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        // Need change
        const resPost = await axiosInstance.get(postHref, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const resLikedPostIds = await axiosInstance.get(`posts/liked/ids`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

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
