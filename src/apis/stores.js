import api from "./client";

export const getStores = async (params = {}) => {
  const query = {};

  if (params.q) query.q = params.q;
  if (params.latitude != null && params.longitude != null) {
    query.latitude = params.latitude;
    query.longitude = params.longitude;
  }
  if (params.limit != null) query.limit = params.limit;

  const { data } = await api.get("/stores/", { params: query });
  return {
    count: data?.count ?? 0,
    search: data?.search ?? "",
    locationUsed: Boolean(data?.location_used),
    stores: Array.isArray(data?.stores) ? data.stores : [],
  };
};

export const getStore = async (storeId) => {
  const { data } = await api.get(`/stores/${storeId}/`);
  return data;
};
