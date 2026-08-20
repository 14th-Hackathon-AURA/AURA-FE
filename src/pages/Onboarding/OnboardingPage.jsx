import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/common/Button";
import onboardingImage from "@assets/images/onboarding/onboarding.png";

const OnboardingPage = () => {
  return (
    <PageWrapper>
      <HeroArea>
        <HeroImage src={onboardingImage} alt="" />
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
`;

const HeroArea = styled.div`
  position: relative;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 28rem;
  width: 100%;
  padding: 2.4rem 1.6rem 0;
  background-color: #f8f8fb;
  overflow: hidden;
  border-radius: 1.2rem 1.2rem 0 0;
`;

const HeroImage = styled.img`
  display: block;
  width: 100%;
  max-width: 36rem;
  height: auto;
  object-fit: contain;
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 1;
  margin-top: -3.22rem;
  display: flex;
  flex-direction: column;
  padding: 3.2rem 2.4rem 4rem;
  background-color: var(--color-white);
  border-radius: 3.2rem 3.2rem 1.2rem 1.2rem;
  box-shadow: 0 -0.8rem 1rem 0 rgba(45, 27, 51, 0.02);
`;

const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.8rem;
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
  gap: 0.8rem;
`;

const Terms = styled.p`
  margin: 1.8rem 0 0;
  color: var(--color-gray);
  font-size: 1.1rem;
  line-height: 1.5;
  text-align: center;
`;
