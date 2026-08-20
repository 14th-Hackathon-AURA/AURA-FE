import styled from "styled-components";
import checkedIcon from "@assets/icons/care/checked.svg";

const CHECKLIST_ITEMS = [
  "제품 전체가 프레임 안에 충분히 보이나요?",
  "초점이 맞고 흔들림 없이 선명한가요?",
  "밝기가 적절해 색상과 질감이 잘 보이나요?",
];

const DiagnosisInstructions = () => (
  <Section>
    <Title>촬영 전 꼭 확인해 주세요</Title>

    <Card>
      {CHECKLIST_ITEMS.map((item) => (
        <Item key={item}>
          <Check src={checkedIcon} alt="" />
          <Text>{item}</Text>
        </Item>
      ))}
    </Card>

    <SubText>
      AI 진단은 사진을 바탕으로 한 참고용 결과이며, 정품 판별·전문 수선
      견적·내부 손상 진단은 포함하지 않습니다. 판정이 불확실한 경우 매장에
      방문하여 공식 점검을 권장합니다.
    </SubText>
  </Section>
);

export default DiagnosisInstructions;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const Card = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 0;
  padding: 1.6rem;
  border-radius: 0.4rem;
  background: var(--color-soft-gray);
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Check = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
`;

const Text = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-black);
`;

const SubText = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-placeholder-gray);
`;
