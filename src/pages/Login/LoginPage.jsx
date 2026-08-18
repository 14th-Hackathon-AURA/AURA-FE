import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/common/Button";
import PageHeader from "@components/common/PageHeader";
import FieldGroup from "@components/login/FieldGroup";
import Label from "@components/login/Label";
import Input from "@components/login/Input";
import { login } from "@apis/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/"); // 로그인 후 이동할 경로로 수정
    } catch {
      setError("이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <PageHeader title="로그인" backTo="/" />

      <Main>
        <SectionTitle>로그인</SectionTitle>

        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label htmlFor="email">이메일</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FieldGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "로그인 중..." : "로그인 하기"}
          </SubmitButton>
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

const SubmitButton = styled(Button)`
  margin-top: 1.2rem;
`;

const FooterText = styled.p`
  margin: 2.4rem 0 0;
  color: #1F2937;
  font-size: 1.4rem;
  text-align: center;
`;

const FooterLink = styled(Link)`
  color: var(--color-mediumgray);
  font-style: normal;
  text-decoration: underline;
`;

const ErrorMessage = styled.p`
  margin: -1rem 0 0;
  color: #ef4444;
  font-size: 1.3rem;
`;