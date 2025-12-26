// src/views/Login.jsx
import React, { useState, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Link as MuiLink,
  Fade,
  Grow,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    password: "",
    role: "User",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const colorPrimary = "#604652";
  const colorSecondary = "#C9B194";
  const bgColor = "#fff9f5";

  const redirectToDashboard = (role) => {
    switch (role) {
      case "User":
        navigate("/userDashboard");
        break;
      case "Contractor":
        navigate("/contractorDashboard");
        break;
      case "Worker":
        navigate("/workerDashboard");
        break;
      case "Supplier":
        navigate("/supplierDashboard");
        break;
      default:
        navigate("/home");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", data, {
        withCredentials: true,
      });

      const result = res.data;
      setLoading(false);

      if (!result.success) {
        alert(result.message || "Login failed");
        return;
      }

      const loggedInUser = {
        _id: result._id,
        name: result.name,
        role: result.role,
      };
      setUser(loggedInUser);
      redirectToDashboard(result.role);
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Server error. Try again later.";
      alert(errorMessage);
      setLoading(false);
    }
  };

  if (user) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">
          You are already logged in as <b>{user.role}</b>
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${bgColor} 40%, #fff3e6 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        p: 2,
      }}
    >
      <Fade in timeout={1000}>
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            backgroundColor: "#fff",
            boxShadow: 6,
            borderRadius: 3,
            p: 3,
          }}
        >
          <CardContent>
            <Grow in timeout={1200}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: colorPrimary,
                  mb: 3,
                }}
              >
                Login to Enforcer
              </Typography>
            </Grow>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                select
                label="Select Role"
                name="role"
                value={data.role}
                onChange={handleChange}
                fullWidth
                variant="filled"
                sx={{
                  backgroundColor: "#fff9f5",
                  borderRadius: 1,
                }}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Worker">Worker</MenuItem>
                <MenuItem value="Contractor">Contractor</MenuItem>
                <MenuItem value="Supplier">Supplier</MenuItem>
              </TextField>

              <TextField
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                fullWidth
                variant="filled"
                sx={{
                  backgroundColor: "#fff9f5",
                  borderRadius: 1,
                }}
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={data.password}
                onChange={handleChange}
                required
                fullWidth
                variant="filled"
                sx={{
                  backgroundColor: "#fff9f5",
                  borderRadius: 1,
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: colorPrimary,
                  "&:hover": { backgroundColor: colorSecondary, transform: "scale(1.05)" },
                  color: "#fff",
                  mt: 2,
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : "Login"}
              </Button>
            </Box>

            <Typography
              sx={{
                textAlign: "center",
                mt: 3,
                color: "#666",
              }}
            >
              Don’t have an account?{" "}
              <MuiLink component={RouterLink} to="/register" sx={{ color: colorPrimary, fontWeight: "bold" }}>
                Register here
              </MuiLink>
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Login;
