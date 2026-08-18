import styled from "styled-components";
import checklistIcon from "@assets/icons/closet/checklist.svg";
import checklistItemIcon from "@assets/icons/closet/checklist-item.svg";

const CareChecklist = ({ title, items }) => (
  <Card>
    <Header>
      <Title>{title}</Title>
      <IconBadge>
        <Icon src={checklistIcon} alt="" />
      </IconBadge>
    </Header>

    <List>
      {items.map((item) => (
        <Item key={item}>
          <Check src={checklistItemIcon} alt="" />
          <Text>{item}</Text>
        </Item>
      ))}
    </List>
  </Card>
);

export default CareChecklist;

const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 2.4rem;
  border-radius: 0.4rem;
  background: var(--color-primary);
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-white);
`;

const IconBadge = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  background: #15051b;
`;

const Icon = styled.img`
  width: 1.8rem;
  height: 1.7rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 0;
  padding: 0;
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
  color: #d4af37;
`;
