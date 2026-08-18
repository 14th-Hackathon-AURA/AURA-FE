import api from "./client";

export const getPosts = async () => {
  const { data } = await api.get("/posts/");
  return data;
};

export const getPost = async (postId) => {
  const { data } = await api.get(`/posts/${postId}/`);
  return data;
};

export const createPost = async ({ title, body, image, taggedProductIds = [] }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  if (image) formData.append("image", image);
  taggedProductIds.forEach((id) => formData.append("tagged_products", id));

  const { data } = await api.post("/posts/", formData);
  return data;
};

export const deletePost = async (postId) => {
  await api.delete(`/posts/${postId}/`);
};

export const createComment = async (postId, body) => {
  const { data } = await api.post("/comments/", { post: postId, body });
  return data;
};

export const getMyPostLikes = async () => {
  const { data } = await api.get("/post-likes/");
  return data;
};

export const likePost = async (postId) => {
  const { data } = await api.post("/post-likes/", { post: postId });
  return data;
};

export const unlikePost = async (likeId) => {
  await api.delete(`/post-likes/${likeId}/`);
};
