import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SUBMIT_COMPLETE_REDIRECT_DELAY = 1200;

const INITIAL_FORM = {
  brand: "",
  productName: "",
  category: "",
  purchaseDate: "",
  purchasePlace: "",
  memo: "",
};

const useProductRegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleImageChange = useCallback((file) => {
    if (!file) return;

    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setIsSubmitted(true);
  }, []);

  useEffect(() => {
    if (!isSubmitted) return undefined;

    const timer = setTimeout(
      () => navigate("/closet"),
      SUBMIT_COMPLETE_REDIRECT_DELAY,
    );
    return () => clearTimeout(timer);
  }, [isSubmitted, navigate]);

  return {
    form,
    updateField,
    previewUrl,
    handleImageChange,
    isSubmitted,
    handleSubmit,
  };
};

export default useProductRegisterForm;
