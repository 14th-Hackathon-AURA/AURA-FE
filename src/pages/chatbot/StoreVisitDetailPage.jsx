import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import Button from "@components/common/Button";
import useMemberProfile from "@hooks/useMemberProfile";
import {
  formatVisitNeedsSummary,
  getStoreVisitCardById,
} from "@mocks/storeVisitMockData";

const StoreVisitDetailPage = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const { nickname } = useMemberProfile();
  const card = getStoreVisitCardById(cardId);

  if (!card) {
    return (
      <PageWrapper>
        <PageHeader title="AI 방문 카드 상세" backTo="/chatbot/store-visit" />
        <EmptyState>방문 카드를 찾을 수 없습니다.</EmptyState>
      </PageWrapper>
    );
  }

  const displayName = nickname || "아기사자";
  const needsSummary = formatVisitNeedsSummary(card.needsSummary, displayName);

  return (
    <PageWrapper>
      <PageHeader title="AI 방문 카드 상세" backTo="/chatbot/store-visit" />

      <Main>
        <Heading>
          매장 방문 시
          <br />
          도움이 될 내용을 요약했어요
        </Heading>

        <SummaryCard>
          <ProductBlock>
            <ProductImage src={card.image} alt={card.name} />
            <ProductMeta>
              <ProductLabel>제품명</ProductLabel>
              <ProductName>{card.name}</ProductName>
              <ProductPrice>{card.price}</ProductPrice>
            </ProductMeta>
          </ProductBlock>

          <NeedsBlock>
            <NeedsTitle>{displayName}님의 니즈를 정리했어요</NeedsTitle>
            <NeedsText>{needsSummary}</NeedsText>
            <TagList>
              {card.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>
          </NeedsBlock>
        </SummaryCard>

        <ReserveButton
          type="button"
          onClick={() => navigate("/chatbot/store-list", { state: { cardId } })}
        >
          매장 예약하기
        </ReserveButton>
      </Main>
    </PageWrapper>
  );
};

export default StoreVisitDetailPage;

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
  padding: 2.4rem;
  gap: 1.6rem;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-black);
`;

const SummaryCard = styled.article`
  --gold: #d4af37;
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  border-radius: 0.4rem;
  background: var(--color-primary);
  box-shadow: 0 8px 20px 0 rgba(45, 27, 51, 0.04);
  gap: 1.8rem;
`;

const ProductBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ProductImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.4rem;
  background: #e5e5e5;
`;

const ProductMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ProductLabel = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gold);
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--gold);
`;

const ProductPrice = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gold);
`;

const NeedsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const NeedsTitle = styled.h4`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-white);
`;

const NeedsText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-white);
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.6rem;
`;

const Tag = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gold);
  text-decoration: underline;
  text-underline-offset: 0.2rem;
`;

const ReserveButton = styled(Button)`
  align-self: flex-start;
  width: auto;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  background: var(--color-white);
  border: 1px solid var(--color-black);
  color: var(--color-black);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
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
