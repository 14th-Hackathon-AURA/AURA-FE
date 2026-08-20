import styled from "styled-components";

const ReservationField = ({ label, as = "input", ...inputProps }) => (
  <Wrapper>
    {label && <Label>{label}</Label>}
    {as === "textarea" ? (
      <TextArea {...inputProps} />
    ) : (
      <Input {...inputProps} />
    )}
  </Wrapper>
);

export default ReservationField;

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

const fieldStyle = `
  width: 100%;
  padding: 1.2rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.6rem;
  outline: none;
  font-size: 1.4rem;
  color: var(--color-black);
  background: var(--color-white);
  -webkit-tap-highlight-color: transparent;

  &::placeholder {
    color: var(--color-placeholder-gray);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const Input = styled.input`
  ${fieldStyle}
`;

const TextArea = styled.textarea`
  ${fieldStyle}
  min-height: 8.8rem;
  resize: none;
`;
