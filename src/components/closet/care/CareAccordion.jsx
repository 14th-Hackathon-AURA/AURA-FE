import { useState } from "react";
import styled from "styled-components";
import chevronDownIcon from "@assets/icons/closet/chevron-down.svg";

const CareAccordion = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card $open={isOpen}>
      <Toggle
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Title>{title}</Title>
        <Chevron src={chevronDownIcon} alt="" $open={isOpen} />
      </Toggle>

      {isOpen && (
        <Panel>
          {(items || []).map((item, index) => (
            <Item key={`${index}-${item}`}>{item}</Item>
          ))}
        </Panel>
      )}
    </Card>
  );
};

export default CareAccordion;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0.4rem;
  border: 1px solid
    ${({ $open }) => ($open ? "var(--color-input-border)" : "transparent")};
  background: ${({ $open }) =>
    $open ? "var(--color-white)" : "var(--color-soft-gray)"};
`;

const Toggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.2rem;
  text-align: left;
`;

const Title = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;

const Chevron = styled.img`
  width: 1.2;
  height: 0.6rem;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

const Panel = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 0;
  padding: 1.6rem 2rem;
  list-style: none;
  border-top: 1px solid var(--color-input-border);
  background: var(--color-soft-gray);
`;

const Item = styled.li`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-darkgray);
`;
