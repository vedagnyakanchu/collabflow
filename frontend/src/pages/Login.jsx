import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // Go to dashboard
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-slate-800">
        <h1 className="text-3xl font-bold text-white text-center mb-3">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Sign in to continue to{" "}
          <span className="text-blue-500 font-semibold">
            CollabFlow
          </span>
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-200 font-semibold text-white shadow-lg hover:shadow-blue-500/30"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} CollabFlow
        </p>
      </div>
    </div>
  );
}

export default Login;
