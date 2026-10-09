import { Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div>
        <h1>Dashboard</h1>
        <p>Selamat datang di Sistem Donasi Barang</p>
      </div>

      <div className="navbar-actions">
        <button className="icon-button">
          <Bell size={20} />
        </button>

        <div className="user-info">
          <UserCircle size={36} />

          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;