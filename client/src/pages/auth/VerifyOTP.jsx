import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      return alert("Enter OTP");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        phone,
        otp,
      });

      if (res.data.success) {
        alert("OTP Verified");

        navigate("/reset-password", {
          state: { phone },
        });
      }

    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Verify OTP
        </h2>

        <input
          type="text"
          value={phone}
          disabled
          className="w-full border rounded-lg p-3 mb-4 bg-gray-100"
        />

        <input
          type="text"
          placeholder="Enter 6 Digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

      </form>

    </div>
  );
}

export default VerifyOTP;