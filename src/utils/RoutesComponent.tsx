// src/routes/RoutesComponent.tsx
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../utils/NotFoundPage";
import LoginPage from "../auth/page/PageLogin";
import PropertyList from "../features/property/page/PropertyList";

// Lazy loading pour les pages
const HomePage = lazy(() => import("../features/Home/page/HomePage"));



const RoutesComponent: React.FC = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Routes>
        {/* Layout principal */}
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          {/* Pages publiques */}
          <Route index element={<HomePage />} />
          <Route path="/properties" element={<PropertyList />} />

          {/* Pages privées */}
          {/* <Route
            path="properties"
            element={
              <PrivateRoute>
                <PropertiesList />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="my-properties"
            element={
              <PrivateRoute role="agent">
                <MyProperties />
              </PrivateRoute>
            }
          /> */}

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
