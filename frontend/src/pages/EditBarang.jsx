import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function EditBarang() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    donatur: "",
    jumlah: "",
    deskripsi: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const barangList =
      JSON.parse(localStorage.getItem("barangList")) || [];

    const barang = barangList.find(
      (item) => item.id === Number(id)
    );

    if (!barang) {
      navigate("/barang");
      return;
    }

    setForm({
      nama: barang.nama || "",
      kategori: barang.kategori || "",
      donatur: barang.donatur || "",
      jumlah: barang.jumlah || "",
      deskripsi: barang.deskripsi || "",
    });
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nama.trim()) {
      newErrors.nama = "Nama barang wajib diisi.";
    }

    if (!form.kategori) {
      newErrors.kategori = "Kategori wajib dipilih.";
    }

    if (!form.donatur.trim()) {
      newErrors.donatur = "Nama donatur wajib diisi.";
    }

    if (!form.jumlah) {
      newErrors.jumlah = "Jumlah wajib diisi.";
    } else if (Number(form.jumlah) <= 0) {
      newErrors.jumlah =
        "Jumlah harus lebih besar dari 0.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const barangList =
      JSON.parse(localStorage.getItem("barangList")) || [];

    const updatedBarangList = barangList.map((barang) => {
      if (barang.id === Number(id)) {
        return {
          ...barang,
          nama: form.nama.trim(),
          kategori: form.kategori,
          donatur: form.donatur.trim(),
          jumlah: Number(form.jumlah),
          deskripsi: form.deskripsi.trim(),
        };
      }

      return barang;
    });

    localStorage.setItem(
      "barangList",
      JSON.stringify(updatedBarangList)
    );

    navigate("/barang");
  };

  return (
    <div className="form-page">
      <div className="page-heading">
        <div>
          <h2>Edit Barang</h2>
          <p>
            Perbarui informasi barang donasi.
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

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Informasi Barang</h3>
            <p>
              Perbarui informasi barang yang dipilih.
            </p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nama">
                Nama Barang <span>*</span>
              </label>

              <input
                id="nama"
                name="nama"
                type="text"
                value={form.nama}
                onChange={handleChange}
              />

              {errors.nama && (
                <small className="error-message">
                  {errors.nama}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="kategori">
                Kategori <span>*</span>
              </label>

              <select
                id="kategori"
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
              >
                <option value="">
                  Pilih kategori
                </option>
                <option value="Pakaian">
                  Pakaian
                </option>
                <option value="Buku">
                  Buku
                </option>
                <option value="Sepatu">
                  Sepatu
                </option>
                <option value="Tas">
                  Tas
                </option>
                <option value="Elektronik">
                  Elektronik
                </option>
                <option value="Lainnya">
                  Lainnya
                </option>
              </select>

              {errors.kategori && (
                <small className="error-message">
                  {errors.kategori}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="donatur">
                Donatur <span>*</span>
              </label>

              <input
                id="donatur"
                name="donatur"
                type="text"
                value={form.donatur}
                onChange={handleChange}
              />

              {errors.donatur && (
                <small className="error-message">
                  {errors.donatur}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="jumlah">
                Jumlah <span>*</span>
              </label>

              <input
                id="jumlah"
                name="jumlah"
                type="number"
                min="1"
                value={form.jumlah}
                onChange={handleChange}
              />

              {errors.jumlah && (
                <small className="error-message">
                  {errors.jumlah}
                </small>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="deskripsi">
              Deskripsi
            </label>

            <textarea
              id="deskripsi"
              name="deskripsi"
              rows="5"
              value={form.deskripsi}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/barang")}
            >
              Batal
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              <Save size={18} />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBarang;