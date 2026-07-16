import React, { useEffect, useState, useContext } from "react";
import { CircularProgress, Box, TextField, Button, Typography } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

function UpdateProfile() {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    age: "",
    work: "",
    force: "",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.message || "Failed to fetch profile");
          return;
        }

        setFormData({
          name: data.name || "",
          email: data.email || "",
          password: "",
          number: data.number || "",
          age: data.age || "",
          work: data.work || "",
          force: data.force || "",
        });

        setInitialLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Error fetching profile.");
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(result.message || "Update failed");
        return;
      }

      alert("Profile updated successfully");
      setUser((prev) => ({ ...prev, name: result.name }));
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Server error. Try again.");
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#fff9f5",
        fontFamily: "var(--font-mono)",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#604652" }}>
        Update Your Profile
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          variant="filled"
          sx={{ backgroundColor: "#F5F5F0", borderRadius: 1 }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          variant="filled"
          sx={{ backgroundColor: "#F5F5F0", borderRadius: 1 }}
        />
        <TextField
          label="New Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current"
          fullWidth
          variant="filled"
          sx={{ backgroundColor: "#F5F5F0", borderRadius: 1 }}
        />
        <TextField
          label="Phone Number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          fullWidth
          variant="filled"
          sx={{ backgroundColor: "#F5F5F0", borderRadius: 1 }}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          variant="filled"
          sx={{ backgroundColor: "#F5F5F0", borderRadius: 1 }}
        />
        <TextField
          label="Work"
          name="work"
          value={formData.work}
          onChange={handleChange}
          fullWidth
          variant="filled"
          sx={{ backgroundColor: "#F5F5F0", borderRadius: 1 }}
        />
        <TextField
          label="Force"
          name="force"
          value={formData.force}
          onChange={handleChange}
          fullWidth
          variant="filled"
          sx={{ backgroundColor: "#F5F5F0", borderRadius: 1 }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            mt: 2,
            backgroundColor: "#604652",
            "&:hover": { backgroundColor: "#C9B194" },
            color: "#fff",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : "Update Profile"}
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateProfile;
