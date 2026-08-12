import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import eyeOpenIcon from "@assets/icons/Eye-open.svg";
import eyeCloseIcon from "@assets/icons/Eye-close.svg";

const SignUpPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);

  return (
    <PageWrapper>
      <Header>
        <BackButton as={Link} to="/" aria-label="이전으로">
          ‹
        </BackButton>
        <HeaderTitle>회원가입</HeaderTitle>
      </Header>

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
            <PasswordField>
              <Input id="password" type={isPasswordVisible ? "text" : "password"} />
              <ToggleButton
                type="button"
                aria-label={isPasswordVisible ? "비밀번호 숨김" : "비밀번호 표시"}
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                <img
                  src={isPasswordVisible ? eyeOpenIcon : eyeCloseIcon}
                  alt=""
                />
              </ToggleButton>
            </PasswordField>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            <PasswordField>
              <Input
                id="passwordConfirm"
                type={isPasswordConfirmVisible ? "text" : "password"}
              />
              <ToggleButton
                type="button"
                aria-label={
                  isPasswordConfirmVisible ? "비밀번호 확인 숨김" : "비밀번호 확인 표시"
                }
                onClick={() => setIsPasswordConfirmVisible((prev) => !prev)}
              >
                <img
                  src={isPasswordConfirmVisible ? eyeOpenIcon : eyeCloseIcon}
                  alt=""
                />
              </ToggleButton>
            </PasswordField>
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

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
`;

const HelperText = styled.span`
  color: var(--color-navy);
  font-size: 1.2rem;
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
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 1.6rem;
    height: 1.6rem;
  }
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

const Checkbox = styled.input`
  width: 1.8rem;
  height: 1.8rem;
`;

const CheckboxLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
`;

const CheckboxDescription = styled.p`
  margin: 0;
  padding-left: 2.6rem;
  color: var(--color-navy);
  font-size: 1.2rem;
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
