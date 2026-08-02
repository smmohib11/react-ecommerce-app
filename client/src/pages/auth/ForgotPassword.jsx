import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/forgot-password", {
      phone,
    });

    if (res.data.success) {
      navigate("/verify-otp", {
        state: { phone },
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-6">
          Forgot Password
        </h2>

        <input
          className="w-full border p-3 rounded mb-5"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded">
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;