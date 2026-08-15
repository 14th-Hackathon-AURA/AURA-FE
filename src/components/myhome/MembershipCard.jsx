import styled from "styled-components";
import MembershipBadge from "./MembershipBadge";

const MembershipCard = ({ grade, benefitsTitle, benefits }) => (
  <Card>
    <Gradient />
    <Content>
      <GradeBlock>
        <GradeLabel>멤버십 등급</GradeLabel>
        <MembershipBadge grade={grade} />
      </GradeBlock>

      <BenefitsBlock>
        <BenefitsHeader>
          <BenefitsTitle>{benefitsTitle}</BenefitsTitle>
          <CurrentTag>현재 등급</CurrentTag>
        </BenefitsHeader>
        <BenefitsList>
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </BenefitsList>
      </BenefitsBlock>
    </Content>
  </Card>
);

export default MembershipCard;

const Card = styled.div`
  position: relative;
  width: 100%;
  padding: 2.4rem;
  border-radius: 0.4rem;
  overflow: hidden;
  background: var(--color-primary);
  box-shadow: 0 0.8rem 2rem 0 rgba(45, 27, 51, 0.04);
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0 0 0 31.87%;
  opacity: 0.5;
  background: linear-gradient(to left, #15051b, rgba(21, 5, 27, 0));
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const GradeBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const GradeLabel = styled.p`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-stroke-gray);
`;

const BenefitsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const BenefitsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

const BenefitsTitle = styled.p`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-white);
`;

const CurrentTag = styled.span`
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-white);
`;

const BenefitsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-white);
`;
