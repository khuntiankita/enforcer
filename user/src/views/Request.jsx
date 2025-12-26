// src/views/Request.jsx
import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Fade,
  Grow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Request = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    work: "",
    city: "",
    number: "",
  });
  const [loading, setLoading] = useState(false);

  const colorPrimary = "#604652";
  const colorSecondary = "#C9B194";
  const bgColor = "#fff9f5";

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to make a request!");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.name || !data.description || !data.work || !data.city || !data.number) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      navigate("/SupplierList", { state: data });
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${bgColor} 40%, #fff3e6 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        fontFamily: "var(--font-mono)",
      }}
    >
      <Fade in timeout={1000}>
        <Card
          sx={{
            maxWidth: 450,
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
                Request to Supplier
              </Typography>
            </Grow>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#666",
                mb: 3,
              }}
            >
              Fill out the details below to send your request to a supplier.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                variant="filled"
                fullWidth
                sx={{
                  backgroundColor: "#fff9f5",
                  borderRadius: 1,
                }}
              />

              <TextField
                label="Description"
                name="description"
                value={data.description}
                onChange={handleChange}
                required
                multiline
                rows={3}
                variant="filled"
                fullWidth
                sx={{
                  backgroundColor: "#fff9f5",
                  borderRadius: 1,
                }}
              />

              <TextField
                label="Work Type"
                name="work"
                value={data.work}
                onChange={handleChange}
                required
                variant="filled"
                fullWidth
                sx={{
                  backgroundColor: "#fff9f5",
                  borderRadius: 1,
                }}
              />

              <TextField
                label="City"
                name="city"
                value={data.city}
                onChange={handleChange}
                required
                variant="filled"
                fullWidth
                sx={{
                  backgroundColor: "#fff9f5",
                  borderRadius: 1,
                }}
              />

              <TextField
                label="Phone Number"
                name="number"
                value={data.number}
                onChange={handleChange}
                required
                inputProps={{ pattern: "[0-9]{10}" }}
                variant="filled"
                fullWidth
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
                {loading ? <CircularProgress size={22} color="inherit" /> : "Select Supplier"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Request;
