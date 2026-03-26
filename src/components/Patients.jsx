import "./patients.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddPatientForm from "./AddPatientForm";
import { Navigate } from "react-router-dom";

const API_BASE = "";

/* Normalize MongoDB _id */
const getId = (user) => {
  if (!user) return "";
  const id = user._id;
  if (typeof id === "string") return id;
  if (id && typeof id === "object" && id.$oid) return id.$oid;
  if (id && typeof id.toString === "function") return id.toString();
  return String(id);
};

const Dashboard = () => {

  
  // 🔐 ROLE PROTECTION
    const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 ROLE PROTECTION
  if (!user || String(user.role || "").toLowerCase() === "doctor") {
    return <Navigate to="/" />;
  }


  const [isOpen, setIsOpen] = useState(false); // ✅ for modal

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    dateOfBirth: ""
  });



  /* 🔹 Fetch Users */
  const fetchUsers = async () => {
    setLoading(true);
    setFetchError("");

    const urls = [`${API_BASE}/api/users`, `${API_BASE}/data/users`];

    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;

        const data = await res.json();
        const list = Array.isArray(data) ? data : (data?.users || []);

        setUsers(list);
        setLoading(false);
        return;
      } catch (_) {
        continue;
      }
    }

    setFetchError("Could not load data.");
    setUsers([]);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* 🔹 Delete */
  const handleDelete = async (user) => {
    if (!window.confirm("Delete this user?")) return;

    const idStr = typeof user === "object"
      ? getId(user)
      : user?.toString?.() ?? user;

    try {
      await fetch(`${API_BASE}/api/users/${idStr}`, {
        method: "DELETE",
      });

      fetchUsers();
    } catch (e) {
      console.error(e);
      setFetchError("Delete failed.");
    }
  };

  /* 🔹 Edit */
  const handleEdit = (user) => {
    setEditingId(getId(user));

    setEditData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      city: user.city || "",
      state: user.state || "",
      dateOfBirth: user.dateOfBirth || ""
    });
  };

  /* 🔹 Update */
  const handleUpdate = async () => {
    try {
      const idStr = editingId?.toString?.() ?? editingId;

      await fetch(`${API_BASE}/api/users/${idStr}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData)
      });

      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main">
      

        <div className="dashboard-content">

          {/* 🔥 TOP BAR */}
          <div className="top-bar flex justify-between items-center">
            <h2>Registered Users</h2>

            <button
              onClick={() => setIsOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add Patient
            </button>
          </div>

          {/* ❌ Error */}
          {fetchError && (
            <p className="dashboard-error">
              {fetchError}
              <button onClick={fetchUsers}>Refresh</button>
            </p>
          )}

          {/* ⏳ Loading */}
          {loading && <p>Loading...</p>}

          {/* ✏️ Edit Form */}
          {editingId && (
            <div className="edit-box">
              <input
                placeholder="First name"
                value={editData.firstName}
                onChange={(e) =>
                  setEditData({ ...editData, firstName: e.target.value })
                }
              />

              <input
                placeholder="Last name"
                value={editData.lastName}
                onChange={(e) =>
                  setEditData({ ...editData, lastName: e.target.value })
                }
              />

              <input
                placeholder="Email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
              />

              <input
                placeholder="City"
                value={editData.city}
                onChange={(e) =>
                  setEditData({ ...editData, city: e.target.value })
                }
              />

              <input
                placeholder="State"
                value={editData.state}
                onChange={(e) =>
                  setEditData({ ...editData, state: e.target.value })
                }
              />

              <input
                type="date"
                value={editData.dateOfBirth}
                onChange={(e) =>
                  setEditData({ ...editData, dateOfBirth: e.target.value })
                }
              />

              <button onClick={handleUpdate}>Update</button>
            </div>
          )}

          {/* 📊 Table */}
          {!loading && (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>State</th>
                  <th>City</th>
                  <th>DOB</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={getId(user)}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.state}</td>
                    <td>{user.city}</td>
                    <td>{user.dateOfBirth}</td>

                    <td>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 📋 Add Patient Form */}
          <AddPatientForm
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;