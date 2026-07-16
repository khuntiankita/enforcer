// src/views/SupplierList.jsx
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Grow,
  Fade,
} from "@mui/material";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../config";

const SupplierList = () => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();
  const initialData = useMemo(() => location.state || {}, [location.state]);

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const colorPrimary = "#604652";
  const colorSecondary = "#C9B194";

  // Ensure initialData has default values
  const data = {
    name: initialData.name || "",
    description: initialData.description || "",
    force: initialData.force || "",
    work: initialData.work || "",
    city: initialData.city || "",
    duration: initialData.duration || "",
    fromDate: initialData.fromDate || "",
    toDate: initialData.toDate || "",
    number: initialData.number || "",
  };

  useEffect(() => {
    // Fetch all suppliers without filtering
    fetch(`${API_BASE_URL}/api/users/suppliers`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error("Failed to fetch suppliers", err));
  }, []);

  const handleRequest = (supplier) => {
    if (!user) {
      alert("Please log in to make a request.");
      return;
    }
    setSelectedSupplier(supplier);
  };

  const sendRequest = async () => {
    if (!selectedSupplier || !user) return;

    try {
      const endpoint = user.role === "Worker" ? "requesttosupplier" : "book";

      const postData = {
        supplierId: selectedSupplier._id,
        name: data.name,
        description: data.description,
        force: data.force,
        work: data.work,
        city: data.city,
        duration: data.duration,
        fromDate: data.fromDate,
        toDate: data.toDate,
        number: data.number,
      };

      if (user.role === "Worker") {
        delete postData.force;
        delete postData.duration;
        delete postData.fromDate;
        delete postData.toDate;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/bookings/${endpoint}`,
        postData,
        { withCredentials: true }
      );

      alert(response.data.message || "Request sent successfully!");
      setSelectedSupplier(null);
    } catch (err) {
      console.error("Booking request failed:", err);
      alert(err.response?.data?.message || "Failed to send request.");
    }
  };

  if (isLoading) return <p>Checking login status...</p>;

  return (
    <Box sx={{ py: 6, backgroundColor: "#fff9f5", minHeight: "100vh" }}>
      <Container>
        <Fade in timeout={1000}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: colorPrimary, textAlign: "center", mb: 6 }}>
            Available Suppliers
          </Typography>
        </Fade>

        {user && (
          <Typography variant="h6" sx={{ color: colorPrimary, textAlign: "center", mb: 4 }}>
            <b>{user.name}</b>, select a supplier for your work
          </Typography>
        )}

        {suppliers.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: colorPrimary }}>No suppliers found.</Typography>
        ) : (
          <Grid container spacing={4}>
            {suppliers.map((supplier, index) => (
              <Grid item xs={12} sm={6} md={4} key={supplier._id}>
                <Grow in timeout={500 + index * 200}>
                  <Card
                    sx={{
                      p: 2,
                      textAlign: "center",
                      backgroundColor: "#fff3e6",
                      "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold", color: colorPrimary, mb: 1 }}>
                        {supplier.name}
                      </Typography>
                      <Typography sx={{ color: colorSecondary, mb: 2 }}>
                        Force: {supplier.force || 0}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: colorPrimary,
                          "&:hover": { backgroundColor: colorSecondary, transform: "scale(1.05)" },
                          color: "#fff",
                        }}
                        onClick={() => handleRequest(supplier)}
                        disabled={!user}
                      >
                        Request
                      </Button>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedSupplier && (
          <Box
            sx={{
              mt: 6,
              p: 3,
              backgroundColor: "#fff3e6",
              borderRadius: 2,
              boxShadow: 6,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", color: colorPrimary, textAlign: "center", mb: 2 }}>
              Request to {selectedSupplier.name}
            </Typography>

            <Box component="ul" sx={{ listStyle: "none", p: 0, lineHeight: 2 }}>
              <li><b>Name:</b> {data.name}</li>
              <li><b>Description:</b> {data.description}</li>
              {user.role !== "Worker" && <li><b>Force:</b> {data.force}</li>}
              <li><b>Work:</b> {data.work}</li>
              <li><b>Mobile:</b> {data.number}</li>
              <li><b>City:</b> {data.city}</li>
              {user.role !== "Worker" && (
                <>
                  <li><b>Duration:</b> {data.duration}</li>
                  {data.duration === "Custom" && (
                    <>
                      <li><b>From:</b> {data.fromDate}</li>
                      <li><b>To:</b> {data.toDate}</li>
                    </>
                  )}
                </>
              )}
            </Box>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colorPrimary,
                  "&:hover": { backgroundColor: colorSecondary, transform: "scale(1.05)" },
                  color: "#fff",
                }}
                onClick={sendRequest}
              >
                Send Request
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SupplierList;
