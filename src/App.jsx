import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import EnhancedPlayerControls from "./components/EnhancedPlayerControls";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PlaylistPage from "./pages/PlaylistPage";
import AlbumPage from "./pages/AlbumPage";
import GenrePage from "./pages/GenrePage";
import Library from "./pages/Library";
import PlaylistManager from "./components/PlaylistManager";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

// Main App Layout
const AppLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="app">
      <div className="app-container">
        <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
        <div className="main-content">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlist/:id" element={<PlaylistPage />} />
              <Route path="/album/:id" element={<AlbumPage />} />
              <Route path="/genre/:id" element={<GenrePage />} />
              <Route path="/library" element={<Library />} />
              <Route
                path="/my-playlists"
                element={
                  <ProtectedRoute>
                    <PlaylistManager />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <EnhancedPlayerControls />
    </div>
  );
};

// Auth Pages
const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <Routes>
            <Route path="/login/*" element={<AuthLayout />} />
            <Route path="/signup/*" element={<AuthLayout />} />
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
