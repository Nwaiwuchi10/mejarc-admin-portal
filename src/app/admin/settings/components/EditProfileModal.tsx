"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, Upload, Camera, Trash2, CheckCircle2, User, Mail, Phone, MapPin, Building } from "lucide-react";
import { settingService } from "@/src/services/settingService";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  onUpdate: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onUpdate,
}: EditProfileModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePics, setProfilePics] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setEmail(profile.email || "");
      setPhoneNumber(profile.phoneNumber || "");
      const pic = profile.profilePics || profile.profilePicture || "";
      setProfilePics(pic);
      setImagePreview(pic || null);

      if (profile.address) {
        if (typeof profile.address === "string") {
          setStreet(profile.address);
        } else {
          setStreet(profile.address.street || "");
          setCity(profile.address.city || "");
          setState(profile.address.state || "");
          setCountry(profile.address.country || "");
        }
      }
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size should be less than 5MB.");
      return;
    }

    setErrorMsg("");
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setProfilePics(result); // Base64 data URI
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setProfilePics("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      profilePics: profilePics || undefined,
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      country: country.trim(),
      address: [street, city, state, country].filter(Boolean).join(", "),
    };

    const res = await settingService.updateProfile(payload);
    setLoading(false);

    if (res && res.success !== false) {
      setSuccessMsg("Profile updated successfully!");

      // Update local storage so header / layout updates instantly
      const stored = localStorage.getItem("adminUser");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          parsed.firstName = firstName;
          parsed.lastName = lastName;
          parsed.email = email;
          parsed.phoneNumber = phoneNumber;
          if (profilePics) parsed.profilePics = profilePics;
          localStorage.setItem("adminUser", JSON.stringify(parsed));
        } catch (err) {
          console.error("Failed to update localStorage", err);
        }
      }

      onUpdate();
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setErrorMsg(res?.message || "Failed to update admin profile.");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#1a1a2e] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFC700] text-[#1a1a2e] flex items-center justify-center font-black text-sm">
              <User size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold m-0 text-white">Edit Admin Profile</h3>
              <p className="text-xs text-gray-400 m-0">Update personal information & avatar</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors border-none bg-transparent cursor-pointer text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ── PROFILE PICTURE SELECTION ── */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#FFC700] shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFC700] to-orange-400 flex items-center justify-center text-[#1a1a2e] font-black text-2xl shadow-sm">
                  {firstName?.charAt(0)?.toUpperCase() || "A"}
                </div>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-1.5 bg-[#1a1a2e] text-white rounded-full shadow hover:bg-[#2a2a4e] transition-colors border-2 border-white cursor-pointer"
                title="Change Photo"
              >
                <Camera size={13} />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider m-0">Profile Photo</h4>
              <p className="text-xs text-gray-500 m-0">Upload a profile picture from your device (PNG, JPG, max 5MB)</p>

              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Upload size={13} />
                  Choose File
                </button>

                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition flex items-center gap-1 border-0 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── PERSONAL DETAILS ── */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider m-0 flex items-center gap-1.5">
              <User size={14} className="text-[#FFC700]" />
              Personal Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Roland"
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Emmanuel"
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700] focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                  <Mail size={12} className="text-gray-400" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mejarc.com"
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                  <Phone size={12} className="text-gray-400" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700] focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* ── ADDRESS / LOCATION ── */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider m-0 flex items-center gap-1.5">
              <MapPin size={14} className="text-[#FFC700]" />
              Address & Location
            </h4>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700] focus:bg-white transition"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lagos"
                  className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Lagos State"
                  className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Nigeria"
                  className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#FFC700]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition border-0 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white font-bold text-xs transition flex items-center gap-2 border-0 cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading && <Loader2 size={14} className="animate-spin text-[#FFC700]" />}
              <span>{loading ? "Saving Changes..." : "Save Profile Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
