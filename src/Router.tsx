import { NuqsAdapter } from "nuqs/adapters/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { PublicRoute } from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./Layout";
import { LoginPage } from "./pages/LoginPage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import { MoviesPage } from "./pages/MoviesPage";
import { RegisterPage } from "./pages/RegisterPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <NuqsAdapter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />

              <Route
                path="/movies"
                element={
                  <ProtectedRoute>
                    <MoviesPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/movies/:id"
                element={
                  <ProtectedRoute>
                    <MovieDetailsPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </NuqsAdapter>
    </BrowserRouter>
  );
}
