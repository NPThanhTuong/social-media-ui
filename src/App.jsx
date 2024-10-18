//import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/HomePage"; // Trang chủ
import UserPage from "@/pages/UserPage"; // Trang hồ sơ người dùng
import FriendsPage from "@/pages/FriendsPage";
import { ThemeProvider } from "@/components/theme-provider"; // ThemeProvider cho toàn ứng dụng
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Sử dụng DefaultLayout cho tất cả các route */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/" element={<UserPage />} />
            <Route path="/user/friends/:page" element={<FriendsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;


