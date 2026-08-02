


import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Store,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Search,
  Truck,
  ShieldAlert,
  Upload,
  X,
  Save,
  Loader2,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

import api from "../../services/api";

const DEFAULT_SETTINGS = {
  website_name: "",
  website_title: "",
  tagline: "",
  currency: "BDT",
  shipping_charge: 0,
  phone: "",
  whatsapp: "",
  messenger: "",
  email: "",
  address: "",
  facebook: "",
  instagram: "",
  youtube: "",
  twitter: "",
  linkedin: "",
  primary_color: "#2563eb",
  secondary_color: "#111827",
  footer_text: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  maintenance_mode: 0,
};

// ============================================
// Reusable Field Components
// ============================================

function SectionCard({ icon: Icon, title, description, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-start gap-3 px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>

      <div className="p-6 grid sm:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function Field({ label, icon: Icon, children, full = false }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
        {Icon && <Icon size={14} className="text-gray-400" />}
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

// ============================================
// Main Component
// ============================================

function Settings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [existingLogo, setExistingLogo] = useState(null);

  // ===========================
  // Load Settings
  // ===========================

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/settings");

      setSettings({ ...DEFAULT_SETTINGS, ...res.data.data });
      setExistingLogo(res.data.data?.logo || null);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Could not load settings",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Handlers
  // ===========================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setExistingLogo(null);
  };

  const handleToggleMaintenance = () => {
    setSettings((prev) => ({
      ...prev,
      maintenance_mode: prev.maintenance_mode ? 0 : 1,
    }));
  };

  // ===========================
  // Save
  // ===========================

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      Object.entries(settings).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (!existingLogo && !logoFile) {
        formData.append("remove_logo", "1");
      }

      await api.put("/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Settings Saved",
        toast: true,
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
      });

      loadSettings();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-3 text-gray-400">
        <Loader2 className="animate-spin" size={32} />
        <p className="text-sm font-medium">Loading settings...</p>
      </div>
    );
  }

  const logoToShow = logoPreview
    ? logoPreview
    : existingLogo
    ? `http://localhost:5000/${existingLogo}`
    : null;

  return (
    <form onSubmit={handleSave} className="pb-28">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Store Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your store's identity, contact details, and configuration.
        </p>
      </div>

      <div className="space-y-6">

        {/* Branding */}

        <SectionCard
          icon={Store}
          title="Store Identity"
          description="Name, tagline, and logo shown across your storefront"
        >
          <Field label="Website Name" full>
            <input
              name="website_name"
              value={settings.website_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="My Shop"
            />
          </Field>

          <Field label="Website Title (SEO)">
            <input
              name="website_title"
              value={settings.website_title}
              onChange={handleChange}
              className={inputClass}
              placeholder="My Shop Bangladesh"
            />
          </Field>

          <Field label="Tagline">
            <input
              name="tagline"
              value={settings.tagline}
              onChange={handleChange}
              className={inputClass}
              placeholder="Best Ecommerce"
            />
          </Field>

          <Field label="Store Logo" full>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                {logoToShow ? (
                  <img
                    src={logoToShow}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Store size={24} className="text-gray-300" />
                )}
              </div>

              <label className="inline-flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition">
                <Upload size={16} />
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoSelect}
                  className="hidden"
                />
              </label>

              {logoToShow && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  <X size={16} />
                  Remove
                </button>
              )}
            </div>
          </Field>
        </SectionCard>

        {/* Contact */}

        <SectionCard
          icon={Phone}
          title="Contact Information"
          description="How customers can reach you"
        >
          <Field label="Phone" icon={Phone}>
            <input
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="01700000000"
            />
          </Field>

          <Field label="Email" icon={Mail}>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="info@example.com"
            />
          </Field>

          <Field label="WhatsApp" icon={MessageCircle}>
            <input
              name="whatsapp"
              value={settings.whatsapp}
              onChange={handleChange}
              className={inputClass}
              placeholder="8801700000000"
            />
          </Field>

          <Field label="Messenger Link" icon={MessageCircle}>
            <input
              name="messenger"
              value={settings.messenger}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://m.me/username"
            />
          </Field>

          <Field label="Address" icon={MapPin} full>
            <input
              name="address"
              value={settings.address}
              onChange={handleChange}
              className={inputClass}
              placeholder="Dhaka, Bangladesh"
            />
          </Field>
        </SectionCard>

        {/* Social Media */}

        <SectionCard
          icon={FaFacebookF}
          title="Social Media"
          description="Links shown in your site footer"
        >
          <Field label="Facebook" icon={FaFacebookF}>
            <input
              name="facebook"
              value={settings.facebook}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://facebook.com/username"
            />
          </Field>

          <Field label="Instagram" icon={FaInstagram}>
            <input
              name="instagram"
              value={settings.instagram}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://instagram.com/username"
            />
          </Field>

          <Field label="YouTube" icon={FaYoutube}>
            <input
              name="youtube"
              value={settings.youtube}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://youtube.com/@username"
            />
          </Field>

          <Field label="Twitter / X" icon={FaXTwitter}>
            <input
              name="twitter"
              value={settings.twitter}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://x.com/username"
            />
          </Field>

          <Field label="LinkedIn" icon={FaLinkedinIn}>
            <input
              name="linkedin"
              value={settings.linkedin}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://linkedin.com/company/username"
            />
          </Field>
        </SectionCard>

        {/* Branding Colors */}

        <SectionCard
          icon={Palette}
          title="Brand Colors"
          description="Primary and secondary colors used across the storefront"
        >
          <Field label="Primary Color">
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="primary_color"
                value={settings.primary_color}
                onChange={handleChange}
                className="w-11 h-11 rounded-lg border border-gray-300 cursor-pointer p-1"
              />
              <input
                name="primary_color"
                value={settings.primary_color}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </Field>

          <Field label="Secondary Color">
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="secondary_color"
                value={settings.secondary_color}
                onChange={handleChange}
                className="w-11 h-11 rounded-lg border border-gray-300 cursor-pointer p-1"
              />
              <input
                name="secondary_color"
                value={settings.secondary_color}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </Field>
        </SectionCard>

        {/* Shipping & Currency */}

        <SectionCard
          icon={Truck}
          title="Shipping & Currency"
          description="Defaults used at checkout"
        >
          <Field label="Currency">
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="BDT">BDT (৳)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </Field>

          <Field label="Shipping Charge">
            <input
              type="number"
              name="shipping_charge"
              value={settings.shipping_charge}
              onChange={handleChange}
              className={inputClass}
              placeholder="80"
            />
          </Field>
        </SectionCard>

        {/* SEO */}

        <SectionCard
          icon={Search}
          title="SEO"
          description="Metadata used by search engines"
        >
          <Field label="Meta Title" full>
            <input
              name="meta_title"
              value={settings.meta_title}
              onChange={handleChange}
              className={inputClass}
              placeholder="My Shop"
            />
          </Field>

          <Field label="Meta Description" full>
            <textarea
              name="meta_description"
              value={settings.meta_description}
              onChange={handleChange}
              rows={3}
              className={inputClass}
              placeholder="Best Ecommerce Website"
            />
          </Field>

          <Field label="Meta Keywords" full>
            <input
              name="meta_keywords"
              value={settings.meta_keywords}
              onChange={handleChange}
              className={inputClass}
              placeholder="shop, ecommerce"
            />
          </Field>

          <Field label="Footer Text" full>
            <input
              name="footer_text"
              value={settings.footer_text}
              onChange={handleChange}
              className={inputClass}
              placeholder="© 2026 My Shop"
            />
          </Field>
        </SectionCard>

        {/* Maintenance Mode */}

        <SectionCard
          icon={ShieldAlert}
          title="Maintenance Mode"
          description="Temporarily take your storefront offline for visitors"
        >
          <div className="sm:col-span-2 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-4">
            <div>
              <p className="font-medium text-gray-900">
                Maintenance Mode
              </p>
              <p className="text-sm text-gray-500">
                {Number(settings.maintenance_mode) === 1
                  ? "Your storefront is currently offline to visitors."
                  : "Your storefront is live and visible to visitors."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleMaintenance}
              className={`relative w-14 h-8 rounded-full transition shrink-0 ${
                Number(settings.maintenance_mode) === 1
                  ? "bg-red-500"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  Number(settings.maintenance_mode) === 1
                    ? "translate-x-7"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </SectionCard>

      </div>

      {/* Sticky Save Bar */}

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-gray-200 px-6 py-4 flex justify-end shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </div>

    </form>
  );
}

export default Settings;