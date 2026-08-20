import { Link } from "react-router-dom";
import styled from "styled-components";
import backIcon from "@assets/icons/care/back.svg";

const PageHeader = ({ title, backTo = "/", onBack }) => (
  <Header>
    {onBack ? (
      <BackButton type="button" onClick={onBack} aria-label="이전으로">
        <BackIcon src={backIcon} alt="" />
      </BackButton>
    ) : (
      <BackButton as={Link} to={backTo} aria-label="이전으로">
        <BackIcon src={backIcon} alt="" />
      </BackButton>
    )}
    <HeaderTitle>{title}</HeaderTitle>
  </Header>
);

export default PageHeader;

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2.4rem;
  background: var(--color-white);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
`;

const BackButton = styled.button`
  position: absolute;
  left: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackIcon = styled.img`
  width: 0.6rem;
  height: 1.1rem;
  flex-shrink: 0;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
`;
