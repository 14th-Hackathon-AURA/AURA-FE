import styled from "styled-components";
import HistoryCard from "./HistoryCard";

const HistoryList = ({ items, onEdit, onDelete }) => {
  if (items.length === 0) {
    return <EmptyText>진단 이력이 없습니다.</EmptyText>;
  }

  return (
    <List>
      {items.map((item) => (
        <HistoryCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

export default HistoryList;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const EmptyText = styled.p`
  margin: 4rem 0 0;
  font-size: 1.4rem;
  color: var(--color-gray);
  text-align: center;
`;
