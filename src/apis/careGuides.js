import api from "./client";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.guides)) return data.guides;
  return [];
};

export const getCareGuides = async (params = {}) => {
  const { data } = await api.get("/care-guides/", { params });
  return normalizeList(data);
};

export const getCareGuide = async (guideId) => {
  const { data } = await api.get(`/care-guides/${guideId}/`);
  return data;
};

export const getCareBookmarks = async () => {
  const { data } = await api.get("/care-bookmarks/");
  return normalizeList(data);
};

export const createCareBookmark = async (guideId) => {
  const { data } = await api.post("/care-bookmarks/", { guide_id: guideId });
  return data;
};

export const deleteCareBookmark = async (bookmarkId) => {
  await api.delete(`/care-bookmarks/${bookmarkId}/`);
};
