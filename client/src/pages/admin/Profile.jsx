import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Shield,
  Lock,
  Save,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/profile.service";

function Profile() {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    role: "",
  });

  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      if (res.data.success) {
        setForm(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await updateProfile(form);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });
    }
  };

  const savePassword = async () => {
    if (password.new_password !== password.confirm_password) {
      return Swal.fire({
        icon: "warning",
        title: "Password doesn't match",
      });
    }

    try {
      await changePassword(password);

      Swal.fire({
        icon: "success",
        title: "Password Changed",
      });

      setPassword({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Wrong Current Password",
      });
    }
  };

  if (loading) {
    return <h2 className="text-center py-20">Loading...</h2>;
  }

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        My Profile
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left */}

        <div className="bg-white rounded-xl shadow border p-8">

          <div className="flex flex-col items-center">

            <img
              src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff&size=256"
              className="w-32 h-32 rounded-full"
            />

            <h2 className="mt-4 text-2xl font-bold">
              {form.name}
            </h2>

            <p className="text-gray-500">
              {form.role}
            </p>

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <Mail size={18} />
              {form.email}
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              {form.phone || "-"}
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              {form.address || "-"}
            </div>

            <div className="flex items-center gap-3">
              <Building2 size={18} />
              {form.city || "-"}
            </div>

            <div className="flex items-center gap-3">
              <Shield size={18} />
              {form.role}
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="lg:col-span-2 space-y-8">

          {/* Profile */}

          <div className="bg-white rounded-xl shadow border p-8">

            <h2 className="text-xl font-bold mb-6">
              Update Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border rounded-lg p-3"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded-lg p-3"
              />

              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
                className="border rounded-lg p-3"
              />

              <input
                name="city"
                value={form.city || ""}
                onChange={handleChange}
                placeholder="City"
                className="border rounded-lg p-3"
              />

              <textarea
                rows="3"
                name="address"
                value={form.address || ""}
                onChange={handleChange}
                placeholder="Address"
                className="border rounded-lg p-3 md:col-span-2"
              />

            </div>

            <button
              onClick={saveProfile}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <Save size={18} />
              Save Changes
            </button>

          </div>

          {/* Password */}

          <div className="bg-white rounded-xl shadow border p-8">

            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">

              <Lock size={20} />

              Change Password

            </h2>

            <div className="space-y-4">

              <input
                type="password"
                name="current_password"
                value={password.current_password}
                onChange={handlePassword}
                placeholder="Current Password"
                className="w-full border rounded-lg p-3"
              />

              <input
                type="password"
                name="new_password"
                value={password.new_password}
                onChange={handlePassword}
                placeholder="New Password"
                className="w-full border rounded-lg p-3"
              />

              <input
                type="password"
                name="confirm_password"
                value={password.confirm_password}
                onChange={handlePassword}
                placeholder="Confirm Password"
                className="w-full border rounded-lg p-3"
              />

            </div>

            <button
              onClick={savePassword}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Change Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;