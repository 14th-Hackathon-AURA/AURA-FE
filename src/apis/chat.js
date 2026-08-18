import api from "./client";

export const sendChatMessage = async ({ sessionId, message, productCode }) => {
  const payload = { message };
  if (sessionId) payload.session_id = sessionId;
  if (productCode) payload.product_code = productCode;

  const { data } = await api.post("/ai/chat/", payload);
  return data;
  // 예상 응답 형태: { session_id, reply, recommended_products: [...] }
  // 실제 응답의 텍스트 필드명이 reply가 아니면 ChatPage.jsx에서 이 부분만 맞춰 수정
};