import { useState } from "react";
import API from "../api/axios";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    console.log("Sending:", email, password);

    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log("Response:", res.data);

    localStorage.setItem("token", res.data.token);
    setIsLoggedIn(true);
  } catch (err) {
    console.log("ERROR:", err.response?.data);
    alert("Login failed");
  }
};

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
