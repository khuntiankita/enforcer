import React, { useEffect, useState } from "react";
import { Box, Typography, Button, MenuItem, Select, Card, CardContent } from "@mui/material";
import axios from "axios";

function ContractorDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/requested", {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching contractor bookings:", err);
        alert(err.response?.data?.message || "Failed to load bookings.");
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => (filter === "All" ? true : booking.status === filter));

  const colorPrimary = "#604652";
  const colorApproved = "#D4EDDA";
  const colorPending = "#F8D7DA";

  const cardStyle = {
    width: 300,
    borderRadius: 3,
    boxShadow: 3,
    transition: "transform 0.2s",
    "&:hover": { transform: "scale(1.03)" },
    display: "flex",
    flexDirection: "column",
    gap: 1,
    padding: "12px",
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#fff9f5", fontFamily: "var(--font-mono)" }}>
      <Typography variant="h3" sx={{ textAlign: "center", color: colorPrimary, mb: 3 }}>
        Contractor Dashboard
      </Typography>

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h5">Your Booking Requests</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            minWidth: 150,
            backgroundColor: "#fff",
            borderRadius: 1,
            boxShadow: 1,
            "& .MuiSelect-select": { py: 1 },
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
        </Select>
      </Box>

      {filteredBookings.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 5, color: "#666" }}>No bookings found</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
          {filteredBookings.map((booking) => (
            <Card
              key={booking._id}
              sx={{
                ...cardStyle,
                backgroundColor: booking.status === "Approved" ? colorApproved : colorPending,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: colorPrimary, mb: 1 }}>
                  Supplier: {booking.supplierId?.name || "Unknown"}
                </Typography>
                <Typography><strong>Work:</strong> {booking.work}</Typography>
                <Typography><strong>Detail:</strong> {booking.description}</Typography>
                <Typography><strong>Force:</strong> {booking.force}</Typography>
                <Typography><strong>City:</strong> {booking.city}</Typography>
                <Typography><strong>Duration:</strong> {booking.duration}</Typography>
                <Typography>
                  <strong>From:</strong> {booking.fromDate ? new Date(booking.fromDate).toLocaleDateString() : "-"}
                </Typography>
                <Typography>
                  <strong>To:</strong> {booking.toDate ? new Date(booking.toDate).toLocaleDateString() : "-"}
                </Typography>
                <Typography><strong>Status:</strong> {booking.status}</Typography>
                <Typography sx={{ fontSize: 12, color: "#555" }}>
                  Requested on: {new Date(booking.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ContractorDashboard;
