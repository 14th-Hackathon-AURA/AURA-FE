import styled from "styled-components";
import warnIcon from "@assets/icons/closet/warn.svg";
import bagIcon from "@assets/icons/closet/bag.svg";

const CONDITION_CONFIG = {
  SAFE: {
    label: "안전",
    variant: "safe",
    careLabel: "상태 양호",
  },
  CAUTION: {
    label: "주의",
    variant: "caution",
    careLabel: "셀프 케어 권장",
  },
  DANGER: {
    label: "위험",
    variant: "danger",
    careLabel: "전문 케어 권장",
  },
};

const ConditionStatusCards = ({ conditionLevel }) => {
  const config = CONDITION_CONFIG[conditionLevel] || CONDITION_CONFIG.CAUTION;

  return (
    <Cards>
      <Card $variant={config.variant}>
        <Icon src={warnIcon} alt="" />
        <Label>{config.label}</Label>
      </Card>

      <Card $variant="care">
        <Icon src={bagIcon} alt="" />
        <Label>{config.careLabel}</Label>
      </Card>
    </Cards>
  );
};

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
  background: ${({ $variant }) => {
    if ($variant === "safe") return "#F0F7F2";
    if ($variant === "danger") return "#FDF0F0";
    if ($variant === "caution") return "#FDF0F6";
    return "#F0EDED";
  }};
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
