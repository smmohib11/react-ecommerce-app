import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../../services/auth.service";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await login(form);

      console.log("Login Response:", res);

      if (!res.success) {
        alert(res.message);
        return;
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      alert("Login Successful");

      if (res.user.role === "super_admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>

        <p className="text-gray-500 text-center mb-8">Login to your account</p>

        {/* Phone Number */}

        <div className="mb-5">
          <label className="block mb-2 font-medium">Phone Number or Email</label>

          <input
            className="w-full border p-3 rounded mb-4"
            type="text"
            name="login"
            placeholder="Phone Number or Email"
            value={form.login}
            onChange={handleChange}
          />
        </div>

        {/* Password */}

        <div className="mb-5">
          <label className="block mb-2 font-medium">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter Password"
              className="w-full border rounded-lg p-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Remember */}

        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            Remember Me
          </label>

          <div className="text-right mb-4">
  <Link
    to="/forgot-password"
    className="text-sm text-blue-600 hover:underline"
  >
    Forgot Password?
  </Link>
</div>
        </div>

        {/* Login */}

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register */}

        <p className="text-center mt-6">
          Don't have an account?
          <Link to="/register" className="text-blue-600 ml-2 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
