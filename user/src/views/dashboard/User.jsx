import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, Card, CardContent, FormControl } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../../config";

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/bookings/requested`, {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching user bookings:", err);
        alert(err.response?.data?.message || "Failed to load bookings.");
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => (filter === "All" ? true : booking.status === filter));

  const colorPrimary = "#604652";
  const colorApproved = "#D4EDDA";
  const colorPending = "#F8D7DA";

  return (
    <Box sx={{ minHeight: "100vh", p: 3, backgroundColor: "#fff9f5", fontFamily: "var(--font-mono)" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: colorPrimary }}>
        User Dashboard
      </Typography>

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
                  <strong>Force:</strong> {booking.force}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>City:</strong> {booking.city}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Duration:</strong> {booking.duration}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Status:</strong> {booking.status}
                </Typography>
                <Typography variant="body2" color="#555" sx={{ fontSize: 12 }}>
                  Requested on: {new Date(booking.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}

export default UserDashboard;
