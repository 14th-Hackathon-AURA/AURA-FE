import api from "./client";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.visit_cards)) return data.visit_cards;
  return [];
};

export const getVisitCards = async () => {
  const { data } = await api.get("/ai/visit-cards/");
  return normalizeList(data);
};

export const getVisitCard = async (cardId) => {
  const { data } = await api.get(`/ai/visit-cards/${cardId}/`);
  return data;
};

export const createVisitCard = async ({
  styleCode,
  sessionId,
  consultationSummary,
}) => {
  const payload = { style_code: styleCode };
  if (sessionId != null) payload.session_id = sessionId;
  if (consultationSummary != null) {
    payload.consultation_summary = consultationSummary;
  }

  const { data } = await api.post("/ai/visit-cards/", payload);
  return data;
};

export const deleteVisitCard = async (cardId) => {
  await api.delete(`/ai/visit-cards/${cardId}/`);
};
