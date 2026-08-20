import styled from "styled-components";
import defaultBagImage from "@assets/images/default-bag.png";

const ProductTagRow = ({ name, sub, image, onRemove }) => (
  <Row>
    <Thumb src={image || defaultBagImage} alt="" />
    <Info>
      <Name>{name}</Name>
      <Sub>{sub}</Sub>
    </Info>
    {onRemove && (
      <RemoveButton type="button" onClick={onRemove}>
        제거
      </RemoveButton>
    )}
  </Row>
);

export default ProductTagRow;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
`;

const Thumb = styled.img`
  flex-shrink: 0;
  width: 4.8rem;
  height: auto;
  border-radius: 0.4rem;
  object-fit: cover;
  background: #f7f7f7;
`;

const Info = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-navy);
`;

const Name = styled.p`
  margin: 0;
`;

const Sub = styled.p`
  margin: 0;
`;

const RemoveButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 6rem;
  padding: 0.8rem 1.6rem;
  border: 1px solid var(--color-navy);
  border-radius: 30px;
  background: var(--color-white);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-navy);
`;
