import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCommunityStore from "@hooks/community/useCommunityStore";

const SUBMIT_COMPLETE_REDIRECT_DELAY = 1200;

const usePostWriteForm = () => {
  const navigate = useNavigate();
  const { addPost } = useCommunityStore();
  const titleInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [taggedProduct, setTaggedProduct] = useState(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      if (!title.trim()) {
        titleInputRef.current?.focus();
        return;
      }

      addPost({
        title: title.trim(),
        content: content.trim(),
        images: imagePreviewUrl ? [imagePreviewUrl] : [],
        taggedProduct,
      });

      setIsSubmitted(true);
    },
    [title, content, imagePreviewUrl, taggedProduct, addPost],
  );

  useEffect(() => {
    if (!isSubmitted) return;
    const timer = setTimeout(() => navigate("/community"), SUBMIT_COMPLETE_REDIRECT_DELAY);
    return () => clearTimeout(timer);
  }, [isSubmitted, navigate]);

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
    titleInputRef,
    isSubmitted,
    handleSubmit,
  };
};

export default usePostWriteForm;
