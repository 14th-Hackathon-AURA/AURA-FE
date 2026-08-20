import { useState } from "react";
import styled from "styled-components";
import chevronIcon from "@assets/icons/closet/chevron-down.svg";

const getOptionValue = (option) =>
  typeof option === "object" && option !== null ? option.value : option;

const getOptionLabel = (option) =>
  typeof option === "object" && option !== null ? option.label : option;

const CategorySelect = ({ label, placeholder, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const matchedOption = options
    .map((option) => ({
      value: getOptionValue(option),
      label: getOptionLabel(option),
    }))
    .find((option) => String(option.value) === String(value));

  const selectedLabel = matchedOption?.label ?? (value || "");
  const isPlaceholder =
    matchedOption == null && (value === "" || value == null);

  const handleSelect = (option) => {
    onChange(getOptionValue(option));
    setIsOpen(false);
  };

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Box>
        <Trigger type="button" onClick={() => setIsOpen((prev) => !prev)}>
          <ValueText $placeholder={isPlaceholder}>
            {selectedLabel || placeholder}
          </ValueText>
          <Chevron src={chevronIcon} alt="" $open={isOpen} />
        </Trigger>

        {isOpen && (
          <OptionsList>
            {options.map((option) => {
              const optionValue = getOptionValue(option);
              const optionLabel = getOptionLabel(option);

              return (
                <Option
                  key={String(optionValue)}
                  type="button"
                  onClick={() => handleSelect(option)}
                >
                  {optionLabel}
                </Option>
              );
            })}
          </OptionsList>
        )}
      </Box>
    </Wrapper>
  );
};

export default CategorySelect;

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
  color: ${({ $placeholder }) =>
    $placeholder ? "var(--color-placeholder-gray)" : "var(--color-black)"};
`;

const Chevron = styled.img`
  width: 1.2rem;
  height: 0.6rem;
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
