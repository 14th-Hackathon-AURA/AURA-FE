import styled from "styled-components";
import Button from "@components/common/Button";

const StoreInfoCard = ({ store }) => {
  const statusLabel = store.isOpen ? "영업 중" : "영업 종료";

  const handleMapClick = () => {
    const query = encodeURIComponent(`${store.name} ${store.address}`);
    window.open(
      `https://map.kakao.com/?q=${query}`,
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
        {store.address} | {statusLabel} · {store.hours}
      </Meta>
      <Meta>현재 위치에서 약 {store.distanceKm} km</Meta>

      <ButtonRow>
        <MapButton type="button" onClick={handleMapClick}>
          지도 보기
        </MapButton>
        <CallButton type="button" onClick={handleCallClick}>
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
`;
