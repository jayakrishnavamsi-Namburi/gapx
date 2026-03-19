import api from "./api.js";

// ✅ Generate quiz
export const generateQuizApi = (roadmapId) =>
  api.post(`/quiz/generate/${roadmapId}`);

// ✅ Get quiz
export const getQuizApi = (roadmapId) => api.get(`/quiz/${roadmapId}`);

// ✅ Submit quiz
export const submitQuizApi = (roadmapId, payload) =>
  api.post(`/quiz/submit/${roadmapId}`, payload);

// ✅ Retry quiz
export const retryQuizApi = (roadmapId) => api.post(`/quiz/retry/${roadmapId}`);

// ✅ History (domain wise)
export const getDomainWiseHistoryApi = () =>
  api.get(`/quiz/history/domain-wise`);

// ✅ Stats for dashboard graph
export const getQuizStatsApi = () => api.get(`/quiz/stats/me`);