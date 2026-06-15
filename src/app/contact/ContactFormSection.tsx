"use client";

import { useState } from "react";
import { sendContact } from "@/apis/contact";

const services = [
  "Steel Welding",
  "Metal Fabrication",
  "Gate & Grill Manufacturing",
  "Industrial Work",
  "Repair Services",
  "Custom Design Solutions",
];

const whyItems = [
  "Free Project Consultation",
  "Quick Response",
  "Custom Fabrication Solutions",
  "Quality Workmanship",
  "Transparent Pricing",
  "Local Service Support",
];

export default function ContactFormSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await sendContact({
        name: form.name,
        mobile: form.phone,
        email: form.email,
        service: form.service,
        projectLocation: form.location,
        message: form.message,
      });
      setSuccess(true);
      setForm({ name: "", phone: "", email: "", service: "", location: "", message: "" });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left — Form */}
        <div>
          <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
            Free Quote
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-1">Request a Free Quote</h2>
          <p className="text-sm text-zinc-500 mb-6">Apni requirement share karein. Hum jald hi aapse sampark karenge.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-zinc-700">Full Name <span className="text-brand">*</span></label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Aapka naam"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 outline-none focus:border-brand transition bg-white"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-zinc-700">Phone Number <span className="text-brand">*</span></label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 outline-none focus:border-brand transition bg-white"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-zinc-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="aap@example.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 outline-none focus:border-brand transition bg-white"
              />
            </div>

            {/* Service */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-zinc-700">Service Required <span className="text-brand">*</span></label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 outline-none focus:border-brand transition bg-white"
              >
                <option value="">Select Service</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-zinc-700">Project Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Apna area / gaon / shahar"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 outline-none focus:border-brand transition bg-white"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-zinc-700">Message <span className="text-brand">*</span></label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Apni requirement describe karein..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 outline-none focus:border-brand transition bg-white resize-none"
              />
            </div>

            {success && (
              <div className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-medium text-center">
                ✅ Request submit ho gayi! Hum jald aapse contact karenge.
              </div>
            )}
            {error && (
              <div className="w-full px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand text-white font-bold text-sm rounded-xl transition hover:bg-brand-hover active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Get Free Quote"}
            </button>
          </form>
        </div>

        {/* Right — Contact Info */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-brandBG-icon border border-brand rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-brand uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
              Contact Details
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-5">Get In Touch</h2>

            <div className="flex flex-col gap-4">
              {/* Phone */}
              <div className="flex items-start gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brandBG-icon flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phone</p>
                  <a href="tel:+917905940157" className="text-sm font-bold text-zinc-800 hover:text-brand transition">+91 79059 40157</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brandBG-icon flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email</p>
                  <a href="mailto:info@vishwakarma.com" className="text-sm font-bold text-zinc-800 hover:text-brand transition">info@vishwakarma.com</a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brandBG-icon flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Address</p>
                  <p className="text-sm font-bold text-zinc-800">Lakhua Chauraha, Khadda</p>
                  <p className="text-xs text-zinc-500">Kushinagar, UP - 274802</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Contact Us */}
          <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl">
            <p className="text-sm font-bold text-zinc-800 mb-3">Why Contact Us</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {whyItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
