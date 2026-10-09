import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  UserRound,
  Truck,
  LogOut,
} from "lucide-react";
import apiClient from "../api/axios";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Barang", path: "/barang", icon: Package },
    { name: "Donatur", path: "/donatur", icon: Users },
    { name: "Penerima", path: "/penerima", icon: UserRound },
    { name: "Penyaluran", path: "/penyaluran", icon: Truck },
  ];

  const handleLogout = async () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari aplikasi?")) {
      try {
        await apiClient.post("/logout");
      } catch (e) {
        console.error("Gagal melakukan request logout ke server:", e);
      } finally {
        // Hapus session/token di browser dan kembalikan ke halaman login
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">D</div>
        <div>
          <h2>DonasiKita</h2>
          <span>Sistem Donasi Barang</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <p className="menu-title">MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <button className="logout-button" onClick={handleLogout}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;