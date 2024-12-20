//import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/HomePage"; // Trang chủ
import UserPage from "@/pages/UserPage"; // Trang hồ sơ người dùng
import FriendsPage from "@/pages/FriendsPage";
import MessagesPage from "@/pages/MessagesPage"; // Trang tin nhắn
import { ThemeProvider } from "@/components/theme-provider"; // ThemeProvider cho toàn ứng dụng
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<UserPage />} />
                <Route path="/profile/:userId" element={<UserProfilePage />} />
                <Route path="/user/friends/:page" element={<FriendsPage />} />
                <Route path="/messages" element={<MessagesPage />} />
              </Route>
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
