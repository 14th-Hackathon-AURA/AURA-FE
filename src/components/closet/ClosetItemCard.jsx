import { Link } from "react-router-dom";
import styled from "styled-components";
import moreWhiteIcon from "@assets/icons/closet/more-white.svg";
import moreGrayIcon from "@assets/icons/closet/more-gray.svg";
import verifiedIcon from "@assets/icons/closet/verified.svg";
import ClosetActionMenu from "./ClosetActionMenu";

const ClosetItemCard = ({
  item,
  isMenuOpen,
  onToggleMenu,
  onDelete,
  onEdit,
}) => {
  const handleToggleMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleMenu();
  };

  return (
    <Card>
      <CardLink to={`/closet/${item.id}`}>
        <ImageWrap>
          {item.image ? (
            <Image src={item.image} alt={item.name} />
          ) : (
            <ImagePlaceholder aria-hidden="true" />
          )}
          <Gradient />

          {item.verified && (
            <Badge>
              <BadgeIcon src={verifiedIcon} alt="" />
              인증 완료
            </Badge>
          )}

          <Info>
            <Name>{item.name}</Name>
            <Meta>
              구매일
              <Dot />
              {item.purchaseDate}
            </Meta>
          </Info>
        </ImageWrap>
      </CardLink>

      <MoreButton
        type="button"
        $open={isMenuOpen}
        aria-label="더보기"
        aria-expanded={isMenuOpen}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={handleToggleMenu}
      >
        <MoreIcon src={isMenuOpen ? moreGrayIcon : moreWhiteIcon} alt="" />
      </MoreButton>

      {isMenuOpen && <ClosetActionMenu onDelete={onDelete} onEdit={onEdit} />}
    </Card>
  );
};

export default ClosetItemCard;

const Card = styled.div`
  position: relative;
  width: 100%;
`;

const CardLink = styled(Link)`
  display: block;
  width: 100%;
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 0.8rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  background: var(--color-soft-gray);
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: var(--color-soft-gray);
`;

const Gradient = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;
`;

const Badge = styled.span`
  position: absolute;
  top: 2.4rem;
  left: 2.4rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  background: var(--color-white);
  box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.04);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-darkgray);
`;

const BadgeIcon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
`;

const Info = styled.div`
  position: absolute;
  left: 2.4rem;
  bottom: 2.4rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Name = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-white);
`;

const Meta = styled.p`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
`;

const Dot = styled.span`
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
`;

const MoreButton = styled.button`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.04);
`;

const MoreIcon = styled.img`
  width: 1.6rem;
  height: 0.4rem;
`;
