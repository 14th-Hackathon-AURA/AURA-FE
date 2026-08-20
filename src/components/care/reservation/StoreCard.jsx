import styled from "styled-components";
import Button from "@components/common/Button";
import { formatStoreDistance } from "@utils/storeMappers";

const StoreCard = ({ store, onSelect }) => (
  <Card>
    <StoreName>{store.name}</StoreName>
    <Meta>
      {store.address}
      {store.openingHours ? ` | ${store.openingHours}` : ""}
    </Meta>
    <Meta>{formatStoreDistance(store.distanceKm)}</Meta>
    <SelectButton type="button" onClick={() => onSelect(store)}>
      선택하기
    </SelectButton>
  </Card>
);

export default StoreCard;

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

const SelectButton = styled(Button)`
  align-self: flex-start;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
`;
