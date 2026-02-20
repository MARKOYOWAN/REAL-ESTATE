// src/routes/AppRoutes.tsx
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/Home/page/HomePage";  
import NotFoundPage from "../utils/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Route principale */}
        <Route index element={<HomePage />} />
        
        {/* Capture toutes les routes inconnues (*) */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;