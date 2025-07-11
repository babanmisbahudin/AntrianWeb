import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const redirectUserByRole = (role) => {
    const roleLower = role.toLowerCase();
    switch (roleLower) {
      case "admin":
        navigate("/admin");
        break;
      case "kasir":
        navigate("/kasir");
        break;
      case "penaksir":
        navigate("/penaksir");
        break;
      case "satpam":
        navigate("/satpam");
        break;
      default:
        alert("Peran tidak dikenali.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!nik || !password) {
      alert("NIK dan Password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        nik,
        password,
      });

      console.log("RESPON LOGIN:", res.data);

      const { token, role } = res.data;

      if (!token || typeof role !== "string") {
        alert("Login gagal: data tidak lengkap atau peran tidak valid.");
        return;
      }

      // Simpan ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data._id,
          nama: res.data.nama,
          role: res.data.role,
        })
      );


      // Redirect berdasarkan role
      setTimeout(() => {
        redirectUserByRole(role);
      }, 100);
    } catch (err) {
      alert("Login gagal: " + (err?.response?.data?.message || "Terjadi kesalahan."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm space-y-4"
      >
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Masukkan Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 text-sm text-blue-600 hover:underline focus:outline-none"
            >
              {showPassword ? "Sembunyikan" : "Lihat"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </div>
  );
}
