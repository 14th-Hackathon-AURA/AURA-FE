import styled, { css } from "styled-components";

const TextField = ({ label, boldLabel, ...inputProps }) => (
  <Wrapper>
    {label && <Label $bold={boldLabel}>{label}</Label>}
    <Input {...inputProps} />
  </Wrapper>
);

export default TextField;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
`;

const Label = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: var(--color-black);

  ${({ $bold }) =>
    $bold &&
    css`
      font-size: 1.6rem;
      font-weight: 700;
    `}
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.6rem;
  font-size: 1.4rem;
  color: var(--color-black);

  &::placeholder {
    color: var(--color-placeholder-gray);
  }
`;
