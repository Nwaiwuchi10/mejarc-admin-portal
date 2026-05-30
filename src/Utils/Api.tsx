"use client";
import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:4500"
  // `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

Api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default Api;
