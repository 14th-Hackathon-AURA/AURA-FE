import styled from "styled-components";
import warnIcon from "@assets/icons/closet/warn.svg";
import bagIcon from "@assets/icons/closet/bag.svg";

const ConditionStatusCards = () => (
  <Cards>
    <Card $variant="caution">
      <Icon src={warnIcon} alt="" />
      <Label>주의</Label>
    </Card>

    <Card $variant="care">
      <Icon src={bagIcon} alt="" />
      <Label>셀프 케어 권장</Label>
    </Card>
  </Cards>
);

export default ConditionStatusCards;

const Cards = styled.div`
  display: flex;
  gap: 1.6rem;
  width: 100%;
`;

const Card = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.6rem;
  border-radius: 0.4rem;
  background: ${({ $variant }) =>
    $variant === "caution" ? "#FDF0F6" : "#F0EDED"};
`;

const Icon = styled.img`
  width: 2.2rem;
  height: 2.4rem;
  object-fit: contain;
`;

const Label = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-black);
  text-align: center;
`;
