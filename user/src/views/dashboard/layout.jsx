import React, { useEffect, useState, useContext } from "react";
import { Link as MuiLink, CircularProgress } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    password: "",
    role: "User",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      redirectToDashboard(user.role);
    }
  }, [user, navigate]);

  const redirectToDashboard = (role) => {
    switch (role) {
      case "Contractor":
        navigate("/contractorDashboard");
        break;
      case "Worker":
        navigate("/workerDashboard");
        break;
      case "Supplier":
        navigate("/supplierDashboard");
        break;
      case "User":
        navigate("/userDashboard");
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
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookie-based auth
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setLoading(false);

      if (!res.ok || !result.success) {
        alert(result.message || "Login failed");
        return;
      }

      // Save user in global context
      const loggedInUser = {
        _id: result._id,
        name: result.name,
        role: result.role,
      };
      setUser(loggedInUser);
      redirectToDashboard(result.role);

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again later.");
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>You are already logged in as {user.role}</h3>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>
          Role:
          <select name="role" value={data.role} onChange={handleChange} required>
            <option value="User">User</option>
            <option value="Worker">Worker</option>
            <option value="Contractor">Contractor</option>
            <option value="Supplier">Supplier</option>
          </select>
        </label>
        <br /><br />

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </label>
        <br /><br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </label>
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Login"}
        </button>
      </form>

      <div style={{ marginTop: "16px" }}>
        <MuiLink component={RouterLink} to="/register">
          Don’t have an account? Register here
        </MuiLink>
      </div>
    </div>
  );
}

export default Dashboard;
