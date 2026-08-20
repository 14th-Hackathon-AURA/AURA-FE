import styled from "styled-components";
import Button from "@components/common/Button";
import { formatStoreDistance } from "@utils/storeMappers";

const StoreInfoCard = ({ store }) => {
  const handleMapClick = () => {
    if (store.mapSearchUrl) {
      window.open(store.mapSearchUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const query = encodeURIComponent(
      `${store.name || ""} ${store.address || ""}`.trim(),
    );
    window.open(
      `https://map.naver.com/p/search/${query}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleCallClick = () => {
    if (!store.phone) return;
    window.location.href = `tel:${store.phone}`;
  };

  return (
    <Card>
      <StoreName>{store.name}</StoreName>

      <Meta>
        {store.address}
        {store.openingHours ? ` | ${store.openingHours}` : ""}
      </Meta>
      <Meta>{formatStoreDistance(store.distanceKm)}</Meta>

      <ButtonRow>
        <MapButton type="button" onClick={handleMapClick}>
          지도 보기
        </MapButton>
        <CallButton
          type="button"
          onClick={handleCallClick}
          disabled={!store.phone}
        >
          전화 연결
        </CallButton>
      </ButtonRow>
    </Card>
  );
};

export default StoreInfoCard;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.2rem;
  border-radius: 0.4rem;
  background: var(--color-soft-gray);
  gap: 1.2rem;
`;

const StoreName = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-black);
`;

const Meta = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;

const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  gap: 1.2rem;
`;

const MapButton = styled(Button)`
  align-self: flex-start;
  padding: 1.2rem 3.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
`;

const CallButton = styled(Button)`
  align-self: flex-start;
  padding: 1.2rem 3.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
  background: var(--color-white);
  border: 1px solid var(--color-black);
  color: var(--color-black);

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
