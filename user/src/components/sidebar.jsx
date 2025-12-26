import React, { useState, useContext } from "react";
import { Box, Typography, Button, Fade, Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleSidebar = () => setOpen(!open);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const colorPrimary = "#604652";
  const colorSecondary = "#C9B194";

  return (
    <>
      {/* Hamburger Button */}
      <Button
        onClick={toggleSidebar}
        sx={{
          position: "fixed",
          top: 12, // more spacing from top
          left: 24, // more spacing from left
          zIndex: 1500,
          backgroundColor: colorPrimary,
          color: "#fff",
          minWidth: "40px",
          height: "40px",
          borderRadius: "10%",
          "&:hover": { backgroundColor: colorSecondary },
        }}
      >
        ☰
      </Button>

      {/* Sidebar */}
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 260,
            height: "100vh",
            backgroundColor: "#fff3e6",
            boxShadow: 6,
            zIndex: 1400,
            pt: 6, // push content below top (avoids overlap with button/logo)
            px: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: colorPrimary }}>
              Menu
            </Typography>
            <Button onClick={toggleSidebar} sx={{ color: colorPrimary }}>
              ✕
            </Button>
          </Box>

          {user && (
            <Typography variant="subtitle1" sx={{ mb: 2, color: colorPrimary }}>
              Hi, <b>{user.name}</b>
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{
              backgroundColor: colorPrimary,
              "&:hover": { backgroundColor: colorSecondary },
              color: "#fff",
            }}
            onClick={() => navigate("/update-profile")}
          >
            Update Profile
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: colorPrimary,
              "&:hover": { backgroundColor: colorSecondary },
              color: "#fff",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Slide>

      {/* Overlay */}
      {open && (
        <Fade in={open}>
          <Box
            onClick={toggleSidebar}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 1300,
            }}
          />
        </Fade>
      )}
    </>
  );
};

export default Sidebar;
