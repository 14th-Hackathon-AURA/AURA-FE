import { Link } from "react-router-dom";
import styled from "styled-components";
import heroImage from "@assets/images/Background-Image.png";
import Button from "@components/common/Button";

const OnboardingPage = () => {
  return (
    <PageWrapper>
      <HeroImage role="img" aria-label="AURA 컬렉션 이미지" />

      <ContentBox>
        <Title>Welcome to AURA</Title>

        <ContentGroup>
          <Description>
            럭셔리 세계로 들어오세요.
            <br />
            컬렉션을 관리하고, 독점적인 케어 서비스를 이용하며
            <br />
            360도 브랜드 경험을 만끽해 보세요.
          </Description>

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

// ↓ 예전 CSS 파일에 .wrapper, .hero, .btn 이렇게 클래스 쓰던 걸
//   여기서는 태그처럼 만들어서 위 JSX에서 바로 사용합니다.

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const HeroImage = styled.div`
  flex: 1;
  position: relative;
  background-color: var(--color-background-muted);
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0) 50%,
      #fdfbf7 100%
    ),
    url("${heroImage}");
  background-size: cover, cover;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 1;
  margin-top: -4rem;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 2rem 3.2rem;
  background-color: var(--color-ivory);
  border-radius: 32px 32px 12px 12px;
  box-shadow: 0 -8px 20px 0 rgba(45, 27, 51, 0.02);
`;

const Title = styled.h1`
  margin: 0 0 1.2rem;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-primary);
`;

const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4.25rem;
  align-self: stretch;
`;

const Description = styled.p`
  margin: 0;
  align-self: stretch;
  color: var(--color-darkgray);
  font-size: 1.15rem;
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
  margin: 2rem 0 0;
  color: var(--color-gray);
  font-size: 1.2rem;
  text-align: center;
`;
