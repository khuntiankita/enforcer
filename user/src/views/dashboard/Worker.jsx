import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Select, MenuItem, Card, CardContent, Button, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

function Worker() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/requestedtosupplier", {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching Worker bookings:", err);
        alert(err.response?.data?.message || "Failed to load bookings.");
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "All") return true;
    return booking.status === filter;
  });

  const colorPrimary = "#604652";
  const colorApproved = "#D4EDDA";
  const colorPending = "#F8D7DA";

  return (
    <Box sx={{ minHeight: "100vh", p: 3, backgroundColor: "#fff9f5", fontFamily: "var(--font-mono)" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: colorPrimary }}>
        Welcome Worker
      </Typography>

      {/* Filter */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4, gap: 2, alignItems: "center" }}>
        <Typography variant="h6">Filter Bookings:</Typography>
        <FormControl variant="outlined" sx={{ minWidth: 150, backgroundColor: "#fff9f5", borderRadius: 1 }}>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Bookings */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {filteredBookings.length === 0 ? (
          <Typography sx={{ color: "#555" }}>No bookings found.</Typography>
        ) : (
          filteredBookings.map((booking) => (
            <Card
              key={booking._id}
              sx={{
                width: 300,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: booking.status === "Approved" ? colorApproved : colorPending,
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                  Supplier: {booking.supplierId?.name || "Unknown"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Work:</strong> {booking.work}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Detail:</strong> {booking.description}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Status:</strong> {booking.status}
                </Typography>
                <Typography variant="body2" color="#555">
                  <strong>Requested on:</strong> {new Date(booking.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Request Button */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" sx={{ mb: 2, color: colorPrimary }}>
          Request a Supplier
        </Typography>
        <Button
          component={RouterLink}
          to="/Request"
          variant="contained"
          sx={{
            backgroundColor: colorPrimary,
            "&:hover": { backgroundColor: "#C9B194" },
            color: "#fff",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          Request
        </Button>
      </Box>
    </Box>
  );
}

export default Worker;
