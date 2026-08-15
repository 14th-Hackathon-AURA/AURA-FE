import styled from "styled-components";

const SettingsMenuItem = ({ title, description, ...props }) => (
  <Item type="button" {...props}>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Item>
);

export default SettingsMenuItem;

const Item = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  width: 100%;
  padding: 1.2rem;
  border: 1px solid var(--color-stroke-gray);
  border-radius: 0.6rem;
  background: var(--color-white);
  text-align: left;
`;

const Title = styled.span`
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-navy);
`;

const Description = styled(Title)``;
