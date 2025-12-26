// src/views/Book.jsx
import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Fade,
  Grow,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Book = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    force: "",
    work: "",
    city: "",
    duration: "",
    fromDate: "",
    toDate: "",
    number: "",
  });

  const colorPrimary = "#604652";
  const colorSecondary = "#C9B194";
  const bgColor = "#fff9f5";

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to make a booking!");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.name || !data.description || !data.work || !data.number) {
      alert("Please fill all required fields.");
      return;
    }

    navigate("/SupplierList", { state: data });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${bgColor} 30%, #fff3e6 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        fontFamily: "var(--font-mono)",
      }}
    >
      <Fade in timeout={800}>
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: 6,
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
                Book Labour for Your Work
              </Typography>
            </Grow>

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
                sx={{ backgroundColor: "#fff9f5", borderRadius: 1 }}
              />

              <TextField
                label="Work Description"
                name="description"
                value={data.description}
                onChange={handleChange}
                multiline
                rows={3}
                required
                variant="filled"
                fullWidth
                sx={{ backgroundColor: "#fff9f5", borderRadius: 1 }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Force (No. of Workers)"
                    name="force"
                    type="number"
                    value={data.force}
                    onChange={handleChange}
                    variant="filled"
                    fullWidth
                    sx={{ backgroundColor: "#fff9f5", borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Work Type"
                    name="work"
                    value={data.work}
                    onChange={handleChange}
                    required
                    variant="filled"
                    fullWidth
                    sx={{ backgroundColor: "#fff9f5", borderRadius: 1 }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mobile Number"
                    name="number"
                    value={data.number}
                    onChange={handleChange}
                    required
                    inputProps={{ pattern: "[0-9]{10}" }}
                    variant="filled"
                    fullWidth
                    sx={{ backgroundColor: "#fff9f5", borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    variant="filled"
                    fullWidth
                    sx={{ backgroundColor: "#fff9f5", borderRadius: 1 }}
                  />
                </Grid>
              </Grid>

              <TextField
                select
                label="Duration"
                name="duration"
                value={data.duration}
                onChange={handleChange}
                variant="filled"
                fullWidth
                sx={{ backgroundColor: "#fff9f5", borderRadius: 1 }}
              >
                <MenuItem value="">Select Duration</MenuItem>
                <MenuItem value="1Week">1 Week</MenuItem>
                <MenuItem value="1Month">1 Month</MenuItem>
                <MenuItem value="Custom">Custom</MenuItem>
              </TextField>

              {data.duration === "Custom" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="From Date"
                      name="fromDate"
                      type="date"
                      value={data.fromDate}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="filled"
                      fullWidth
                      sx={{ backgroundColor: "#fff9f5", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="To Date"
                      name="toDate"
                      type="date"
                      value={data.toDate}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="filled"
                      fullWidth
                      sx={{ backgroundColor: "#fff9f5", borderRadius: 1 }}
                    />
                  </Grid>
                </Grid>
              )}

              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: colorPrimary,
                    "&:hover": {
                      backgroundColor: colorSecondary,
                      transform: "scale(1.05)",
                    },
                    color: "#fff",
                    px: 4,
                    py: 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  Select Supplier
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Book;
