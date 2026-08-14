import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/common/Button";
import PageHeader from "@components/common/PageHeader";
import FieldGroup from "@components/login/FieldGroup";
import Label from "@components/login/Label";
import Input from "@components/login/Input";
import PasswordInput from "@components/login/PasswordInput";

const SignUpPage = () => {
  return (
    <PageWrapper>
      <PageHeader title="회원가입" backTo="/" />

      <Main>
        <SectionTitle>계정 생성</SectionTitle>
        <SectionDescription>
          AURA에서 럭셔리 제품을 소개받고 관리해보세요
        </SectionDescription>

        <Form>
          <FieldGroup>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" />
          </FieldGroup>

          <FieldGroup>
            <LabelRow>
              <Label htmlFor="password">비밀번호</Label>
              <HelperText>최소 8자 이상, 대문자·숫자·특수문자 포함</HelperText>
            </LabelRow>
            <PasswordInput
              id="password"
              hiddenLabel="비밀번호 표시"
              visibleLabel="비밀번호 숨김"
            />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            <PasswordInput
              id="passwordConfirm"
              hiddenLabel="비밀번호 확인 표시"
              visibleLabel="비밀번호 확인 숨김"
            />
          </FieldGroup>

          <CheckboxGroup>
            <CheckboxRow>
              <Checkbox id="agreeTerms" type="checkbox" />
              <CheckboxLabel htmlFor="agreeTerms">약관 동의</CheckboxLabel>
            </CheckboxRow>
            <CheckboxDescription>
              서비스 이용약관 및 개인정보 처리방침에 동의합니다
            </CheckboxDescription>
          </CheckboxGroup>

          <CheckboxGroup>
            <CheckboxRow>
              <Checkbox id="agreeMarketing" type="checkbox" />
              <CheckboxLabel htmlFor="agreeMarketing">마케팅 수신</CheckboxLabel>
            </CheckboxRow>
            <CheckboxDescription>
              신제품 소식, 추천 정보, 특별 혜택 안내를 받겠습니다 (선택)
            </CheckboxDescription>
          </CheckboxGroup>

          <SubmitButton type="submit">계정 생성</SubmitButton>
        </Form>

        <FooterText>
          이미 계정이 있나요? <FooterLink to="/login">로그인</FooterLink>
        </FooterText>
      </Main>
    </PageWrapper>
  );
};

export default SignUpPage;

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
  margin: 0 0 0.8rem;
  font-size: 2rem;
  font-weight: 700;
`;

const SectionDescription = styled.p`
  margin: 0 0 2.8rem;
  color: var(--color-navy);
  font-size: 1.4rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const HelperText = styled.span`
  color: var(--color-navy);
  font-size: 1.2rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const checkIcon = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
)}`;

const Checkbox = styled.input`
  appearance: none;
  width: 1.8rem;
  height: 1.8rem;
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
  background-color: var(--color-white);
  cursor: pointer;

  &:checked {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    background-image: url("${checkIcon}");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 1.4rem;
`;

const CheckboxDescription = styled.p`
  margin: 0;
  color: var(--color-navy);
  font-size: 1.2rem;
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
