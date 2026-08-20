import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import CareAccordion from "@components/closet/care/CareAccordion";
import CareChecklist from "@components/closet/care/CareChecklist";
import CareCenterCta from "@components/closet/care/CareCenterCta";
import useMemberProfile from "@hooks/useMemberProfile";
import { buildCareGuideView } from "@utils/careGuideMappers";
import { mapProduct } from "@utils/productMappers";
import { getCareGuides } from "@apis/careGuides";
import { getProduct } from "@apis/products";

const CareGuidePage = () => {
  const { productId } = useParams();
  const { nickname } = useMemberProfile();
  const [requestId, setRequestId] = useState(productId);
  const [product, setProduct] = useState(null);
  const [guide, setGuide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [guideError, setGuideError] = useState(false);

  if (productId !== requestId) {
    setRequestId(productId);
    setProduct(null);
    setGuide(null);
    setIsLoading(true);
    setNotFound(false);
    setGuideError(false);
  }

  useEffect(() => {
    let mounted = true;

    getProduct(productId)
      .then(async (data) => {
        const mappedProduct = mapProduct(data);
        if (!mounted) return;

        setProduct(mappedProduct);

        try {
          const guides = await getCareGuides({
            material: mappedProduct.material,
          });
          if (!mounted) return;
          setGuide(
            buildCareGuideView(guides, { material: mappedProduct.material }),
          );
        } catch {
          if (!mounted) return;
          setGuideError(true);
          setGuide(null);
        }
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

  if (isLoading) {
    return (
      <PageWrapper>
        <PageHeader title="케어 가이드" backTo="/closet" />
        <EmptyState>불러오는 중...</EmptyState>
      </PageWrapper>
    );
  }

  if (notFound || !product) {
    return (
      <PageWrapper>
        <PageHeader title="케어 가이드" backTo="/closet" />
        <EmptyState>제품을 찾을 수 없습니다.</EmptyState>
      </PageWrapper>
    );
  }

  if (guideError) {
    return (
      <PageWrapper>
        <PageHeader title="케어 가이드" backTo={`/closet/${productId}`} />
        <EmptyState>케어 가이드를 불러오지 못했어요.</EmptyState>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageHeader title="케어 가이드" backTo={`/closet/${productId}`} />

      <Main>
        <Headline>
          {nickname}님의 소중한 제품,
          <br />
          관리법을 꼼꼼하게 알려드릴게요
        </Headline>

        {guide?.isEmpty ? (
          <EmptyState $inline>등록된 케어 가이드가 아직 없어요.</EmptyState>
        ) : (
          <>
            {guide?.dailyGuides?.length > 0 && (
              <Section>
                <SectionTitle>일상 관리 가이드</SectionTitle>
                <AccordionList>
                  {guide.dailyGuides.map((item) => (
                    <CareAccordion
                      key={item.id}
                      title={item.title}
                      items={item.items}
                    />
                  ))}
                </AccordionList>
              </Section>
            )}

            {guide?.checklist?.length > 0 && (
              <CareChecklist
                title="보관 및 사용 전후 체크리스트"
                items={guide.checklist}
              />
            )}

            {guide?.seasonalGuides?.length > 0 && (
              <Section>
                <SectionTitle>계절별 관리 주의사항</SectionTitle>
                <AccordionList>
                  {guide.seasonalGuides.map((item) => (
                    <CareAccordion
                      key={item.id}
                      title={
                        item.season
                          ? `${item.season} · ${item.title}`
                          : item.title
                      }
                      items={item.items}
                    />
                  ))}
                </AccordionList>
              </Section>
            )}
          </>
        )}

        <CareCenterCta href={guide?.asCenterUrl} />
      </Main>
    </PageWrapper>
  );
};

export default CareGuidePage;

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

const Headline = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-black);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const EmptyState = styled.p`
  ${({ $inline }) =>
    $inline
      ? `
    margin: 0;
    padding: 2.4rem 0;
  `
      : `
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 4rem 2rem;
  `}
  font-size: 1.4rem;
  color: var(--color-mediumgray);
`;
