// import axios, { AxiosInstance } from "axios";

// const api: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // base url শুধু .env থেকে আসবে
//   timeout: 3 * 60 * 1000,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;



// // src/api.ts
// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://vdjshana.onrender.com/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Automatically token attach
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;




import axios from "axios";

const api = axios.create({
  baseURL: "https://vdjshana.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// ===================== //
// 🔹 Auth functions
// ===================== //
export const loginAdmin = async (credentials: { username: string; password: string }) => {
  const res = await api.post("/admin/login", credentials);
  return res.data;
};

// ===================== //
// 🔹 Songs CRUD functions
// ===================== //

// Get all songs
export const getSongs = async () => {
  const res = await api.get("/songs");
  return res.data;
};

// Add new song
export const addSong = async (songData: { title: string; lang: string; link: string }) => {
  const res = await api.post("/songs", songData);
  return res.data;
};

// Update song by ID
export const updateSong = async (
  id: string,
  songData: { title?: string; lang?: string; link?: string }
) => {
  const res = await api.put(`/songs/${id}`, songData);
  return res.data;
};

// Delete song by ID
export const deleteSong = async (id: string) => {
  const res = await api.delete(`/songs/${id}`);
  return res.data;
};
