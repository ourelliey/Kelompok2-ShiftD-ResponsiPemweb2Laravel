import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

export default function Penerima() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", address: "", needs: "" });

  const fetchRecipients = () => {
    setLoading(true);
    apiClient
      .get("/recipients")
      .then((res) => {
        if (res.data.success) {
          setRecipients(res.data.data);
        }
      })
      .catch((err) => console.error("Gagal mengambil data penerima:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await apiClient.post("/recipients", formData);
      if (response.data.success) {
        fetchRecipients();
        setShowModal(false);
        setFormData({ name: "", contact: "", address: "", needs: "" });
        alert("Penerima berhasil ditambahkan!");
      }
    } catch (err) {
      console.error("Gagal menambah penerima:", err.response?.data || err.message);
      alert("Gagal menyimpan data: " + (err.response?.data?.message || "Terjadi kesalahan pada server."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data penerima ini?")) {
      try {
        await apiClient.delete(`/recipients/${id}`);
        fetchRecipients();
      } catch (err) {
        alert("Gagal menghapus data penerima.");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Data Penerima</h1>
          <p>Kelola informasi data penerima manfaat donasi.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          + Tambah Penerima
        </button>
      </div>

      <div className="table-card" style={{ marginTop: "20px" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Penerima</th>
              <th>Kontak</th>
              <th>Kebutuhan</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>Memuat data...</td>
              </tr>
            ) : recipients.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>Belum ada data penerima</td>
              </tr>
            ) : (
              recipients.map((recipient, index) => (
                <tr key={recipient.id}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "600" }}>{recipient.name}</td>
                  <td>{recipient.contact}</td>
                  <td>{recipient.needs || "-"}</td>
                  <td>{recipient.address}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(recipient.id)}
                      style={{ color: "#dc2626", border: "none", background: "none", cursor: "pointer", fontWeight: "600" }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", width: "400px" }}>
            <h2 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "bold" }}>Tambah Penerima Baru</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Nama Penerima / Panti / Yayasan</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
                />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Kontak / No HP</label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
                />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Kebutuhan Barang (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Pakaian, Sembako, Buku"
                  value={formData.needs}
                  onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Alamat Lengkap</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: "8px 16px", border: "1px solid #ccc", borderRadius: "6px", background: "white", cursor: "pointer" }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: submitting ? "#93c5fd" : "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: submitting ? "not-allowed" : "pointer"
                  }}
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}