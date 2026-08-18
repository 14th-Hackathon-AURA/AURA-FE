import styled from "styled-components";
import BottomNavBar from "@components/common/BottomNavBar";
import Button from "@components/common/Button";
import ProfileSummary from "@components/myhome/ProfileSummary";
import MembershipCard from "@components/myhome/MembershipCard";
import SettingsMenuItem from "@components/myhome/SettingsMenuItem";
import useMemberProfile from "@hooks/useMemberProfile";
import { useNavigate } from "react-router-dom";

const SettingsHomePage = () => {
  const navigate = useNavigate();
  const { nickname, joinedAt, avatarUrl, membership } = useMemberProfile();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <PageWrapper>
      <Header>
        <HeaderTitle>마이 홈</HeaderTitle>
      </Header>

      <Main>
        <Section>
          <ProfileSummary avatarUrl={avatarUrl} nickname={nickname} joinedAt={joinedAt} />

          <MembershipCard
            grade={membership.grade}
            benefitsTitle={membership.benefitsTitle}
            benefits={membership.benefits}
          />

          <SectionTitle>계정 관리</SectionTitle>

          <SettingsMenuItem title="환경 설정" description="알림·언어·표시 설정" />
          <SettingsMenuItem title="계정 삭제 요청" description="프로필·이력 삭제 안내" />
        </Section>

        <LogoutButton type="button" $variant="outline" onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </Main>

      <BottomNavBar />
    </PageWrapper>
  );
};

export default SettingsHomePage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--color-white);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2.4rem;
  background: var(--color-primary);
  box-shadow: 0 0.1rem 0.4rem 0 rgba(0, 0, 0, 0.08);
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2.4rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-navy);
`;

const LogoutButton = styled(Button)`
  width: 11.2rem;
  height: 3.3rem;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
`;
