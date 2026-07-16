import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

function Register() {
  const [role, setRole] = useState("");
  const [data, setData] = useState({
    email: "",
    name: "",
    license: "",
    age: "",
    force: "",
    work: "",
    number: "",
    password: "",
  });

  const navigate = useNavigate();
  const colorPrimary = "#604652";
  const colorSecondary = "#C9B194";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!role) return alert("Please select a role");
    if (!data.email || !data.name || !data.password) return alert("Please fill in email, name, and password");
    if (role === "Worker" && !data.age) return alert("Please enter your age");
    if (role === "Supplier" && !data.force) return alert("Please enter your force");

    const requestData = {
      ...data,
      license: data.license || "",
      age: data.age ? data.age.toString() : "",
      force: data.force ? data.force.toString() : "",
      role,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/users/register`, requestData);
      alert("Registration successful!");
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 3,
        backgroundColor: "#fff9f5",
        borderRadius: 3,
        boxShadow: 6,
        fontFamily: "var(--font-mono)",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: colorPrimary, fontWeight: "bold" }}>
        Create Your Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Register As</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Worker">Worker</MenuItem>
            <MenuItem value="Contractor">Contractor</MenuItem>
            <MenuItem value="Supplier">Supplier</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="License Number"
          name="license"
          value={data.license}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        {role === "Worker" && (
          <TextField
            label="Age"
            name="age"
            type="number"
            value={data.age}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        )}
        {role === "Supplier" && (
          <TextField
            label="Force"
            name="force"
            type="number"
            value={data.force}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        )}
        <TextField
          label="Work Type"
          name="work"
          value={data.work}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone Number"
          name="number"
          value={data.number}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: colorPrimary,
            "&:hover": { backgroundColor: colorSecondary },
            fontWeight: 600,
          }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
}

export default Register;
