import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCommunityStore from "@hooks/community/useCommunityStore";

const usePostWriteForm = () => {
  const navigate = useNavigate();
  const { addPost } = useCommunityStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [taggedProduct, setTaggedProduct] = useState(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const handleImageChange = useCallback((file) => {
    if (!file) return;
    setImagePreviewUrl(URL.createObjectURL(file));
  }, []);

  const openTagModal = useCallback(() => setIsTagModalOpen(true), []);
  const closeTagModal = useCallback(() => setIsTagModalOpen(false), []);

  const confirmTag = useCallback((product) => {
    setTaggedProduct(product);
    setIsTagModalOpen(false);
  }, []);

  const removeTag = useCallback(() => setTaggedProduct(null), []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!title.trim()) return;

      addPost({
        title: title.trim(),
        content: content.trim(),
        images: imagePreviewUrl ? [imagePreviewUrl] : [],
        taggedProduct,
      });

      navigate("/community");
    },
    [title, content, imagePreviewUrl, taggedProduct, addPost, navigate],
  );

  return {
    title,
    setTitle,
    content,
    setContent,
    imagePreviewUrl,
    handleImageChange,
    taggedProduct,
    removeTag,
    isTagModalOpen,
    openTagModal,
    closeTagModal,
    confirmTag,
    handleSubmit,
  };
};

export default usePostWriteForm;
