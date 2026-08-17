import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import closetIcon from "@assets/icons/nav/closet.svg";
import closetActiveIcon from "@assets/icons/nav/closet-active.svg";
import careIcon from "@assets/icons/nav/care.svg";
import careActiveIcon from "@assets/icons/nav/care-active.svg";
import communityIcon from "@assets/icons/nav/community.svg";
import communityActiveIcon from "@assets/icons/nav/community-active.svg";
import myHomeIcon from "@assets/icons/nav/myhome.svg";
import myHomeActiveIcon from "@assets/icons/nav/myhome-active.svg";

const TABS = [
  {
    key: "closet",
    label: "클로젯",
    to: "/closet",
    icon: closetIcon,
    activeIcon: closetActiveIcon,
  },
  {
    key: "care",
    label: "케어",
    to: "/care",
    icon: careIcon,
    activeIcon: careActiveIcon,
  },
  {
    key: "community",
    label: "커뮤니티",
    to: "/community",
    icon: communityIcon,
    activeIcon: communityActiveIcon,
  },
  {
    key: "mypage",
    label: "마이 홈",
    to: "/mypage",
    icon: myHomeIcon,
    activeIcon: myHomeActiveIcon,
  },
];

const BottomNavBar = () => {
  const { pathname } = useLocation();

  return (
    <Nav>
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.to);
        return (
          <TabLink key={tab.key} to={tab.to} $active={active}>
            <TabIcon src={active ? tab.activeIcon : tab.icon} alt="" />
            <TabLabel $active={active}>{tab.label}</TabLabel>
          </TabLink>
        );
      })}
    </Nav>
  );
};

export default BottomNavBar;

const Nav = styled.nav`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5.2rem;
  width: 100%;
  padding: 0 5.3rem 2rem;
  background: var(--color-soft-gray);
  box-shadow: 0 -0.4rem 4rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem 0.4rem 0 0;
`;

const TabLink = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: 4rem;
  padding-top: 1.6rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 5rem;
    height: 0.4rem;
    border-radius: 100px;
    background: var(--color-primary);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
  }
`;

const TabIcon = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: contain;
`;

const TabLabel = styled.span`
  font-size: 1.1rem;
  line-height: 1.5;
  color: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-tab-gray)"};
`;
