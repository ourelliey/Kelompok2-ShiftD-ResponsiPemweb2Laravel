import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

export default function Barang() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    donor_id: "",
    condition: "Sangat Baik",
    location: "Gudang Utama",
    status: "Tersedia",
  });

  // Ambil Data Barang, Kategori, Donatur dari API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Panggil endpoint /dashboard-stats & API pendukung yang dijamin mengembalikan data barang
      const [statsRes, catRes, donorRes] = await Promise.all([
        apiClient.get("/dashboard-stats"),
        apiClient.get("/categories").catch(() => ({ data: { data: [] } })),
        apiClient.get("/donors").catch(() => ({ data: { data: [] } })),
      ]);

      // 1. Set Items dari recent_items dashboard-stats
      if (statsRes.data?.success && statsRes.data?.data?.recent_items) {
        setItems(statsRes.data.data.recent_items);
      } else {
        // Fallback panggil /items biasa
        const itemsRes = await apiClient.get("/items");
        const rawItems = Array.isArray(itemsRes.data?.data)
          ? itemsRes.data.data
          : itemsRes.data?.data?.data || itemsRes.data || [];
        setItems(rawItems);
      }

      // 2. Set Kategori
      const rawCat = Array.isArray(catRes.data?.data)
        ? catRes.data.data
        : catRes.data?.data?.data || [];
      setCategories(rawCat);

      // 3. Set Donatur
      const rawDonors = Array.isArray(donorRes.data?.data)
        ? donorRes.data.data
        : donorRes.data?.data?.data || [];
      setDonors(rawDonors);

    } catch (err) {
      console.error("Gagal memuat data barang:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    fetchData();
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Pastikan category_id dan donor_id berformat integer / valid
    const payload = {
      name: formData.name,
      category_id: formData.category_id ? parseInt(formData.category_id) : (categories[0]?.id || 1),
      donor_id: formData.donor_id ? parseInt(formData.donor_id) : (donors[0]?.id || null),
      condition: formData.condition || "Sangat Baik",
      location: formData.location || "Gudang Utama",
      status: "Tersedia",
    };

    try {
      const response = await apiClient.post("/items", payload);
      if (response.data?.success || response.status === 201 || response.status === 200) {
        alert("Barang donasi berhasil ditambahkan!");
        setShowModal(false);
        setFormData({
          name: "",
          category_id: "",
          donor_id: "",
          condition: "Sangat Baik",
          location: "Gudang Utama",
          status: "Tersedia",
        });
        fetchData();
      }
    } catch (err) {
      console.error("Gagal menyimpan barang:", err.response?.data || err);
      alert(err.response?.data?.message || "Gagal menyimpan barang.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus barang ini?")) {
      try {
        await apiClient.delete(`/items/${id}`);
        fetchData();
      } catch (err) {
        alert("Gagal menghapus barang.");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Data Barang</h1>
          <p>Kelola data barang donasi yang tersedia.</p>
        </div>
        <button
          onClick={handleOpenModal}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Tambah Barang
        </button>
      </div>

      {/* Tabel Utama Data Barang */}
      <div className="table-card" style={{ marginTop: "20px" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Kategori</th>
              <th>Donatur</th>
              <th>Penerima</th>
              <th>Kondisi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>Memuat data...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>Belum ada data barang di database</td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "600" }}>{item.name}</td>
                  <td>{item.category?.name || "Pakaian"}</td>
                  <td>{item.donor?.name || "Anonim"}</td>
                  <td>{item.recipient?.name || "-"}</td>
                  <td>{item.condition || "Sangat Baik"}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: item.status === "Tersalurkan" ? "#d1fae5" : "#dbeafe",
                        color: item.status === "Tersalurkan" ? "#065f46" : "#1e40af",
                      }}
                    >
                      {item.status || "Tersedia"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
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

      {/* Modal Tambah Barang */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", width: "420px" }}>
            <h2 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "bold" }}>Tambah Barang Baru</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Nama Barang</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Kategori</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
                >
                  <option value="">-- Pilih Kategori --</option>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  ) : (
                    <>
                      <option value="1">Pakaian</option>
                      <option value="2">Buku</option>
                      <option value="3">Elektronik</option>
                      <option value="4">Sembako</option>
                    </>
                  )}
                </select>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Donatur (Opsional)</label>
                <select
                  value={formData.donor_id}
                  onChange={(e) => setFormData({ ...formData, donor_id: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
                >
                  <option value="">-- Pilih Donatur (Anonim) --</option>
                  {donors.length > 0 ? (
                    donors.map((donor) => (
                      <option key={donor.id} value={donor.id}>{donor.name}</option>
                    ))
                  ) : (
                    <option value="1">lula</option>
                  )}
                </select>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Kondisi</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}
                >
                  <option value="Baru">Baru</option>
                  <option value="Sangat Baik">Sangat Baik</option>
                  <option value="Layak Pakai">Layak Pakai</option>
                  <option value="Butuh Perbaikan">Butuh Perbaikan</option>
                </select>
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