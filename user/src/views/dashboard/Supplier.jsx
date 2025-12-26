import React, { useEffect, useState } from "react";
import axios from "axios";

function SupplierDashboard() {
  const [bookings, setBookings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("All");
  const [availableForce, setAvailableForce] = useState(0);

  // -------------------------
  // Fetch supplier info
  // -------------------------
  const fetchSupplierInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/profile/force",
        { withCredentials: true }
      );
      setAvailableForce(res.data.availableForce || 0);
    } catch (err) {
      console.error("Error fetching supplier info:", err);
    }
  };

  // -------------------------
  // Fetch bookings
  // -------------------------
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/requests",
        { withCredentials: true }
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // -------------------------
  // Fetch worker requests
  // -------------------------
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/requestsbyworker",
        { withCredentials: true }
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching worker requests:", err);
    }
  };


  const approveRequest = async (item) => {
    if (item.force && item.force > availableForce) {
      alert(`Cannot approve. Only ${availableForce} workers available.`);
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/bookings/${item._id}/approve`,
        {},
        { withCredentials: true }
      );

      alert(res.data.message);

      // Update available force dynamically
      if (res.data.availableForce !== undefined) {
        setAvailableForce(res.data.availableForce);
      }

      // Update status locally
      setBookings((prev) =>
        prev.map((b) =>
          b._id === item._id ? { ...b, status: "Approved" } : b
        )
      );
      setRequests((prev) =>
        prev.map((r) =>
          r._id === item._id ? { ...r, status: "Approved" } : r
        )
      );
    } catch (err) {
      console.error("Error approving request:", err);
      alert(err.response?.data?.message || "Failed to approve request.");
    }
  };

  // -------------------------
  // Initial load
  // -------------------------
  useEffect(() => {
    fetchSupplierInfo();
    fetchBookings();
    fetchRequests();
  }, []);

  // -------------------------
  // Filtered data
  // -------------------------
  const filteredBookings = bookings.filter(
    (b) => filter === "All" || b.status === filter
  );
  const filteredRequests = requests.filter(
    (r) => filter === "All" || r.status === filter
  );

  // -------------------------
  // Card styles
  // -------------------------
  const cardStyle = {
    flex: "0 1 300px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    margin: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  const approvedCardStyle = {
    ...cardStyle,
    backgroundColor: "#D4EDDA",
  };

  return (
    <div className="dashboard">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Welcome Supplier</h1>
        <strong>Total Available Force: {availableForce}</strong>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label>Filter Requests: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Requests</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      {/* Worker-Booking Requests */}
      <h2 style={{ textAlign: "center" }}>Requests for Worker-Booking</h2>
      {filteredBookings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No bookings found</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredBookings.map((booking) => (
            <li
              key={booking._id}
              style={
                booking.status === "Approved" ? approvedCardStyle : cardStyle
              }
            >
              <div>
                <strong>From:</strong> {booking.userId?.name || "Unknown"}
              </div>
              <div>
                <strong>Detail:</strong> {booking.description}
              </div>
              <div>
                <strong>Work:</strong> {booking.work}
              </div>
              <div>
                <strong>Force:</strong> {booking.force}
              </div>
              <div>
                <strong>City:</strong> {booking.city}
              </div>
              <div>
                <strong>Status:</strong> {booking.status}
              </div>
              <div>
                <strong>Requested on:</strong>{" "}
                {new Date(booking.createdAt).toLocaleString()}
              </div>
              {booking.status === "Pending" && (
                <button
                  onClick={() => approveRequest(booking)}
                  disabled={booking.force > availableForce}
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Worker Requests */}
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        Requests From Workers to Join
      </h2>
      {filteredRequests.length === 0 ? (
        <p style={{ textAlign: "center" }}>No requests found</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredRequests.map((request) => (
            <li
              key={request._id}
              style={
                request.status === "Approved" ? approvedCardStyle : cardStyle
              }
            >
              <div>
                <strong>From:</strong> {request.userId?.name || "Unknown"}
              </div>
              <div>
                <strong>Detail:</strong> {request.description}
              </div>
              <div>
                <strong>Work:</strong> {request.work}
              </div>
              <div>
                <strong>Status:</strong> {request.status}
              </div>
              <div>
                <strong>Requested on:</strong>{" "}
                {new Date(request.createdAt).toLocaleString()}
              </div>
              {request.status === "Pending" && (
                <button
                  onClick={() => approveRequest(request)}
                  disabled={availableForce <= 0}
                >
                  Add
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SupplierDashboard;
