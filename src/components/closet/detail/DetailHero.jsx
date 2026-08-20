import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/common/Button";

const formatPrice = (price) => {
  if (price == null || price === "") return "-";
  return `₩ ${Number(price).toLocaleString("ko-KR")}`;
};

const DetailHero = ({ product }) => (
  <Section>
    <ImageBox>
      {product.image ? (
        <Image src={product.image} alt={product.name} />
      ) : (
        <ImagePlaceholder aria-hidden="true" />
      )}
    </ImageBox>

    <Meta>
      <Brand>{product.brand || "-"}</Brand>
      <Name>{product.name}</Name>
      <Price>{formatPrice(product.price)}</Price>

      <CareButton as={Link} to={`/closet/${product.id}/care`}>
        케어 가이드 보기
      </CareButton>
    </Meta>
  </Section>
);

export default DetailHero;

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const ImageBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.4rem;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  background: var(--color-soft-gray);
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: var(--color-soft-gray);
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 2.4rem;
`;

const Brand = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-black);
`;

const Name = styled.h2`
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-black);
`;

const Price = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-darkgray);
  margin-top: 0.4rem;
`;

const CareButton = styled(Button)`
  align-self: flex-start;
  width: auto;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 400;
  border-radius: 0.2rem;
  margin-top: 1.6rem;
`;
