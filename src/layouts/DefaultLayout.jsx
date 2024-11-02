import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

function DefaultLayout() {
  return (
    <div>
      <Header />
      {/* main content */}
      <Outlet />
      <Toaster />
    </div>
  );
}

export default DefaultLayout;
