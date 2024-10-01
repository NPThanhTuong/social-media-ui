import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div>
      <Header />

      {/* main content */}
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
