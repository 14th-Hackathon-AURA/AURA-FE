import styled from "styled-components";

const ChipGroup = ({ label, options, selected, onToggle }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Chips>
      {options.map((option) => (
        <Chip
          key={option}
          type="button"
          $selected={selected.includes(option)}
          onClick={() => onToggle(option)}
        >
          {option}
        </Chip>
      ))}
    </Chips>
  </Wrapper>
);

export default ChipGroup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.p`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-navy);
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Chip = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.8rem;
  height: 3.3rem;
  padding: 0.5rem 1.0rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  border: 1px solid var(--color-black);
  background: ${({ $selected }) => ($selected ? "var(--color-black)" : "var(--color-white)")};
  color: ${({ $selected }) => ($selected ? "var(--color-ivory)" : "var(--color-black)")};
`;