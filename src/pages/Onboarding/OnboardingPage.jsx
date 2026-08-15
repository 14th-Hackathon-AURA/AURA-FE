import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "@components/common/Button";

import bagImage from "@assets/images/onboarding/image27.png";
import blobOuter from "@assets/images/onboarding/ellipse6.svg";
import blobInner from "@assets/images/onboarding/ellipse5.svg";
import iconCalendar from "@assets/images/onboarding/frame160-calendar.svg";
import iconProtect from "@assets/images/onboarding/frame159-helmet.svg";
import iconChecklist from "@assets/images/onboarding/frame161-checklist.svg";
import iconThumbsUp from "@assets/images/onboarding/frame163-thumbsup.svg";
import iconSparkle from "@assets/images/onboarding/frame162-sparkle.svg";
import markPlus from "@assets/images/onboarding/vector-plus.svg";
import markStar from "@assets/images/onboarding/vector-star.svg";

const OnboardingPage = () => {
  return (
    <PageWrapper>
      <HeroArea>
        <Decor as="img" src={blobOuter} alt="" aria-hidden="true" $left="23.333%" $top="25.077cqw" $width="53.333%" />
        <Decor as="img" src={blobInner} alt="" aria-hidden="true" $left="38.103%" $top="41.077cqw" $width="35.077%" />
        <Decor as="img" src={bagImage} alt="AURA 컬렉션 가방 이미지" $left="22.923%" $top="33.692cqw" $width="54.154%" $ratio="264 / 176" $fit="cover" />

        <Decor as="img" src={iconCalendar} alt="" aria-hidden="true" $left="24.154%" $top="60.359cqw" $width="14.564%" />
        <Decor as="img" src={iconProtect} alt="" aria-hidden="true" $left="44.256%" $top="19.744cqw" $width="11.282%" />
        <Decor as="img" src={iconChecklist} alt="" aria-hidden="true" $left="71.949%" $top="34.103cqw" $width="8.205%" />
        <Decor as="img" src={iconThumbsUp} alt="" aria-hidden="true" $left="71.949%" $top="68.769cqw" $width="6.154%" />
        <Decor as="img" src={iconSparkle} alt="" aria-hidden="true" $left="24.154%" $top="29.795cqw" $width="8.205%" />

        <Decor as="img" src={markPlus} alt="" aria-hidden="true" $left="17.817%" $top="54.205cqw" $width="2.505%" $rotate={45} />
        <Decor as="img" src={markStar} alt="" aria-hidden="true" $left="72.769%" $top="16.256cqw" $width="2.051%" />
      </HeroArea>

      <ContentBox>
        <ContentGroup>
          <TextGroup>
            <Title>
              <span>당신의 명품,</span>
              <span>
                <Accent>AURA</Accent>가 지켜드릴게요
              </span>
            </Title>
            <Description>
              보관부터 케어, 수선까지
              <br />
              모든 순간을 함께 관리합니다
            </Description>
          </TextGroup>

          <ButtonGroup>
            <Button as={Link} to="/login">
              로그인하기
            </Button>
            <Button as={Link} to="/signup" $variant="outline">
              회원가입하기
            </Button>
          </ButtonGroup>
        </ContentGroup>

        <Terms>By continuing, you agree to our Terms.</Terms>
      </ContentBox>
    </PageWrapper>
  );
};

export default OnboardingPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: var(--color-white);
  container-type: inline-size;
`;

const HeroArea = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 28rem;
  min-height: 74cqw;
  width: 100%;
  background-color: #f8f8fb;
  overflow: hidden;
  border-radius: 1.2rem 1.2rem 0 0;
`;

const Decor = styled.img`
  position: absolute;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  width: ${({ $width }) => $width};
  aspect-ratio: ${({ $ratio }) => $ratio || "1 / 1"};
  ${({ $fit }) =>
    $fit &&
    css`
      object-fit: ${$fit};
    `}
  ${({ $rotate }) =>
    $rotate &&
    css`
      transform: rotate(${$rotate}deg);
    `}
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 1;
  margin-top: -3.22rem;
  display: flex;
  flex-direction: column;
  padding: 3.2rem 2.4rem 4.8rem;
  background-color: var(--color-white);
  border-radius: 3.2rem 3.2rem 1.2rem 1.2rem;
  box-shadow: 0 -0.8rem 1rem 0 rgba(45, 27, 51, 0.02);
`;

const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.8rem;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  display: flex;
  flex-direction: column;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 2.8rem;
  letter-spacing: -0.044rem;
  text-align: center;
  color: var(--color-primary);
`;

const Accent = styled.span`
  color: var(--color-accent-purple);
`;

const Description = styled.p`
  margin: 0;
  max-width: 28rem;
  color: var(--color-darkgray);
  font-size: 1.1rem;
  line-height: 1.5;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 1.2rem;
`;

const Terms = styled.p`
  margin: 1.8rem 0 0;
  color: var(--color-gray);
  font-size: 1.1rem;
  line-height: 1.5;
  text-align: center;
`;
