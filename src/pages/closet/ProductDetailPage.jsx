import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import DetailHero from "@components/closet/detail/DetailHero";
import DetailInfoSection from "@components/closet/detail/DetailInfoSection";
import ConditionStatusCards from "@components/closet/detail/ConditionStatusCards";
import { mapProduct } from "@utils/productMappers";
import { getProduct } from "@apis/products";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [requestId, setRequestId] = useState(productId);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  if (productId !== requestId) {
    setRequestId(productId);
    setProduct(null);
    setIsLoading(true);
    setNotFound(false);
  }

  useEffect(() => {
    let mounted = true;

    getProduct(productId)
      .then((data) => {
        if (mounted) setProduct(mapProduct(data));
      })
      .catch(() => {
        if (mounted) setNotFound(true);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [productId]);

  const infoItems = useMemo(
    () =>
      product
        ? [
            { label: "카테고리", value: product.subCategory || "-" },
            { label: "구매처", value: product.purchasePlace || "-" },
            { label: "구매일", value: product.purchaseDate || "-" },
            { label: "시리얼 번호", value: product.serialNumber },
          ]
        : [],
    [product],
  );

  if (isLoading) {
    return (
      <PageWrapper>
        <PageHeader title="제품 상세" backTo="/closet" />
        <EmptyState>불러오는 중...</EmptyState>
      </PageWrapper>
    );
  }

  if (notFound || !product) {
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

        {product.diagnosisDate && (
          <DiagnosisSection>
            <DiagnosisHeader>
              <DiagnosisTitle>상태 진단 내역</DiagnosisTitle>
              <DiagnosisDate>{product.diagnosisDate} 진단</DiagnosisDate>
            </DiagnosisHeader>
            <ConditionStatusCards conditionLevel={product.conditionLevel} />
          </DiagnosisSection>
        )}
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
