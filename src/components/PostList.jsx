import { useEffect, useState } from "react";
import Post from "@/components/Post";

function PostList() {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    // call api
    //
    const data = [
      {
        id: 1,
      },
    ];
  }, []);

  const images1 = [
    {
      src: `/images/img1.jpg`,
      thumb: `/images/img1.jpg`,
      subHtml: "<h4>Image 1 title</h4><p>Image 1 descriptions.</p>",
    },
    {
      src: `/images/img2.jpg`,
      thumb: `/images/img2.jpg`,
      subHtml: "<h4>Image 2 title</h4><p>Image 2 descriptions.</p>",
    },

    {
      src: `/images/img3.jpg`,
      thumb: `/images/img3.jpg`,
      subHtml: "<h4>Image 3 title</h4><p>Image 3 descriptions.</p>",
    },
    {
      src: `/images/img4.jpg`,
      thumb: `/images/img4.jpg`,
      subHtml: "<h4>Image 4 title</h4><p>Image 4 descriptions.</p>",
    },
    {
      src: `/images/img5.jpg`,
      thumb: `/images/img5.jpg`,
      subHtml: "<h4>Image 5 title</h4><p>Image 5 descriptions.</p>",
    },
  ];

  const images2 = [
    {
      src: `/images/img4.jpg`,
      thumb: `/images/img4.jpg`,
      subHtml: "<h4>Image 4 title</h4><p>Image 4 descriptions.</p>",
    },
    {
      src: `/images/img5.jpg`,
      thumb: `/images/img5.jpg`,
      subHtml: "<h4>Image 5 title</h4><p>Image 5 descriptions.</p>",
    },
  ];

  return (
    <div className="mt-10 space-y-6">
      <Post images={images1} />
      <Post images={images2} />
    </div>
  );
}

export default PostList;
