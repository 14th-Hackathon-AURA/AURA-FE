import { useState } from "react";
import styled from "styled-components";
import Button from "@components/common/Button";
import defaultBagImage from "@assets/images/default-bag.png";

const ProductTagModal = ({
  items,
  initialSelectedId = null,
  onCancel,
  onConfirm,
}) => {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const handleConfirm = () => {
    const selected = items.find((item) => item.id === selectedId);
    if (selected) onConfirm(selected);
  };

  return (
    <Overlay>
      <Sheet>
        <Title>내 클로젯에서 제품 선택</Title>

        <List>
          {items.map((item) => {
            const checked = item.id === selectedId;
            return (
              <ItemRow
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
              >
                <Thumb src={item.image || defaultBagImage} alt="" />
                <Info>
                  <Name>{item.name}</Name>
                  <Sub>
                    {item.category} · {item.registeredLabel}
                  </Sub>
                </Info>
                <CheckWrap>
                  <Checkbox $checked={checked} />
                  <CheckLabel>선택</CheckLabel>
                </CheckWrap>
              </ItemRow>
            );
          })}
        </List>

        <Actions>
          <CancelButton type="button" $variant="outline" onClick={onCancel}>
            취소
          </CancelButton>
          <ConfirmButton
            type="button"
            onClick={handleConfirm}
            disabled={!selectedId}
          >
            태그 추가
          </ConfirmButton>
        </Actions>
      </Sheet>
    </Overlay>
  );
};

export default ProductTagModal;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

const Sheet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 34.2rem;
  max-width: calc(100% - 4.8rem);
  padding: 2rem 2.4rem;
  border-radius: 0.4rem;
  background: var(--color-white);
  box-shadow: 0 0.8rem 2.4rem 0 rgba(0, 0, 0, 0.15);
`;

const Title = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-navy);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-height: 32rem;
  overflow-y: auto;
`;

const ItemRow = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 1.2rem;
  border: 1px solid var(--color-stroke-gray);
  border-radius: 0.4rem;
  background: var(--color-soft-gray);
`;

const Thumb = styled.img`
  flex-shrink: 0;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 999px;
  object-fit: cover;
  background: var(--color-avatar-bg);
`;

const Info = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
`;

const Name = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-black);
`;

const Sub = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-navy);
`;

const CheckWrap = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Checkbox = styled.span`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.3rem;
  border: 1px solid var(--color-stroke-gray);
  background: ${({ $checked }) =>
    $checked ? "var(--color-primary)" : "var(--color-white)"};
`;

const CheckLabel = styled.span`
  font-size: 1.2rem;
  color: var(--color-navy);
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const CancelButton = styled(Button)`
  width: 7.7rem;
  height: 3.3rem;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
`;

const ConfirmButton = styled(Button)`
  width: 7.7rem;
  height: 3.3rem;
  padding: 1rem 1rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;

  &:disabled {
    opacity: 0.5;
  }
`;
