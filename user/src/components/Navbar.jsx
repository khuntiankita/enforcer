import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Link } from "@mui/material";

export default function Navbar({ showSidebarButton, onSidebarToggle }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const colorPrimary = "#604652";

  return (
    <Box
      sx={{
        color: "#fff",
        backgroundColor: "#735557",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Sidebar Toggle Button */}
        {showSidebarButton && (
          <button
            onClick={onSidebarToggle}
            style={{
              fontSize: "24px",
              background: "#604652",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "4px",
              padding: "4px 8px",
            }}
          >
            ☰
          </button>
        )}
      </Box>

      {/* Links */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Link component={RouterLink} to="/" sx={{ color: "#fff", fontWeight: 500 }} underline="none">
          Home
        </Link>
        <Link component={RouterLink} to="/book" sx={{ color: "#fff", fontWeight: 500 }} underline="none">
          Book Now
        </Link>
        <Link component={RouterLink} to="/Dashboard" sx={{ color: "#fff", fontWeight: 500 }} underline="none">
          Dashboard
        </Link>

        {user ? (
          <Link
            onClick={handleLogout}
            sx={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
            underline="none"
          >
            Logout
          </Link>
        ) : (
          <Link component={RouterLink} to="/login" sx={{ color: "#fff", fontWeight: 500 }} underline="none">
            Login / Register
          </Link>
        )}
      </Box>
    </Box>
  );
}
