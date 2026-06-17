"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import useUserStore from "@/store/useUserStore";
import { sendOtp, loginUser } from "@/apis/userApi";
import useWishlistStore from "@/store/useWishlistStore";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingProductId?: string | null; // product to wishlist after login
}

export default function LoginModal({ isOpen, onClose, pendingProductId }: LoginModalProps) {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [otpHint, setOtpHint] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const setUser = useUserStore((s) => s.setUser);
  const addWishlist = useWishlistStore((s) => s.addWishlist);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reset = () => {
    setMobile("");
    setOtpSent(false);
    setOtp(["", "", "", ""]);
    setError("");
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await sendOtp(mobile);
      setOtpSent(true);
      // Development: show OTP from response if available
      if (res?.data?.otp) {
        setOtpHint(res.data.otp);
      } else if (res?.otp) {
        setOtpHint(res.otp);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      setError("Please enter the complete 4-digit OTP.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(mobile, enteredOtp);
      if (res.success) {
        setUser(res.data, res.token);
        // After login, if there was a pending product to wishlist, do it
        if (pendingProductId) {
          await addWishlist(pendingProductId, res.token);
        }
        handleClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-opacity duration-200 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-200 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Login to Continue</h2>
            <p className="text-white/70 text-xs mt-0.5">
              {pendingProductId ? "Login to add this product to your wishlist" : "Enter your mobile number"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label htmlFor="modal-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
                  <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 text-sm border-r border-gray-300">
                    +91
                  </span>
                  <input
                    type="text"
                    id="modal-mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 px-3 py-2.5 text-sm text-gray-700 outline-none bg-white"
                    placeholder="Enter 10-digit number"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand/90 transition disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center mb-3">
                  Enter OTP sent to +91 {mobile}
                </label>

                {/* OTP Hint from server response */}
                {otpHint && (
                  <div
                    className="mb-3 flex items-center justify-between bg-amber-50 border border-amber-300 rounded-lg px-4 py-2.5 cursor-pointer hover:bg-amber-100 transition"
                    onClick={() => setOtp(otpHint.split(""))}
                    title="Click to auto-fill OTP"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500 text-sm">🔑</span>
                      <span className="text-xs text-amber-700 font-medium">Your OTP:</span>
                      <span className="text-lg font-extrabold tracking-[0.3em] text-amber-800">{otpHint}</span>
                    </div>
                    <span className="text-[10px] text-amber-500 font-semibold border border-amber-300 rounded px-1.5 py-0.5">TAP TO FILL</span>
                  </div>
                )}

                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-brand focus:ring-1 focus:ring-brand outline-none transition"
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand/90 transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtp(["", "", "", ""]); setError(""); }}
                  className="text-xs text-brand hover:underline"
                >
                  Change Mobile Number
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
