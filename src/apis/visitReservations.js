import api from "./client";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.reservations)) return data.reservations;
  return [];
};

export const getVisitReservations = async () => {
  const { data } = await api.get("/visit-reservations/");
  return normalizeList(data);
};

export const getVisitReservation = async (reservationId) => {
  const { data } = await api.get(`/visit-reservations/${reservationId}/`);
  return data;
};

export const getVisitAvailability = async ({ store, date }) => {
  const { data } = await api.get("/visit-reservations/availability/", {
    params: { store, date },
  });
  return data;
};

export const createVisitReservation = async (payload) => {
  const { data } = await api.post("/visit-reservations/", payload);
  return data;
};

export const updateVisitReservation = async (reservationId, payload) => {
  const { data } = await api.patch(
    `/visit-reservations/${reservationId}/`,
    payload,
  );
  return data;
};

export const cancelVisitReservation = async (reservationId) => {
  const { data } = await api.post(
    `/visit-reservations/${reservationId}/cancel/`,
  );
  return data;
};

export const deleteVisitReservation = async (reservationId) => {
  await api.delete(`/visit-reservations/${reservationId}/`);
};
