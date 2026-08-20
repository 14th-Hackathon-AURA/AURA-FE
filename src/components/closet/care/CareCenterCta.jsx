import styled from "styled-components";
import Button from "@components/common/Button";

const CareCenterCta = ({ href }) => (
  <Section>
    <Copy>
      <Title>공식 센터 연결이 필요하신가요?</Title>
      <Description>
        전문 수선 센터 정보와 공식 AS 절차를 확인하세요. 해당 안내 내용은
        참고용이며, 실제 수선 여부는 공식 센터의 판단을 따릅니다.
      </Description>
    </Copy>

    <AsButton as="a" href={href} target="_blank" rel="noopener noreferrer">
      1:1 공식 문의하기
    </AsButton>
  </Section>
);

export default CareCenterCta;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.5;
  color: var(--color-black);
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-gray);
`;

const AsButton = styled(Button)`
  align-self: flex-start;
  width: auto;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 400;
  border-radius: 0.2rem;
`;
