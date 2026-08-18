import styled from "styled-components";

const DetailInfoSection = ({ items }) => (
  <Section>
    <Title>제품 기본 정보</Title>
    <List>
      {items.map(({ label, value }) => (
        <Row key={label}>
          <Label>{label}</Label>
          <Value>{value}</Value>
        </Row>
      ))}
    </List>
  </Section>
);

export default DetailInfoSection;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const List = styled.dl`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
`;

const Label = styled.dt`
  flex-shrink: 0;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;

const Value = styled.dd`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
  text-align: right;
`;
