import styled from "styled-components";
import searchIcon from "@assets/icons/search.svg";

const VisitCardSearchBar = ({ value, onChange }) => (
  <SearchWrapper>
    <SearchIcon src={searchIcon} alt="" />
    <SearchInput
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="대화 내용 혹은 제품명 검색"
      aria-label="방문 카드 검색"
    />
  </SearchWrapper>
);

export default VisitCardSearchBar;

const SearchWrapper = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-stroke-gray);
  border-radius: 0.4rem;
  background: var(--color-white);
  gap: 0.8rem;
`;

const SearchIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-black);

  &::placeholder {
    color: var(--color-placeholder-gray);
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;
