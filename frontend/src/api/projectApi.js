import axios from "axios";
import { getToken } from "../utils/token";

const API = axios.create({
  baseURL: "https://gapx.onrender.com/api/projects",
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const suggestProjectsApi = (data) =>
  API.post("/suggest", data);
