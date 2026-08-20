import { Fragment, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import CompleteOverlay from "@components/common/CompleteOverlay";
import VisitCardSearchBar from "@components/chatbot/VisitCardSearchBar";
import StoreVisitCard from "@components/chatbot/StoreVisitCard";
import { MOCK_STORE_VISIT_CARDS } from "@mocks/storeVisitMockData";

const StoreVisitPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState(MOCK_STORE_VISIT_CARDS);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!menuOpenId) return undefined;

    const handlePointerDown = () => setMenuOpenId(null);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpenId]);

  useEffect(() => {
    if (!showToast) return undefined;

    const timer = window.setTimeout(() => setShowToast(false), 1500);
    return () => window.clearTimeout(timer);
  }, [showToast]);

  const filteredCards = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) return cards;

    return cards.filter((card) => {
      const matchesName = card.name.toLowerCase().includes(normalizedQuery);
      const matchesTag = card.tags.some((tag) =>
        tag.toLowerCase().includes(normalizedQuery),
      );

      return matchesName || matchesTag;
    });
  }, [cards, searchQuery]);

  const handleToggleMenu = (event, cardId) => {
    event.stopPropagation();
    setMenuOpenId((prev) => (prev === cardId ? null : cardId));
  };

  const handleDelete = (cardId) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
    setMenuOpenId(null);
    setShowToast(true);
  };

  return (
    <PageWrapper>
      <PageHeader title="AI 방문 카드" backTo="/chatbot" />

      <Main>
        <Heading>
          상담 내용을
          <br />
          카드 형식으로 정리했어요
        </Heading>

        <VisitCardSearchBar value={searchQuery} onChange={setSearchQuery} />

        <CardList>
          {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <Fragment key={card.id}>
                {index > 0 && <CardDivider />}
                <StoreVisitCard
                  card={card}
                  isMenuOpen={menuOpenId === card.id}
                  onToggleMenu={handleToggleMenu}
                  onDelete={handleDelete}
                />
              </Fragment>
            ))
          ) : (
            <EmptyText>검색 결과가 없습니다.</EmptyText>
          )}
        </CardList>
      </Main>

      {showToast && (
        <CompleteOverlay
          message="삭제되었습니다."
          onClose={() => setShowToast(false)}
        />
      )}
    </PageWrapper>
  );
};

export default StoreVisitPage;

const PageWrapper = styled.div`
  position: relative;
  min-height: 100dvh;
  background: var(--color-white);
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-black);
`;

const CardList = styled.section`
  display: flex;
  flex-direction: column;
`;

const CardDivider = styled.hr`
  margin: 1.6rem 0;
  border: 0;
  height: 1px;
  background: #e4e2e6;
`;

const EmptyText = styled.p`
  margin: 4rem 0 0;
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--color-placeholder-gray);
  text-align: center;
`;
