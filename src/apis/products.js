import api from "./client";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.products)) return data.products;
  return [];
};

export const getMyProducts = async () => {
  const { data } = await api.get("/products/");
  return normalizeList(data);
};

export const getProduct = async (productId) => {
  const { data } = await api.get(`/products/${productId}/`);
  return data;
};

export const createProduct = async (payload) => {
  const { image, ...fields } = payload;

  if (image) {
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      if (value != null && value !== "") formData.append(key, value);
    });
    formData.append("image", image);

    const { data } = await api.post("/products/", formData);
    return data;
  }

  const { data } = await api.post("/products/", fields);
  return data;
};

export const updateProduct = async (productId, payload) => {
  const { image, ...fields } = payload;

  if (image) {
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      if (value != null && value !== "") formData.append(key, value);
    });
    formData.append("image", image);

    const { data } = await api.patch(`/products/${productId}/`, formData);
    return data;
  }

  const { data } = await api.patch(`/products/${productId}/`, fields);
  return data;
};

export const deleteProduct = async (productId) => {
  await api.delete(`/products/${productId}/`);
};

export const createProductImage = async ({ product, image, kind }) => {
  const formData = new FormData();
  formData.append("product", product);
  formData.append("image", image);
  formData.append("kind", kind);

  const { data } = await api.post("/product-images/", formData);
  return data;
};

export const deleteProductImage = async (imageId) => {
  await api.delete(`/product-images/${imageId}/`);
};

export const extractDocument = async ({
  document,
  documentType = "receipt",
}) => {
  const formData = new FormData();
  formData.append("document", document);
  formData.append("document_type", documentType);

  const { data } = await api.post("/products/extract-document/", formData);
  return data;
};
