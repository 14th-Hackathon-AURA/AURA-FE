import api from "./client";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.diagnoses)) return data.diagnoses;
  return [];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDiagnoses = async (params = {}) => {
  const query = {};
  if (params.product) query.product = params.product;
  if (params.year) query.year = params.year;

  const { data } = await api.get("/diagnoses/", { params: query });
  return normalizeList(data);
};

export const getDiagnosis = async (diagnosisId) => {
  const { data } = await api.get(`/diagnoses/${diagnosisId}/`);
  return data;
};

export const createDiagnosis = async ({ product, image }) => {
  const formData = new FormData();
  formData.append("product", product);
  formData.append("image", image);

  const { data } = await api.post("/diagnoses/", formData);
  return data;
};

export const updateDiagnosis = async (diagnosisId, { product, image } = {}) => {
  const formData = new FormData();
  if (product != null && product !== "") {
    formData.append("product", product);
  }
  if (image) formData.append("image", image);

  const { data } = await api.patch(`/diagnoses/${diagnosisId}/`, formData);
  return data;
};

export const deleteDiagnosis = async (diagnosisId) => {
  await api.delete(`/diagnoses/${diagnosisId}/`);
};

export const waitForDiagnosis = async (
  diagnosisId,
  { intervalMs = 2000, maxAttempts = 45 } = {},
) => {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const latest = await getDiagnosis(diagnosisId);
    const status = String(latest?.status || "").toUpperCase();

    if (status === "DONE" || status === "FAILED") {
      return latest;
    }

    await sleep(intervalMs);
  }

  throw new Error(
    "진단 시간이 초과되었어요. 잠시 후 진단 이력에서 결과를 확인해 주세요.",
  );
};
