import styled from "styled-components";

const CategoryFilter = ({ categories, selected, onSelect }) => (
  <List>
    {categories.map((category) => (
      <Chip
        key={category}
        type="button"
        $active={selected === category}
        onClick={() => onSelect(category)}
      >
        {category}
      </Chip>
    ))}
  </List>
);

export default CategoryFilter;

const List = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Chip = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  font-size: 1.4rem;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  white-space: nowrap;
  background: ${({ $active }) => ($active ? "var(--color-black)" : "#f7f7f7")};
  color: ${({ $active }) =>
    $active ? "var(--color-white)" : "var(--color-black)"};
`;
