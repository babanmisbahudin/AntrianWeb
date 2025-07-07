import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        nik,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "kasir") navigate("/kasir");
      else if (res.data.role === "penaksir") navigate("/penaksir");
      else if (res.data.role === "satpam") navigate("/satpam");

    } catch (err) {
      alert("Login gagal: " + (err?.response?.data?.message || "Terjadi kesalahan."));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login Pegawai</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">NIK</label>
          <input
            type="text"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Masukkan NIK"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Masukkan Password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
}
