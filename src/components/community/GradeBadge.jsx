import styled from "styled-components";

const GRADE_STYLES = {
  silver: { label: "Silver", from: "#565359", to: "#baafc2" },
  gold: { label: "Gold", from: "#595853", to: "#c0ae69" },
  platinum: { label: "Platinum", from: "#535759", to: "#adbfca" },
  diamond: { label: "Diamond", from: "#565359", to: "#8964a2" },
};

const GradeBadge = ({ grade = "silver" }) => {
  const style = GRADE_STYLES[grade] ?? GRADE_STYLES.silver;
  return (
    <Badge $from={style.from} $to={style.to}>
      {style.label}
    </Badge>
  );
};

export default GradeBadge;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.8rem;
  border-radius: 99px;
  background: ${({ $from, $to }) => `linear-gradient(to left, ${$from} 0%, ${$to} 78.846%)`};
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.5;
  color: var(--color-white);
  white-space: nowrap;
`;
