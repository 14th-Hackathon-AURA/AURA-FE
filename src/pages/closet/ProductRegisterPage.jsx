import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import Button from "@components/common/Button";
import CompleteOverlay from "@components/common/CompleteOverlay";
import ReceiptUploader from "@components/closet/register/ReceiptUploader";
import ProductInfoForm from "@components/closet/register/ProductInfoForm";
import useProductRegisterForm from "@hooks/useProductRegisterForm";
import { PRODUCT_REGISTER_CATEGORIES } from "@mocks/closetMockData";

const MANUAL_FIELD_LABELS = {
  brand: "브랜드",
  name: "제품명",
  category: "카테고리",
  purchased_at: "구매일",
  purchase_place: "구매처",
  purchase_price: "구매가",
  purchase_channel: "구매 채널",
};

const ProductRegisterPage = () => {
  const {
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
  } = useProductRegisterForm();

  return (
    <PageWrapper>
      <PageHeader title="제품 등록" backTo="/closet" />

      <Main as="form" onSubmit={handleSubmit}>
        <ReceiptUploader
          previewUrl={previewUrl}
          isExtracting={isExtracting}
          onChange={handleImageChange}
        />

        {manualInputRequired.length > 0 && (
          <ManualNotice>
            아래 항목은 직접 입력해주세요:{" "}
            {manualInputRequired
              .map((field) => MANUAL_FIELD_LABELS[field] || field)
              .join(", ")}
          </ManualNotice>
        )}

        <ProductInfoForm
          values={form}
          onChangeField={updateField}
          categoryOptions={PRODUCT_REGISTER_CATEGORIES}
        />

        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <SubmitButton type="submit" disabled={isSubmitting || isExtracting}>
          {isSubmitting ? "등록 중..." : "클로젯에 등록하기"}
        </SubmitButton>
      </Main>

      {isSubmitted && <CompleteOverlay message="제품 등록이 완료되었습니다" />}
    </PageWrapper>
  );
};

export default ProductRegisterPage;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
`;

const ManualNotice = styled.p`
  margin: 0 0 1.6rem;
  padding: 1.2rem;
  border-radius: 0.4rem;
  background: var(--color-soft-gray);
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-darkgray);
`;

const ErrorText = styled.p`
  margin: 1.6rem 0 0;
  font-size: 1.2rem;
  color: var(--color-primary);
`;

const SubmitButton = styled(Button)`
  align-self: flex-start;
  width: auto;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 400;
  border-radius: 0.2rem;
  margin-top: 1.6rem;

  &:disabled {
    opacity: 0.6;
  }
`;
