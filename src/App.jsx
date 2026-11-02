import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Perfil from "./pages/Perfil.jsx";
import Biblioteca from "./pages/Biblioteca.jsx";
import Admin from "./pages/Admin.jsx";
import Chat from "./pages/Chat.jsx";
import Inventory from "./pages/Inventory.jsx";
import { InventoryProvider } from "./context/InventoryContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
      <CartProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/biblioteca"
          element={
            <ProtectedRoute>
              <Biblioteca />
            </ProtectedRoute>
          }
        />
        <Route
          path="/biblioteca-designs"
          element={
            <ProtectedRoute>
              <Biblioteca />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/estoque"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      </CartProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}
