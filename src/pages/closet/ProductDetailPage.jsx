import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import DetailHero from "@components/closet/detail/DetailHero";
import DetailInfoSection from "@components/closet/detail/DetailInfoSection";
import ConditionStatusCards from "@components/closet/detail/ConditionStatusCards";
import { getClosetProductById } from "@mocks/closetMockData";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = getClosetProductById(productId);

  const infoItems = [
    { label: "카테고리", value: product.subCategory },
    { label: "구매처", value: product.purchasePlace },
    { label: "구매일", value: product.purchaseDate },
    { label: "시리얼 번호", value: product.serialNumber },
  ];

  if (!product) {
    return (
      <PageWrapper>
        <PageHeader title="제품 상세" backTo="/closet" />
        <EmptyState>제품을 찾을 수 없습니다.</EmptyState>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageHeader title="제품 상세" backTo="/closet" />

      <Main>
        <DetailHero product={product} />
        <DetailInfoSection items={infoItems} />

        <DiagnosisSection>
          <DiagnosisHeader>
            <DiagnosisTitle>상태 진단 내역</DiagnosisTitle>
            <DiagnosisDate>{product.diagnosisDate} 진단</DiagnosisDate>
          </DiagnosisHeader>
          <ConditionStatusCards />
        </DiagnosisSection>
      </Main>
    </PageWrapper>
  );
};

export default ProductDetailPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
`;

const DiagnosisSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem;
`;

const DiagnosisHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.2rem;
`;

const DiagnosisTitle = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const DiagnosisDate = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;

const EmptyState = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 4rem 2rem;
  font-size: 1.4rem;
  color: var(--color-mediumgray);
`;
