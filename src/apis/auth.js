import http from "./http";

// OTP send - seedha backend
export const sendOtp = async (mobile) => {
  const { data } = await http.post("/users/sendOtp", { mobile });
  return data;
};

// Login - Next.js route handler ke through (session set hoga)
export const loginUser = async (mobile, otp) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, otp }),
  });
  return res.json();
};

// Logout - session destroy
export const logoutUser = async () => {
  const res = await fetch("/api/auth/logout", { method: "POST" });
  return res.json();
};

// Current session user fetch
export const getSessionUser = async () => {
  const res = await fetch("/api/auth/session");
  return res.json();
};

// Update profile - seedha backend (token http interceptor se nahi milega ab)
export const updateUser = async (formData, token) => {
  const { data } = await http.put("/users/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
