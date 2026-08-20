import styled from "styled-components";

const HistoryCard = ({ item, onEdit, onDelete, onOpen }) => (
  <Card>
    <ThumbnailButton
      type="button"
      onClick={() => onOpen?.(item.id)}
      aria-label="진단 결과 보기"
    >
      <Thumbnail src={item.image} alt="" />
    </ThumbnailButton>

    <MetaRow>
      <DateText>{item.date}</DateText>
      <StatusBadge $color={item.statusColor}>
        {item.statusLabel || "주의"}
      </StatusBadge>
    </MetaRow>

    {item.productName && <ProductName>{item.productName}</ProductName>}

    <Actions>
      <ActionButton type="button" onClick={() => onEdit?.(item.id)}>
        수정하기
      </ActionButton>
      <ActionButton type="button" onClick={() => onDelete?.(item.id)}>
        삭제하기
      </ActionButton>
    </Actions>
  </Card>
);

export default HistoryCard;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.6rem;
  border: 1px solid var(--color-stroke-gray);
  background: var(--color-white);
`;

const ThumbnailButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 3 / 1;
  object-fit: cover;
  border-radius: 0.4rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const DateText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;

const ProductName = styled.p`
  margin: -0.6rem 0 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-gray);
`;

const StatusBadge = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  background: ${({ $color }) => $color || "var(--color-warn)"};
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-white);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ActionButton = styled.button`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-gray);
  text-decoration: underline;
  text-underline-offset: 0.2rem;
`;
