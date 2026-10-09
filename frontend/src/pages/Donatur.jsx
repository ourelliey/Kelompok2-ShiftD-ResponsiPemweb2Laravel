import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

export default function Donatur() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", address: "" });

  const fetchDonors = () => {
    setLoading(true);
    apiClient
      .get("/donors")
      .then((res) => {
        if (res.data.success) {
          setDonors(res.data.data);
        }
      })
      .catch((err) => console.error("Gagal mengambil data donatur:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await apiClient.post("/donors", formData);
      if (response.data.success) {
        fetchDonors();
        setShowModal(false);
        setFormData({ name: "", contact: "", address: "" });
        alert("Donatur berhasil ditambahkan!");
      }
    } catch (err) {
      console.error("Gagal menambah donatur:", err.response?.data || err.message);
      alert("Gagal menyimpan data: " + (err.response?.data?.message || "Cek terminal/console backend."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus donatur ini?")) {
      try {
        await apiClient.delete(`/donors/${id}`);
        fetchDonors();
      } catch (err) {
        alert("Gagal menghapus donatur.");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Data Donatur</h1>
          <p>Kelola informasi data donatur barang.</p>
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
          + Tambah Donatur
        </button>
      </div>

      {/* Tabel Donatur */}
      <div className="table-card" style={{ marginTop: "20px" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Donatur</th>
              <th>Kontak / No HP</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>Memuat data...</td>
              </tr>
            ) : donors.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>Belum ada data donatur</td>
              </tr>
            ) : (
              donors.map((donor, index) => (
                <tr key={donor.id}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "600" }}>{donor.name}</td>
                  <td>{donor.contact}</td>
                  <td>{donor.address}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(donor.id)}
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

      {/* Modal Form Tambah Donatur */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", width: "400px" }}>
            <h2 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "bold" }}>Tambah Donatur Baru</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Nama Donatur</label>
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
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Alamat</label>
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