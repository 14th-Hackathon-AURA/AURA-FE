import styled, { css } from "styled-components";

const Button = styled.button`
  display: flex;
  padding: 0.8rem 1.5rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 0.125rem;
  background: #2D1B33;
  color: var(--color-white);
  font-size: 1.6rem;

  ${({ $variant }) =>
    $variant === "outline" &&
    css`
      background: transparent;
      border: 1px solid #2D1B33;
      color: #2D1B33;
    `}
`;

export default Button;
