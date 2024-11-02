import CreatePost from "@/components/CreatePost";
import FriendSidebar from "@/components/FriendSidebar";
import MenuSidebar from "@/components/MenuSidebar";
import PostList from "@/components/PostList";

function HomePage() {
  return (
    <div className="container mx-auto flex gap-5 justify-between pt-10">
      <div className="sticky top-20 hidden lg:block lg:w-3/12 max-h-40">
        <MenuSidebar />
      </div>
      <div className="w-screen md:w-8/12 lg:w-6/12 h-screen">
        <CreatePost />
        <PostList />
      </div>
      <div className="sticky top-20 hidden md:block md:w-4/12 lg:w-3/12  max-h-40">
        <FriendSidebar />
      </div>
    </div>
  );
}

export default HomePage;
