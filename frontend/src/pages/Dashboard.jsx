import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_items: 0,
    total_available: 0,
    total_distributed: 0,
    total_donors: 0,
  });

  useEffect(() => {
    apiClient
      .get("/dashboard-stats")
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.data);
        }
      })
      .catch((err) => console.error("Gagal mengambil statistik dashboard:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Ringkasan aktivitas Sistem Donasi Barang.</p>
      </div>

      {/* Kartu Ringkasan Statistik */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginTop: "20px" }}>
        <div className="table-card" style={{ padding: "20px" }}>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>Total Barang</span>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0 0 0" }}>{stats.total_items}</h2>
        </div>
        <div className="table-card" style={{ padding: "20px" }}>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>Tersedia</span>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0 0 0", color: "#2563eb" }}>
            {stats.total_available}
          </h2>
        </div>
        <div className="table-card" style={{ padding: "20px" }}>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>Disalurkan</span>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0 0 0", color: "#059669" }}>
            {stats.total_distributed}
          </h2>
        </div>
        <div className="table-card" style={{ padding: "20px" }}>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>Donatur</span>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0 0 0" }}>{stats.total_donors}</h2>
        </div>
      </div>
    </div>
  );
}