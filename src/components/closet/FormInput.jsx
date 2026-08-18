import styled from "styled-components";

const FormInput = ({ label, ...inputProps }) => (
  <Wrapper>
    {label && <Label>{label}</Label>}
    <Input {...inputProps} />
  </Wrapper>
);

export default FormInput;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-black);
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.6rem;
  outline: none;
  font-size: 1.4rem;
  color: var(--color-black);
  -webkit-tap-highlight-color: transparent;

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;
