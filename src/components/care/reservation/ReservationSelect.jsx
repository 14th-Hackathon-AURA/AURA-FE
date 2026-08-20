import styled from "styled-components";
import chevronIcon from "@assets/icons/care/chevron-down.svg";

const ReservationSelect = ({
  label,
  placeholder = "Select...",
  value,
  options,
  isOpen,
  onToggle,
  onChange,
}) => {
  const handleSelect = (option) => {
    onChange(option);
    onToggle(false);
  };

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Box>
        <Trigger type="button" onClick={() => onToggle(!isOpen)}>
          <ValueText $placeholder={!value}>{value || placeholder}</ValueText>
          <Chevron src={chevronIcon} alt="" $open={isOpen} />
        </Trigger>

        {isOpen && (
          <OptionsList>
            {options.map((option) => (
              <Option
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
              >
                {option}
              </Option>
            ))}
          </OptionsList>
        )}
      </Box>
    </Wrapper>
  );
};

export default ReservationSelect;

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

const Box = styled.div`
  width: 100%;
  border: 1px solid var(--color-input-border);
  border-radius: 0.6rem;
  overflow: hidden;
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.2rem;
`;

const ValueText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ $placeholder }) =>
    $placeholder ? "var(--color-placeholder-gray)" : "var(--color-black)"};
`;

const Chevron = styled.img`
  width: 1.2rem;
  height: auto;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

const OptionsList = styled.div`
  border-top: 1px solid var(--color-input-border);
`;

const Option = styled.button`
  display: block;
  width: 100%;
  padding: 1.2rem;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
  background: var(--color-soft-gray);
`;
