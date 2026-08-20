import styled from "styled-components";
import ClosetItemCard from "./ClosetItemCard";

const ClosetItemList = ({
  items,
  menuOpenId,
  onToggleMenu,
  onDelete,
  onEdit,
}) => (
  <List>
    {items.map((item) => (
      <ClosetItemCard
        key={item.id}
        item={item}
        isMenuOpen={menuOpenId === item.id}
        onToggleMenu={() => onToggleMenu(item.id)}
        onDelete={() => onDelete(item.id)}
        onEdit={() => onEdit(item.id)}
      />
    ))}
  </List>
);

export default ClosetItemList;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;
