import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import StoreSearchBar from "@components/care/reservation/StoreSearchBar";
import StoreInfoCard from "@components/chatbot/StoreInfoCard";
import useMemberProfile from "@hooks/useMemberProfile";
import { getStores } from "@apis/stores";
import { getCurrentPosition, mapStore } from "@utils/storeMappers";

const SEARCH_DEBOUNCE_MS = 300;

const StoreListPage = () => {
  const location = useLocation();
  const { nickname } = useMemberProfile();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const backTo = location.state?.cardId
    ? `/chatbot/store-visit/${location.state.cardId}`
    : "/chatbot/store-visit";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    let mounted = true;

    const loadStores = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const coords = await getCurrentPosition();
        const response = await getStores({
          q: debouncedQuery || undefined,
          latitude: coords.latitude,
          longitude: coords.longitude,
          limit: 20,
        });

        if (!mounted) return;
        setStores(response.stores.map(mapStore));
      } catch {
        if (!mounted) return;
        setStores([]);
        setErrorMessage("매장 목록을 불러오지 못했어요.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadStores();

    return () => {
      mounted = false;
    };
  }, [debouncedQuery]);

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
          {isLoading ? (
            <StatusText>불러오는 중...</StatusText>
          ) : errorMessage ? (
            <StatusText>{errorMessage}</StatusText>
          ) : stores.length === 0 ? (
            <StatusText>검색 결과가 없습니다.</StatusText>
          ) : (
            <StoreList>
              {stores.map((store) => (
                <StoreInfoCard key={store.id} store={store} />
              ))}
            </StoreList>
          )}
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

const StatusText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-placeholder-gray);
`;

const StoreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
