import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

// Modul Auth
import Login from "./pages/Login";
import Register from "./pages/Register";

// Modul Dashboard
import Dashboard from "./pages/Dashboard";

// Modul Barang
import Barang from "./pages/Barang";
import TambahBarang from "./pages/TambahBarang";
import EditBarang from "./pages/EditBarang";
import DetailBarang from "./pages/DetailBarang";

// Modul Donatur
import Donatur from "./pages/Donatur";

// Modul Penerima
import Penerima from "./pages/Penerima";

// Modul Penyaluran (Proses Bisnis)
import Penyaluran from "./pages/Penyaluran";

function App() {
  return (
    <Routes>
      {/* Route Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      {/* Data Barang */}
      <Route
        path="/barang"
        element={
          <DashboardLayout>
            <Barang />
          </DashboardLayout>
        }
      />

      {/* Tambah Barang */}
      <Route
        path="/barang/tambah"
        element={
          <DashboardLayout>
            <TambahBarang />
          </DashboardLayout>
        }
      />

      {/* Edit Barang */}
      <Route
        path="/barang/edit/:id"
        element={
          <DashboardLayout>
            <EditBarang />
          </DashboardLayout>
        }
      />

      {/* Detail Barang */}
      <Route
        path="/barang/:id"
        element={
          <DashboardLayout>
            <DetailBarang />
          </DashboardLayout>
        }
      />

      {/* Data Donatur */}
      <Route
        path="/donatur"
        element={
          <DashboardLayout>
            <Donatur />
          </DashboardLayout>
        }
      />

      {/* Data Penerima */}
      <Route
        path="/penerima"
        element={
          <DashboardLayout>
            <Penerima />
          </DashboardLayout>
        }
      />

      {/* Penyaluran Barang (Proses Bisnis) */}
      <Route
        path="/penyaluran"
        element={
          <DashboardLayout>
            <Penyaluran />
          </DashboardLayout>
        }
      />

      {/* Halaman awal */}
      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      {/* Halaman tidak ditemukan */}
      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;