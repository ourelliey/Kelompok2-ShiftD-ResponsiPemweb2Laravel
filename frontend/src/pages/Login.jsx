import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await apiClient.post("/login", { email, password });
      
      if (response.data.success || response.status === 200) {
        // Simpan token dan data user ke localStorage
        localStorage.setItem("token", response.data.token || "logged_in");
        localStorage.setItem("user", JSON.stringify(response.data.user || { name: "Admin" }));

        // Arahkan ke Halaman Dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login gagal:", err);
      setErrorMsg(err.response?.data?.message || "Login gagal. Periksa email dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f3f4f6"
    }}>
      <div style={{
        backgroundColor: "white", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", width: "360px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>DonasiKita</h2>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Masuk ke Sistem Donasi Barang</p>
        </div>

        {errorMsg && (
          <div style={{ padding: "10px", backgroundColor: "#fee2e2", color: "#991b1b", borderRadius: "6px", fontSize: "13px", marginBottom: "16px" }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>Email</label>
            <input
              type="email"
              required
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "10px", backgroundColor: loading ? "#93c5fd" : "#2563eb",
              color: "white", border: "none", borderRadius: "6px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}