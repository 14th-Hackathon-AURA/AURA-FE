import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import StoreSearchBar from "@components/care/reservation/StoreSearchBar";
import StoreInfoCard from "@components/chatbot/StoreInfoCard";
import useMemberProfile from "@hooks/useMemberProfile";
import { MOCK_CERTIFIED_STORES } from "@mocks/storeVisitMockData";

const StoreListPage = () => {
  const location = useLocation();
  const { nickname } = useMemberProfile();
  const [query, setQuery] = useState("");

  const backTo = location.state?.cardId
    ? `/chatbot/store-visit/${location.state.cardId}`
    : "/chatbot/store-visit";

  const filteredStores = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return MOCK_CERTIFIED_STORES;

    return MOCK_CERTIFIED_STORES.filter(
      (store) =>
        store.name.toLowerCase().includes(keyword) ||
        store.address.toLowerCase().includes(keyword),
    );
  }, [query]);

  return (
    <PageWrapper>
      <PageHeader title="매장 정보" backTo={backTo} />

      <Main>
        <Headline>
          {(nickname || "아기사자").trim()}님에게
          <br />
          가까운 매장을 찾아왔어요
        </Headline>
        <Subtext>공식 인증 매장을 확인하세요</Subtext>

        <StoreSearchBar value={query} onChange={setQuery} />

        <Section>
          <SectionTitle>추천 매장</SectionTitle>
          <StoreList>
            {filteredStores.map((store) => (
              <StoreInfoCard key={store.id} store={store} />
            ))}
          </StoreList>
        </Section>
      </Main>
    </PageWrapper>
  );
};

export default StoreListPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 2.4rem;
  overflow-y: auto;
`;

const Headline = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-black);
`;

const Subtext = styled.p`
  margin: 0.8rem 0 1.6rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-black);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 1.6rem;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const StoreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
