// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/HomePage";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
