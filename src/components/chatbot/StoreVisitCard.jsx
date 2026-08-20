import styled from "styled-components";
import kebabMenuIcon from "@assets/icons/kebab-menu.svg";
import trashIcon from "@assets/icons/trash.svg";

const StoreVisitCard = ({ card, isMenuOpen, onToggleMenu, onDelete }) => (
  <CardArticle>
    <CardTop>
      <Thumbnail src={card.image} alt={card.name} />

      <Info>
        <TitleRow>
          <Title>{card.name}</Title>
          <MenuWrapper>
            <MenuButton
              type="button"
              aria-label={`${card.name} 메뉴 열기`}
              onClick={(event) => onToggleMenu(event, card.id)}
            >
              <MenuIcon src={kebabMenuIcon} alt="" />
            </MenuButton>

            {isMenuOpen && (
              <Dropdown role="menu" aria-label={`${card.name} 메뉴`}>
                <DropdownButton
                  type="button"
                  role="menuitem"
                  onClick={() => onDelete(card.id)}
                >
                  <DropdownLabel>삭제하기</DropdownLabel>
                  <TrashIcon src={trashIcon} alt="" />
                </DropdownButton>
              </Dropdown>
            )}
          </MenuWrapper>
        </TitleRow>

        <Price>{card.price}</Price>
      </Info>
    </CardTop>

    <TagList>
      {card.tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </TagList>
  </CardArticle>
);

export default StoreVisitCard;

const CardArticle = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem;
  border-radius: 0.4rem;
  background: var(--color-soft-gray);
`;

const CardTop = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const Thumbnail = styled.img`
  width: 11rem;
  height: 4.8rem;
  flex-shrink: 0;
  border-radius: 0.4rem;
  object-fit: cover;
  background: #e5e5e5;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const Title = styled.h3`
  flex: 1;
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.5;
  color: var(--color-black);
`;

const MenuWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
`;

const MenuIcon = styled.img`
  width: 0.3rem;
  height: 1.5rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 2.8rem;
  right: 0.8rem;
  z-index: 2;
  padding: 0.8rem 1.2rem;
  border-radius: 0.4rem;
  background: var(--color-white);
  white-space: nowrap;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.08);
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.8rem;
  width: 100%;
`;

const DropdownLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;

const TrashIcon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
`;

const Price = styled.p`
  margin: 0.2rem 0 0;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Tag = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 0.2rem;
`;
