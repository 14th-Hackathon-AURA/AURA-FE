import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "@components/common/BottomNavBar";
import CompleteOverlay from "@components/common/CompleteOverlay";
import DiagnosisUpload from "@components/care/DiagnosisUpload";
import DiagnosisInstructions from "@components/care/DiagnosisInstructions";
import {
  createDiagnosis,
  getDiagnosis,
  updateDiagnosis,
  waitForDiagnosis,
} from "@apis/diagnoses";
import { getMyProducts } from "@apis/products";
import { formatDiagnosisApiError } from "@utils/diagnosisMappers";
import { mapProduct } from "@utils/productMappers";

const CarePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editDiagnosisId = searchParams.get("diagnosisId");

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productId, setProductId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const objectUrlRef = useRef(null);

  const productOptions = useMemo(
    () =>
      products.map((product) => ({
        value: String(product.id),
        label: product.name || `제품 ${product.id}`,
      })),
    [products],
  );

  const clearObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  useEffect(() => () => clearObjectUrl(), [clearObjectUrl]);

  useEffect(() => {
    let mounted = true;

    getMyProducts()
      .then((data) => {
        if (!mounted) return;
        setProducts(data.map(mapProduct));
      })
      .catch(() => {
        if (!mounted) return;
        setProducts([]);
        setErrorMessage("제품 목록을 불러오지 못했어요.");
      })
      .finally(() => {
        if (mounted) setProductsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!editDiagnosisId) return undefined;

    let mounted = true;

    getDiagnosis(editDiagnosisId)
      .then((diagnosis) => {
        if (!mounted) return;

        const nextProductId =
          typeof diagnosis.product === "object"
            ? diagnosis.product?.id
            : diagnosis.product;

        if (nextProductId != null) {
          setProductId(String(nextProductId));
        }

        if (diagnosis.image) {
          clearObjectUrl();
          setPreviewUrl(diagnosis.image);
          setImageFile(null);
        }
      })
      .catch(() => {
        if (mounted) {
          setErrorMessage("수정할 진단 정보를 불러오지 못했어요.");
        }
      });

    return () => {
      mounted = false;
    };
  }, [editDiagnosisId, clearObjectUrl]);

  const handleImageChange = useCallback(
    (file) => {
      if (!file) return;

      clearObjectUrl();
      const nextUrl = URL.createObjectURL(file);
      objectUrlRef.current = nextUrl;
      setImageFile(file);
      setPreviewUrl(nextUrl);
      setErrorMessage("");
    },
    [clearObjectUrl],
  );

  const handleStartDiagnosis = async () => {
    if (isDiagnosing) return;

    if (!productId) {
      setErrorMessage("진단할 제품을 선택해 주세요.");
      return;
    }

    if (!imageFile && !editDiagnosisId) {
      setErrorMessage("진단할 제품 사진을 업로드해 주세요.");
      return;
    }

    if (editDiagnosisId && !imageFile) {
      setErrorMessage("다시 분석하려면 새 사진을 업로드해 주세요.");
      return;
    }

    setIsDiagnosing(true);
    setErrorMessage("");

    try {
      const saved = editDiagnosisId
        ? await updateDiagnosis(editDiagnosisId, {
            product: productId,
            image: imageFile,
          })
        : await createDiagnosis({
            product: productId,
            image: imageFile,
          });

      const diagnosisId = saved?.id;
      if (!diagnosisId) {
        throw new Error("진단 ID를 받지 못했어요.");
      }

      const completed = await waitForDiagnosis(diagnosisId);
      const status = String(completed?.status || "").toUpperCase();

      if (status === "FAILED") {
        setErrorMessage("진단에 실패했어요. 사진을 다시 촬영해 주세요.");
        return;
      }

      navigate(`/care/result/${diagnosisId}`);
    } catch (error) {
      const message =
        formatDiagnosisApiError(error?.response?.data) ||
        error?.message ||
        "진단을 시작하지 못했어요. 잠시 후 다시 시도해 주세요.";
      setErrorMessage(message);
    } finally {
      setIsDiagnosing(false);
    }
  };

  return (
    <PageWrapper>
      <Header>
        <HeaderTitle>AI 케어 진단</HeaderTitle>
      </Header>

      <Main>
        <DiagnosisUpload
          previewUrl={previewUrl}
          isDiagnosing={isDiagnosing}
          productId={productId}
          productOptions={productOptions}
          productsLoading={productsLoading}
          errorMessage={errorMessage}
          onProductChange={(value) => {
            setProductId(value);
            setErrorMessage("");
          }}
          onImageChange={handleImageChange}
          onStartDiagnosis={handleStartDiagnosis}
        />
        <DiagnosisInstructions />
      </Main>

      <BottomNavBar />

      {isDiagnosing && (
        <CompleteOverlay message="AI가 제품을 꼼꼼히 진단 중입니다..." />
      )}
    </PageWrapper>
  );
};

export default CarePage;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: var(--color-white);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2.4rem;
  background: var(--color-primary);
  box-shadow: 0 0.1rem 0.4rem 0 rgba(0, 0, 0, 0.08);
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  min-height: 0;
  padding: 2.4rem 2.4rem 2rem;
  overflow-y: auto;
`;
