import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

export default function Penyaluran() {
  const [availableItems, setAvailableItems] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [itemsRes, recipientsRes] = await Promise.all([
        apiClient.get("/items?all=true"),
        apiClient.get("/recipients"),
      ]);

      if (itemsRes.data.success) {
        const rawItems = Array.isArray(itemsRes.data.data)
          ? itemsRes.data.data
          : itemsRes.data.data.data || [];

        // Ambil barang yang statusnya Tersedia
        const items = rawItems.filter(
          (item) => (item.status || "Tersedia").toLowerCase() === "tersedia"
        );
        setAvailableItems(items);
      }

      if (recipientsRes.data.success) {
        const rawRecipients = Array.isArray(recipientsRes.data.data)
          ? recipientsRes.data.data
          : recipientsRes.data.data.data || [];
        setRecipients(rawRecipients);
      }
    } catch (err) {
      console.error("Gagal mengambil data penyaluran:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItem || !selectedRecipient) {
      alert("Silakan pilih barang dan penerima terlebih dahulu!");
      return;
    }

    setSubmitting(true);

    try {
      const response = await apiClient.patch(`/items/${selectedItem}/distribute`, {
        recipient_id: selectedRecipient,
      });

      if (response.data.success) {
        alert("Barang berhasil disalurkan!");
        setSelectedItem("");
        setSelectedRecipient("");
        fetchData();
      }
    } catch (err) {
      console.error("Gagal menyalurkan barang:", err.response?.data || err.message);
      alert("Gagal menyalurkan barang: " + (err.response?.data?.message || "Terjadi kesalahan pada server."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>Penyaluran Barang</h1>
        <p>Proses bisnis penyaluran barang donasi ke penerima manfaat.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "20px" }}>
        {/* Form Penyaluran */}
        <div className="table-card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
            Form Penyaluran Donasi
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                Pilih Barang Donasi (Tersedia)
              </label>
              <select
                required
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
              >
                <option value="">-- Pilih Barang --</option>
                {availableItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} {item.donor?.name ? `(Dari: ${item.donor.name})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
                Pilih Penerima Manfaat
              </label>
              <select
                required
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
              >
                <option value="">-- Pilih Penerima --</option>
                {recipients.map((recipient) => (
                  <option key={recipient.id} value={recipient.id}>
                    {recipient.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting || availableItems.length === 0 || recipients.length === 0}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor:
                  submitting || availableItems.length === 0 || recipients.length === 0
                    ? "#93c5fd"
                    : "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor:
                  submitting || availableItems.length === 0 || recipients.length === 0
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {submitting ? "Memproses..." : "Proses Penyaluran Barang"}
            </button>
          </form>
        </div>

        {/* Ringkasan Barang Siap Salur */}
        <div className="table-card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
            Stok Barang Siap Disalurkan ({availableItems.length})
          </h2>

          {loading ? (
            <p style={{ color: "#6b7280" }}>Memuat daftar barang...</p>
          ) : availableItems.length === 0 ? (
            <p style={{ color: "#6b7280" }}>
              Belum ada barang berstatus "Tersedia". Silakan tambah barang terlebih dahulu dari menu <b>Barang</b>.
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {availableItems.map((item) => (
                <li
                  key={item.id}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #f3f4f6",
                    display: "flex",
                    justify: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong style={{ display: "block", fontSize: "14px" }}>{item.name}</strong>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                      Donatur: {item.donor?.name || "Anonim"}
                    </span>
                  </div>
                  <span
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Tersedia
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}