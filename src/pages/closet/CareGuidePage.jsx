import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import CareAccordion from "@components/closet/care/CareAccordion";
import CareChecklist from "@components/closet/care/CareChecklist";
import CareCenterCta from "@components/closet/care/CareCenterCta";
import useMemberProfile from "@hooks/useMemberProfile";
import { getClosetProductById } from "@mocks/closetMockData";
import { getCareGuideByMaterial } from "@mocks/careGuideMockData";

const CareGuidePage = () => {
  const { productId } = useParams();
  const { nickname } = useMemberProfile();
  const product = getClosetProductById(productId);
  const guide = getCareGuideByMaterial(product.material);

  if (!product) {
    return (
      <PageWrapper>
        <PageHeader title="케어 가이드" backTo="/closet" />
        <EmptyState>제품을 찾을 수 없습니다.</EmptyState>
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

        <Section>
          <SectionTitle>일상 관리 가이드</SectionTitle>
          <AccordionList>
            <CareAccordion
              title={`소재별 기본 관리 원칙: ${guide.material}`}
              items={guide.materialTips}
            />
            <CareAccordion title="바로 챙기면 좋을 습관" items={guide.habits} />
          </AccordionList>
        </Section>

        <CareChecklist
          title="보관 및 사용 전후 체크리스트"
          items={guide.checklist}
        />

        <Section>
          <SectionTitle>계절별 관리 주의사항</SectionTitle>
          <AccordionList>
            {guide.seasonal.map((item) => (
              <CareAccordion
                key={item.id}
                title={item.title}
                items={item.items}
              />
            ))}
          </AccordionList>
        </Section>

        <CareCenterCta href={guide.asCenterUrl} />
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 4rem 2rem;
  font-size: 1.4rem;
  color: var(--color-mediumgray);
`;
