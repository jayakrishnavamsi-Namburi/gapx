// import axios from "axios";
// import { getToken } from "../utils/token";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/resume",
// });

// // 🔐 Attach JWT token automatically
// API.interceptors.request.use((req) => {
//   const token = getToken();
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// // ---------------- API FUNCTIONS ----------------

// // ✅ FIXED - Send RAW data directly (NO pdfStyle wrapper)
// export const generateResumeApi = (data) =>
//   API.post("/generate", data);

// // Get all resumes
// export const getMyResumesApi = () =>
//   API.get("/mine");

// // Get single resume
// export const getSingleResumeApi = (id) =>
//   API.get(`/${id}`);




// // Download resume PDF with custom filename & styling
// export const downloadResumeApi = async (id, resumeName = "resume") => {
//   const response = await API.get(`/${id}/download`, {
//     responseType: "blob",
//     headers: {
//       // 📄 PDF Render Options
//       "X-PDF-Theme": "modern",
//       "X-PDF-Font": "Roboto",
//       "X-PDF-Format": "A4",
//       "X-PDF-Margin": "15mm",
//       "X-PDF-DPI": "300",
//     },
//   });

//   const blob = new Blob([response.data], {
//     type: "application/pdf",
//   });

//   const url = window.URL.createObjectURL(blob);

//   const filename = `${resumeName.replace(/[^a-z0-9]/gi, '_')}_resume.pdf`.toLowerCase();
  
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);

//   window.URL.revokeObjectURL(url);
// };

// // Generate PDF preview (thumbnail)
// export const generatePdfPreviewApi = (id) =>
//   API.get(`/${id}/preview`, {
//     responseType: "blob",
//   });

// export default API;







import axios from "axios";
import { getToken } from "../utils/token";

// ✅ Axios instance
const API = axios.create({
  baseURL: "https://gapx.onrender.com/api/resume",
});

// 🔐 Attach JWT token automatically
API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ---------------- API FUNCTIONS ----------------

// ✅ Generate Resume
export const generateResumeApi = (data) =>
  API.post("/generate", data);

// ✅ Get all resumes
export const getMyResumesApi = () =>
  API.get("/mine");

// ✅ Get single resume
export const getSingleResumeApi = (id) =>
  API.get(`/${id}`);

// ✅ UPDATE RESUME (🔥 NEW FIX)
export const updateResumeApi = (id, data) =>
  API.put(`/${id}`, data);

// ✅ Download resume PDF
export const downloadResumeApi = async (id, resumeName = "resume") => {
  const response = await API.get(`/${id}/download`, {
    responseType: "blob",
    headers: {
      "X-PDF-Theme": "modern",
      "X-PDF-Font": "Roboto",
      "X-PDF-Format": "A4",
      "X-PDF-Margin": "15mm",
      "X-PDF-DPI": "300",
    },
  });

  const blob = new Blob([response.data], {
    type: "application/pdf",
  });

  const url = window.URL.createObjectURL(blob);

  const filename = `${resumeName
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase()}_resume.pdf`;

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  window.URL.revokeObjectURL(url);
};

// ✅ Export API instance (optional)
export default API;