"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { authService } from "../../../services/authService";
import CustomModal from "@/src/components/MessageToast/Message";

import img1 from "../../../assets/images/Maskgroup.png";
import bgimage from "../../../assets/images/bgSignup.png";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Login, 2: OTP

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setModal({ type: "error", message: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res.success) {
        setStep(2);
        setModal({
          type: "success",
          message: "Step 1 verification successful. Please check your email for the OTP.",
        });
      } else {
        setModal({ type: "error", message: res.message || "Login failed." });
      }
    } catch (err) {
      setModal({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setModal({ type: "error", message: "Please enter the OTP." });
      return;
    }

    setLoading(true);
    try {
      const res = await authService.verifyLogin(email, otp);
      if (res.success && res.adminToken) {
        localStorage.setItem("adminToken", res.adminToken);
        localStorage.setItem("adminUser", JSON.stringify(res.admin));
        setModal({ type: "success", message: "Login successful! Redirecting..." });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setModal({ type: "error", message: res.message || "Verification failed." });
      }
    } catch (err) {
      setModal({ type: "error", message: "Verification failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgimage.src})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <div className="relative w-full max-w-[1000px] bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center px-8 sm:px-12 md:px-16 py-12">
            <div className="max-w-[450px] mx-auto w-full">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {step === 1 ? "Admin Login" : "Verification"}
              </h1>
              <p className="text-gray-900 mb-8 font-medium">
                {step === 1 ? "Welcome back to MEJARC Portal" : "Enter the OTP sent to your email"}
              </p>

              {step === 1 ? (
                <form onSubmit={handleLogin} className="animate-in fade-in slide-in-from-left-4 duration-500">
                  {/* EMAIL */}
                  <div className="mb-5">
                    <label className="text-sm font-semibold text-gray-900">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="admin@mejarc.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full mt-1 bg-gray-50 rounded-xl px-4 py-3 border focus:border-gray-300 outline-none text-gray-900 placeholder:text-gray-600"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-6 relative">
                    <label className="text-sm font-semibold text-gray-900">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full mt-1 bg-gray-50 rounded-xl px-4 py-3 border focus:border-gray-300 outline-none text-gray-900 placeholder:text-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-[42px] text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FFC700] hover:bg-[#E5B300] transition text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 size={24} className="animate-spin" /> : "Continue"}
                  </button>

                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => setModal({ type: "error", message: "Please contact system administrator for account issues." })}
                      className="text-sm text-blue-600 cursor-pointer hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="animate-in fade-in slide-in-from-right-4 duration-500">
                  {/* OTP */}
                  <div className="mb-8">
                    <label className="text-sm font-semibold text-gray-900">
                      OTP Verification
                    </label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                      className="w-full mt-1 bg-gray-50 rounded-xl px-4 py-4 border focus:border-gray-300 outline-none text-gray-900 text-center text-3xl font-bold tracking-widest placeholder:text-gray-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FFC700] hover:bg-[#E5B300] transition text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 size={24} className="animate-spin" /> : "Verify & Login"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-4 flex items-center justify-center gap-2 text-gray-600 hover:text-black transition text-sm font-medium w-full"
                  >
                    <ArrowLeft size={16} /> Back to login
                  </button>
                </form>
              )}

              <div className="mt-12 text-center text-xs text-gray-600 capitalize">
                Secure Administrative Access - MEJARC Engineering
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden lg:block relative p-4 bg-gray-50">
            <div className="relative w-full h-full rounded-[30px] overflow-hidden">
              <Image
                src={img1}
                alt="Modern Architecture"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="text-2xl font-bold">Admin Portal</h3>
                <p className="opacity-80">Managing Engineering Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <CustomModal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
