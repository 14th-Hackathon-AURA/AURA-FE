import styled from "styled-components";

const GRADIENTS = {
  silver:
    "linear-gradient(90deg, #fff 0%, #d9d4c3 19.712%, #cdc8bb 34.615%, #dedbd1 38.942%, #fff 64.904%, #a6a6a6 75.481%, #e5e5e5 86.538%)",
  gold: "linear-gradient(90deg, #fff 0%, #d7ceb0 19.712%, #cdc8bb 34.615%, #dedbd1 38.942%, #fff 64.904%, #b4b194 79.327%, #e5e5e5 86.538%)",
  platinum:
    "linear-gradient(90deg, #fff 0%, #e4e4e4 19.712%, #d3d3d3 34.615%, #d4d4d4 38.942%, #fff 64.904%, #a6a6a6 75.481%, #e5e5e5 86.538%)",
  diamond:
    "linear-gradient(90deg, #fff 0%, #c3d6d9 19.712%, #bbbccd 34.615%, #d2d1de 38.942%, #fff 64.904%, #a6a6a6 75.481%, #e5e5e5 86.538%)",
};

const LABELS = {
  silver: "AURA Silver",
  gold: "AURA Gold",
  platinum: "AURA Platinum",
  diamond: "AURA Diamond",
};

const MembershipBadge = ({ grade = "silver" }) => (
  <Badge $gradient={GRADIENTS[grade]}>{LABELS[grade]}</Badge>
);

export default MembershipBadge;

const Badge = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  background-image: ${({ $gradient }) => $gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;
