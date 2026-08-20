import styled from "styled-components";

const STATUS_MAP = {
  warn: { label: "주의", color: "var(--color-warn)" },
  safe: { label: "안전", color: "var(--color-safe)" },
  danger: { label: "위험", color: "var(--color-danger)" },
};

const HistoryCard = ({ item, onEdit, onDelete }) => {
  const status = STATUS_MAP[item.status] ?? STATUS_MAP.warn;

  return (
    <Card>
      <Thumbnail src={item.image} alt="" />

      <MetaRow>
        <DateText>{item.date}</DateText>
        <StatusBadge $color={status.color}>{status.label}</StatusBadge>
      </MetaRow>

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
};

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

const StatusBadge = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  background: ${({ $color }) => $color};
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
