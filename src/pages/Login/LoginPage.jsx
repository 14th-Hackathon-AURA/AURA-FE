import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginPage = () => {
  return (
    <PageWrapper>
      <Header>
        <BackButton as={Link} to="/" aria-label="이전으로">
          ‹
        </BackButton>
        <HeaderTitle>로그인</HeaderTitle>
      </Header>

      <Main>
        <SectionTitle>로그인</SectionTitle>

        <Form>
          <FieldGroup>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="password">비밀번호</Label>
            <PasswordField>
              <Input id="password" type="password" />
              {/* TODO: 클릭 시 비밀번호 표시/숨김 토글 (useState) */}
              <ToggleButton type="button" aria-label="비밀번호 표시">
                👁
              </ToggleButton>
            </PasswordField>
          </FieldGroup>

          <SubmitButton type="submit">로그인 하기</SubmitButton>
        </Form>

        <FooterText>
          계정이 없으신가요? <FooterLink to="/signup">가입하기</FooterLink>
        </FooterText>
      </Main>
    </PageWrapper>
  );
};

export default LoginPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2rem;
  border-bottom: 1px solid var(--color-border);
`;

const BackButton = styled.button`
  position: absolute;
  left: 2rem;
  font-size: 2rem;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
`;

const Main = styled.main`
  flex: 1;
  padding: 2.4rem 2rem 3.2rem;
`;

const SectionTitle = styled.h2`
  margin: 0 0 2.8rem;
  font-size: 2rem;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1.4rem;
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  font-size: 1.4rem;
`;

const PasswordField = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${Input} {
    padding-right: 4rem;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 1.2rem;
  font-size: 1.6rem;
`;

const SubmitButton = styled.button`
  margin-top: 1.2rem;
  padding: 1.4rem;
  border-radius: 0.8rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 2.4rem 0 0;
  color: var(--color-navy);
  font-size: 1.4rem;
  text-align: center;
`;

const FooterLink = styled(Link)`
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: underline;
`;
