import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

import api from "../../services/api";

function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await api.get("/settings");
      setSettings(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!settings) return null;

  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-4 md:grid-cols-2 gap-10">

        {/* Company */}

        <div>

          {settings.logo && (
            <img
              src={`http://localhost:5000/uploads/settings/${settings.logo}`}
              alt={settings.website_name}
              className="h-12 mb-4"
            />
          )}

          <h2 className="text-2xl font-bold">
            {settings.website_name}
          </h2>

          <p className="text-gray-400 mt-3 leading-7">
            {settings.tagline}
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="font-bold text-lg mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/shop" className="hover:text-white">
                Shop
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="font-bold text-lg mb-5">
            Contact Info
          </h3>

          <div className="space-y-4 text-gray-400">

            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-3 hover:text-white"
              >
                <Phone size={18} />
                {settings.phone}
              </a>
            )}

            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 hover:text-white"
              >
                <Mail size={18} />
                {settings.email}
              </a>
            )}

            {settings.address && (
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1" />
                <span>{settings.address}</span>
              </div>
            )}

          </div>

        </div>

        {/* Social */}

        <div>

          <h3 className="font-bold text-lg mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4">

            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>
            )}

            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>
            )}

            {settings.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center transition"
              >
                <FaYoutube />
              </a>
            )}

            {settings.twitter && (
              <a
                href={settings.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition"
              >
                <FaXTwitter />
              </a>
            )}

            {settings.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-700 flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>
            )}

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto py-5 px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>
            {settings.footer_text ||
              `© ${new Date().getFullYear()} ${settings.website_name}`}
          </p>

          <p className="mt-3 md:mt-0">
            Developed by{" "}
            <span className="font-semibold text-white">
              Innovens IT
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;