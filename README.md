# DonasiKita

> **Sistem Manajemen Donasi Barang**

---

## 📌 Informasi Kelompok

* **Nomor Kelompok:** Kelompok 02
* **Shift Praktikum:** Shift D

---

## 👥 Anggota Kelompok

| No | Nama Lengkap | NIM | Shift Awal | Shift Akhir | Jobdesk / Kontribusi | Link Video Penjelasan |
|---|---|---|---|---|---|---|
| 1 | Ahmadin | H1H0240 | Shift A | Shift D | **Database Architect & Business Logic**: Perancangan Schema Database, Migrations, Foreign Key Constraints, Eloquent Model Relations, & Logic Status Penyaluran. | [YouTube/Drive](https://...) |
| 2 | Lula Khaisha Delavia | H1H024064 | Shift D | Shift D | **Backend Integrator & DevOps Engineer**: Penyesuaian Laravel RESTful API Payload, Build Pipeline Integration, Nginx URL Rewrite, & Live Deployment aaPanel. | [YouTube]([https://...](https://youtu.be/N_Wcv_fo7hk?si=BX2RXBY435BN4oQn) |
| 3 | [Aurel] | [H1H0240] | [Shift Awal] | [Shift Akhir] | **Frontend Developer**: React SPA Architecture, React Router Routing, State Management (Hooks), Form/Table UI Components, & Axios Handling. | [YouTube/Drive](https://...) |


---

## 📖 Deskripsi Aplikasi

**DonasiKita** adalah aplikasi pengelolaan donasi barang berbasis web yang dirancang untuk mempermudah pencatatan, pengelompokan, dan penyaluran barang donasi secara transparan dan efisien[cite: 1]. Aplikasi ini menyelesaikan kendala pendataan manual barang donasi dari donatur hingga tersampaikan kepada penerima manfaat dengan dukungan sistem status barang terintegrasi secara *real-time*[cite: 1, 2].

---
---

## 📑 API Documentation

Seluruh endpoint backend mengikuti arsitektur **RESTful API** dan mengembalikan format respon JSON yang konsisten.

| Method | Endpoint | Keterangan / Fungsi | Auth Required |
|:---:|---|---|:---:|
| `POST` | `/api/login` | Otentikasi Admin & Penerbitan Bearer Token Sanctum | ❌ No |
| `POST` | `/api/logout` | Revokasi / Penghapusan Token Sanctum Admin | 🔑 Yes |
| `GET` | `/api/items` | Mengambil daftar barang donasi (Mendukung Pagination & Search/Filter) | 🔑 Yes |
| `POST` | `/api/items` | Menambahkan data barang donasi baru (Default Status: `Tersedia`) | 🔑 Yes |
| `GET` | `/api/items/{id}` | Mengambil detail spesifik satu barang donasi | 🔑 Yes |
| `PUT` | `/api/items/{id}` | Memperbarui informasi data barang donasi | 🔑 Yes |
| `DELETE` | `/api/items/{id}` | Menghapus data barang donasi (Cascade Constraint) | 🔑 Yes |
| `PATCH` | `/api/items/{id}/distribute` | Memproses transaksi penyaluran & mengubah status menjadi `Tersalurkan` | 🔑 Yes |
| `GET` | `/api/categories` | Mengambil seluruh data master kategori barang | 🔑 Yes |
| `GET` | `/api/donors` | Mengambil seluruh data master donatur | 🔑 Yes |
| `GET` | `/api/recipients` | Mengambil seluruh data master penerima manfaat | 🔑 Yes |
| `GET` | `/api/dashboard-stats` | Mengambil statistik total barang, donatur, dan penyaluran untuk Dashboard | 🔑 Yes |

---

## ⚙️ Penjelasan Teknis

### 1. Teknologi (Tech Stack)

* **Backend:** Laravel 13 API (PHP 8.2+)[cite: 1]
* **Frontend:** React SPA (Vite, JavaScript, Tailwind CSS / React Router, Axios)[cite: 1]
* **Database:** MySQL[cite: 1]
* **Deployment & Server:** aaPanel Cloud Hosting, Nginx Web Server[cite: 1]

### 2. Fitur Utama & Modul

* **Autentikasi:** Login Admin & Manajemen Akses Token API (Kredensial Admin: `donasibareng@gmail.com` / `donasibarang123`).
* **Modul Kategori & Donatur:** Manajemen data kategori barang dan pendataan profil donatur pemberi donasi[cite: 1].
* **Modul Kelola Barang:** Pencatatan detail barang donasi, upload media, dan pelabelan status ketersediaan barang (`Tersedia` / `Tersalurkan`)[cite: 1, 2].
* **Modul Penyaluran Donasi:** Alokasi penyaluran barang dari stok yang tersedia kepada penerima manfaat secara otomatis[cite: 1, 2].
* **Dashboard Analytics:** Visualisasi total data statistik barang, donatur, penerima manfaat, dan status transaksi penyaluran.

### 3. Skema Data Singkat

* `categories` (1 : N) `items`[cite: 1]
* `donors` (1 : N) `items`[cite: 1]
* `recipients` (1 : N) `distributions` / `penyaluran`[cite: 1]
* `items` (1 : 1) `distributions` (Penanganan transaksi status penyaluran barang)[cite: 1]

---

## 🚀 Panduan Instalasi Lokal

```bash
# Clone repository
git clone https://github.com/ourelliey/Kelompok2-ShiftD-ResponsiPemweb2Laravel.git
cd Kelompok2-ShiftD-ResponsiPemweb2Laravel

# Setup Backend Laravel
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Konfigurasi database MySQL pada file .env, lalu migrasi & seed
php artisan migrate --seed

# Setup Frontend React
cd ../frontend
npm install
npm run dev

# Jalankan server Laravel (pada direktori backend)
php artisan serve

```
