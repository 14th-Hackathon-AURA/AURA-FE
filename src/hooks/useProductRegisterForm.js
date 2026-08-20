import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  createProductImage,
  extractDocument,
} from "@apis/products";
import {
  buildProductPayload,
  formatApiError,
  mapExtractDocumentToForm,
} from "@utils/productMappers";

const SUBMIT_COMPLETE_REDIRECT_DELAY = 1200;

const INITIAL_FORM = {
  brand: "",
  productName: "",
  category: "",
  purchaseDate: null,
  purchasePlace: "",
  memo: "",
  purchasePrice: "",
  purchaseChannel: "",
};

const DOCUMENT_KIND = {
  receipt: "RECEIPT",
  warranty: "WARRANTY",
};

const useProductRegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [documentType, setDocumentType] = useState("receipt");
  const [manualInputRequired, setManualInputRequired] = useState([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleImageChange = useCallback(async (file, type = "receipt") => {
    if (!file) return;

    setDocumentFile(file);
    setDocumentType(type);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    setIsExtracting(true);
    setErrorMessage("");

    try {
      const response = await extractDocument({
        document: file,
        documentType: type,
      });
      setForm((prev) => ({ ...prev, ...mapExtractDocumentToForm(response) }));
      setManualInputRequired(response.manual_input_required ?? []);
    } catch {
      setManualInputRequired([]);
      setErrorMessage("문서 분석에 실패했어요. 아래 정보를 직접 입력해주세요.");
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (isSubmitting) return;

      if (!form.productName?.trim()) {
        setErrorMessage("제품명을 입력해주세요.");
        return;
      }

      setIsSubmitting(true);
      setErrorMessage("");

      try {
        const payload = buildProductPayload(form);
        const created = await createProduct(payload);

        if (documentFile) {
          await createProductImage({
            product: created.id,
            image: documentFile,
            kind: DOCUMENT_KIND[documentType] || "RECEIPT",
          });
        }

        setIsSubmitted(true);
      } catch (error) {
        const apiMessage = formatApiError(error.response?.data);
        setErrorMessage(
          apiMessage || "제품 등록에 실패했어요. 다시 시도해주세요.",
        );
        setIsSubmitting(false);
      }
    },
    [documentFile, documentType, form, isSubmitting],
  );

  useEffect(() => {
    if (!isSubmitted) return undefined;

    const timer = setTimeout(
      () => navigate("/closet"),
      SUBMIT_COMPLETE_REDIRECT_DELAY,
    );
    return () => clearTimeout(timer);
  }, [isSubmitted, navigate]);

  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  return {
    form,
    updateField,
    previewUrl,
    handleImageChange,
    manualInputRequired,
    isExtracting,
    isSubmitting,
    isSubmitted,
    errorMessage,
    handleSubmit,
  };
};

export default useProductRegisterForm;
