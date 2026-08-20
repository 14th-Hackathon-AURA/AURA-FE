import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import StoreSearchBar from "@components/care/reservation/StoreSearchBar";
import StoreList from "@components/care/reservation/StoreList";
import warnIcon from "@assets/icons/care/warn.svg";
import useMemberProfile from "@hooks/useMemberProfile";
import { getStores } from "@apis/stores";
import { getCurrentPosition, mapStore } from "@utils/storeMappers";

const SEARCH_DEBOUNCE_MS = 300;

const StoreSelectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname } = useMemberProfile();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const reservationState = {
    form: location.state?.form,
    storeId: location.state?.storeId ?? "",
    storeName: location.state?.storeName ?? "",
  };

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

  const goBackToReservation = () => {
    navigate("/care/reservation", { state: reservationState });
  };

  const handleSelect = (store) => {
    navigate("/care/reservation", {
      state: {
        form: location.state?.form,
        storeId: store.id,
        storeName: store.name,
      },
    });
  };

  return (
    <PageWrapper>
      <PageHeader title="예약 매장 선택" onBack={goBackToReservation} />

      <Main>
        <Headline>
          {(nickname || "아기사자").trim()}님에게
          <br />
          가까운 매장을 찾아왔어요
        </Headline>
        <Subtext>공식 AS 매장을 확인하세요</Subtext>

        <StoreSearchBar value={query} onChange={setQuery} />

        <Section>
          <SectionTitle>추천 매장</SectionTitle>
          {isLoading ? (
            <StatusText>불러오는 중...</StatusText>
          ) : errorMessage ? (
            <StatusText>{errorMessage}</StatusText>
          ) : (
            <StoreList stores={stores} onSelect={handleSelect} />
          )}
        </Section>

        <Notice>
          <WarnIcon src={warnIcon} alt="" />
          <NoticeText>
            실제 방문 예약 확정 및 수리 비용 산정은 해당 매장 정책에 따릅니다.
          </NoticeText>
        </Notice>
      </Main>
    </PageWrapper>
  );
};

export default StoreSelectPage;

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

const Notice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-top: 1.6rem;
`;

const WarnIcon = styled.img`
  flex-shrink: 0;
  width: 1.4rem;
  height: 1.4rem;
  margin-top: 0.2rem;
`;

const NoticeText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-placeholder-gray);
`;
