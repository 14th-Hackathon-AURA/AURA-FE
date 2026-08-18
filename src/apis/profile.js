import api from "./client";

export const getMyProfile = async () => {
  const { data } = await api.get("/me/");
  return data;
};

export const updateMyProfile = async (payload, avatarFile) => {
  if (avatarFile) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // preferred_categories/lifestyle는 서버에서 JSONField라 다중 키가 아니라
        // JSON 문자열 하나로 보내야 함 (아니면 마지막 값만 읽혀서 JSON 파싱 오류 발생)
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });
    formData.append("image", avatarFile);
    const { data } = await api.patch("/me/", formData);
    return data;
  }

  const { data } = await api.patch("/me/", payload);
  return data;
};