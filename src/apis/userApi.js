import axios from "axios";
import useUserStore from "../store/useUserStore";
import http from "./http";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const getAuthConfig = () => {
  const token = useUserStore.getState().token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const sendOtp = async (mobile) => {
  const res = await http.post(`/users/sendOtp`, { mobile });
  return res.data;
};

export const loginUser = async (mobile, otp) => {
  const res = await http.post(`/users/login`, { mobile, otp });
  return res.data;
};

export const updateProfile = async (formData) => {
  const token = useUserStore.getState().token;
  const res = await http.put(`/users/update`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
