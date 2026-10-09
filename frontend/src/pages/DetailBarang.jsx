import { useEffect, useState } from "react";
import { ArrowLeft, Package, User, Tag, Hash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function DetailBarang() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [barang, setBarang] = useState(null);

  useEffect(() => {
    const barangList =
      JSON.parse(localStorage.getItem("barangList")) || [];

    const selectedBarang = barangList.find(
      (item) => item.id === Number(id)
    );

    setBarang(selectedBarang);
  }, [id]);

  if (!barang) {
    return (
      <div className="detail-page">
        <div className="empty-detail">
          <h2>Barang tidak ditemukan</h2>
          <p>
            Data barang yang kamu cari tidak tersedia.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/barang")}
          >
            <ArrowLeft size={18} />
            Kembali ke Barang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="page-heading">
        <div>
          <h2>Detail Barang</h2>
          <p>
            Informasi lengkap mengenai barang donasi.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/barang")}
        >
          <ArrowLeft size={18} />
          Kembali
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-icon">
            <Package size={32} />
          </div>

          <div>
            <h3>{barang.nama}</h3>

            <span
              className={
                barang.status === "Tersedia"
                  ? "status status-available"
                  : "status status-distributed"
              }
            >
              {barang.status}
            </span>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-item-icon">
              <Tag size={18} />
            </div>

            <div>
              <span>Kategori</span>
              <strong>{barang.kategori}</strong>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-item-icon">
              <User size={18} />
            </div>

            <div>
              <span>Donatur</span>
              <strong>{barang.donatur}</strong>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-item-icon">
              <Hash size={18} />
            </div>

            <div>
              <span>Jumlah</span>
              <strong>{barang.jumlah}</strong>
            </div>
          </div>
        </div>

        <div className="detail-description">
          <h4>Deskripsi</h4>

          <p>
            {barang.deskripsi ||
              "Tidak ada deskripsi untuk barang ini."}
          </p>
        </div>

        <div className="detail-actions">
          <button
            className="secondary-button"
            onClick={() => navigate("/barang")}
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          <button
            className="primary-button"
            onClick={() =>
              navigate(`/barang/edit/${barang.id}`)
            }
          >
            Edit Barang
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailBarang;