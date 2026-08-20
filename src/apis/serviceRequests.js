import api from "./client";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.service_requests)) return data.service_requests;
  return [];
};

export const getServiceRequests = async () => {
  const { data } = await api.get("/service-requests/");
  return normalizeList(data);
};

export const getServiceRequest = async (requestId) => {
  const { data } = await api.get(`/service-requests/${requestId}/`);
  return data;
};

export const createServiceRequest = async (payload) => {
  const { data } = await api.post("/service-requests/", payload);
  return data;
};

export const updateServiceRequest = async (requestId, payload) => {
  const { data } = await api.patch(`/service-requests/${requestId}/`, payload);
  return data;
};

export const deleteServiceRequest = async (requestId) => {
  await api.delete(`/service-requests/${requestId}/`);
};
