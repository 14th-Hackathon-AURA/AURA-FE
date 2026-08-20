import styled from "styled-components";
import StoreCard from "./StoreCard";

const StoreList = ({ stores, onSelect }) => {
  if (stores.length === 0) {
    return <Empty>검색 결과가 없습니다.</Empty>;
  }

  return (
    <List>
      {stores.map((store) => (
        <li key={store.id}>
          <StoreCard store={store} onSelect={onSelect} />
        </li>
      ))}
    </List>
  );
};

export default StoreList;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Empty = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-placeholder-gray);
`;
