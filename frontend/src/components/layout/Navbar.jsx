import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));

  // Re-check token whenever route changes
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    // Force full reload so App re-evaluates auth
    window.location.href = "/login";
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-slate-900 border-b border-slate-800">
      <h1
        className="text-lg font-semibold text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        CollabFlow
      </h1>

      {token ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Navbar;
