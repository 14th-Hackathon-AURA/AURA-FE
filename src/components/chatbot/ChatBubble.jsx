import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/common/Button";
import { sendChatMessage } from "@apis/chat";

const ChatBubble = ({ role, text, action, recommendedProducts, sessionId }) => {
  if (role === "user") {
    return (
      <UserRow>
        <UserBubble>{text}</UserBubble>
      </UserRow>
    );
  }

  const handleSaveCard = async (productCode) => {
    try {
      await sendChatMessage({
        sessionId,
        message: "이 제품 카드로 저장해줘",
        productCode,
      });
      alert("방문 카드로 저장했어요.");
    } catch {
      alert("저장에 실패했어요. 다시 시도해주세요.");
    }
  };

  return (
    <AiRow>
      <AiBubble>{text}</AiBubble>
      {recommendedProducts && recommendedProducts.length > 0 && (
        <ProductList>
          {recommendedProducts.map((product) => (
            <ProductCard key={product.style_code}>
              {product.image_url && (
                <ProductImage src={product.image_url} alt={product.name} />
              )}
              <ProductInfo>
                <ProductBrand>{product.brand}</ProductBrand>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}</ProductPrice>
              </ProductInfo>
              <SaveButton
                type="button"
                onClick={() => handleSaveCard(product.style_code)}
              >
                카드 저장
              </SaveButton>
            </ProductCard>
          ))}
        </ProductList>
      )}
      {action && (
        <ActionButton as={Link} to={action.to}>
          {action.label}
        </ActionButton>
      )}
    </AiRow>
  );
};

export default ChatBubble;

const UserRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const UserBubble = styled.p`
  max-width: 80%;
  margin: 0;
  padding: 1.2rem;
  border: 1px solid var(--color-stroke-gray);
  border-radius: 0.4rem;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-black);
  text-align: right;
  white-space: pre-line;
`;

const AiRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.3rem;
  width: 100%;
`;

const AiBubble = styled.p`
  max-width: 80%;
  margin: 0;
  padding: 1.2rem;
  border-radius: 0.4rem;
  background: #f7f7f7;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-black);
  white-space: pre-line;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  max-width: 80%;
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-stroke-gray, #e5e5e5);
  border-radius: 0.6rem;
`;

const ProductImage = styled.img`
  width: 5.6rem;
  height: 5.6rem;
  object-fit: cover;
  border-radius: 0.4rem;
  flex-shrink: 0;
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductBrand = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: #767179;
`;

const ProductName = styled.p`
  margin: 0.2rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-black);
`;

const SaveButton = styled.button`
  flex-shrink: 0;
  padding: 0.6rem 1rem;
  border: 1px solid var(--color-primary, #1f2937);
  border-radius: 0.4rem;
  font-size: 1.1rem;
  background: transparent;
`;

const ActionButton = styled(Button)`
  width: 10rem;
  padding: 1rem 1.2rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  color: var(--color-ivory);
`;
