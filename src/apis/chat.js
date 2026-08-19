import api from "./client";

export const sendChatMessage = async ({ sessionId, message, productCode }) => {
  const payload = { message };
  if (sessionId) payload.session_id = sessionId;
  if (productCode) payload.product_code = productCode;

  const { data } = await api.post("/ai/chat/", payload);
  return data;
  // 응답 형태: { session_id, answer, recommended_products: [...], visit_card }
};