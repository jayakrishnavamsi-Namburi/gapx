import axios from "axios";

const API = axios.create({
  baseURL: "https://gapx.onrender.com/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// =============================
// ROADMAP APIs
// =============================

// Generate new roadmap
export const generateRoadmapApi = (data) =>
  API.post("/roadmap/generate", data);

// Get all roadmaps of logged-in user
export const getMyRoadmapsApi = () =>
  API.get("/roadmap/mine");

// Get single roadmap by ID
export const getSingleRoadmapApi = (id) =>
  API.get(`/roadmap/${id}`);

// 🔄 Regenerate single week (NEW)
export const regenerateWeekApi = (id, weekNumber) =>
  API.post(`/roadmap/${id}/regenerate-week`, {
    weekNumber,
  });

// ✅ Update progress (future / optional)
export const updateProgressApi = (id, payload) =>
  API.patch(`/roadmap/progress/${id}`, payload);
