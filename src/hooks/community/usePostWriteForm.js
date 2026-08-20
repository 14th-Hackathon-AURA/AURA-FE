import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCommunityStore from "@hooks/community/useCommunityStore";
import { getMyProducts } from "@apis/products";

const SUBMIT_COMPLETE_REDIRECT_DELAY = 1200;

const formatRegisteredLabel = (createdAt) =>
  createdAt ? `${new Date(createdAt).getFullYear()}년 등록` : "";

const usePostWriteForm = () => {
  const navigate = useNavigate();
  const { addPost } = useCommunityStore();
  const titleInputRef = useRef(null);
  const contentInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [taggedProduct, setTaggedProduct] = useState(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [closetItems, setClosetItems] = useState([]);

  const handleImageChange = useCallback((file) => {
    if (!file) return;
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  }, []);

  const openTagModal = useCallback(async () => {
    setIsTagModalOpen(true);
    try {
      const products = await getMyProducts();
      setClosetItems(
        products.map((product) => ({
          id: product.id,
          name: product.name,
          category: product.category,
          registeredLabel: formatRegisteredLabel(product.created_at),
          image: product.image || null,
        })),
      );
    } catch {
      setClosetItems([]);
    }
  }, []);

  const closeTagModal = useCallback(() => setIsTagModalOpen(false), []);

  const confirmTag = useCallback((product) => {
    setTaggedProduct(product);
    setIsTagModalOpen(false);
  }, []);

  const removeTag = useCallback(() => setTaggedProduct(null), []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!title.trim()) {
        titleInputRef.current?.focus();
        return;
      }
      if (!content.trim()) {
        contentInputRef.current?.focus();
        return;
      }
      if (isSubmitting) return;

      setIsSubmitting(true);
      setErrorMessage("");
      try {
        await addPost({
          title: title.trim(),
          content: content.trim(),
          imageFile,
          taggedProductId: taggedProduct?.id ?? null,
        });
        setIsSubmitted(true);
      } catch {
        setErrorMessage("게시물을 등록하지 못했어요. 다시 시도해주세요.");
        setIsSubmitting(false);
      }
    },
    [title, content, imageFile, taggedProduct, addPost, isSubmitting],
  );

  useEffect(() => {
    if (!isSubmitted) return;
    const timer = setTimeout(
      () => navigate("/community"),
      SUBMIT_COMPLETE_REDIRECT_DELAY,
    );
    return () => clearTimeout(timer);
  }, [isSubmitted, navigate]);

  return {
    title,
    setTitle,
    content,
    setContent,
    contentInputRef,
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
    isSubmitting,
    errorMessage,
    handleSubmit,
    closetItems,
  };
};

export default usePostWriteForm;
