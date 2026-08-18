import styled from "styled-components";
import searchIcon from "@assets/icons/closet/search.svg";

const ClosetSearchBar = ({
  value,
  onChange,
  placeholder = "제품명 혹은 제품군으로 검색",
}) => (
  <Wrapper>
    <Icon src={searchIcon} alt="" />
    <Input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  </Wrapper>
);

export default ClosetSearchBar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-stroke-gray);
  border-radius: 0.4rem;
  background: var(--color-white);
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
    color: #767179;
  }
`;
