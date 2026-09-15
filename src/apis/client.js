import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let refreshPromise = null;

const isAuthEndpoint = (url = "") =>
  url.includes("/auth/token/") || url.includes("/auth/register/");

const clearAuthAndRedirect = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) {
    throw new Error("No refresh token");
  }

  const { data } = await api.post("/auth/token/refresh/", { refresh });

  localStorage.setItem("access_token", data.access);
  if (data.refresh) {
    localStorage.setItem("refresh_token", data.refresh);
  }

  return data.access;
};

api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access_token");
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (!original || error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isAuthEndpoint(original.url)) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const access = await refreshPromise;
      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${access}`;
      return api(original);
    } catch {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }
  },
);

export default api;
