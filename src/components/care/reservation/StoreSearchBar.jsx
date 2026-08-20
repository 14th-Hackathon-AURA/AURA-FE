import styled from "styled-components";
import searchIcon from "@assets/icons/care/search.svg";

const StoreSearchBar = ({
  value,
  onChange,
  placeholder = "매장명 혹은 지역명 직접 검색하기",
}) => (
  <Wrapper>
    <Icon src={searchIcon} alt="" />
    <Input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  </Wrapper>
);

export default StoreSearchBar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-stroke-gray);
  border-radius: 0.4rem;
  background: var(--color-white);
  gap: 0.8rem;
`;

const Icon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
`;

const Input = styled.input`
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
`;
