import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import Button from "@components/common/Button";
import CompleteOverlay from "@components/common/CompleteOverlay";
import ReceiptUploader from "@components/closet/register/ReceiptUploader";
import ProductInfoForm from "@components/closet/register/ProductInfoForm";
import useProductRegisterForm from "@hooks/useProductRegisterForm";
import { PRODUCT_REGISTER_CATEGORIES } from "@mocks/closetMockData";

const ProductRegisterPage = () => {
  const {
    form,
    updateField,
    previewUrl,
    handleImageChange,
    isSubmitted,
    handleSubmit,
  } = useProductRegisterForm();

  return (
    <PageWrapper>
      <PageHeader title="제품 등록" backTo="/closet" />

      <Main as="form" onSubmit={handleSubmit}>
        <ReceiptUploader previewUrl={previewUrl} onChange={handleImageChange} />

        <ProductInfoForm
          values={form}
          onChangeField={updateField}
          categoryOptions={PRODUCT_REGISTER_CATEGORIES}
        />

        <SubmitButton type="submit">클로젯에 등록하기</SubmitButton>
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

const SubmitButton = styled(Button)`
  align-self: flex-start;
  width: auto;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 400;
  border-radius: 0.2rem;
  margin-top: 1.6rem;
`;
