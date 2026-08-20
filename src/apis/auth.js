import api from "./client";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/token/", { email, password });
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
  return data;
};

export const signUp = async (email, password) => {
  const { data } = await api.post("/auth/register/", { email, password });
  return data;
};