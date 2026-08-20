import styled from "styled-components";
import eyeOpenIcon from "@assets/icons/Eye-open.svg";
import eyeCloseIcon from "@assets/icons/Eye-close.svg";
import usePasswordVisibility from "@hooks/usePasswordVisibility";
import Input from "./Input";

const PasswordInput = ({
  id,
  hiddenLabel = "비밀번호 표시",
  visibleLabel = "비밀번호 숨김",
  ...rest
}) => {
  const [isVisible, toggle] = usePasswordVisibility();

  return (
    <PasswordField>
      <Input id={id} type={isVisible ? "text" : "password"} {...rest} />
      <ToggleButton
        type="button"
        aria-label={isVisible ? visibleLabel : hiddenLabel}
        onClick={toggle}
      >
        <img src={isVisible ? eyeOpenIcon : eyeCloseIcon} alt="" />
      </ToggleButton>
    </PasswordField>
  );
};

export default PasswordInput;

const PasswordField = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${Input} {
    padding-right: 4rem;
  }

  ${Input}::-ms-reveal,
  ${Input}::-ms-clear {
    display: none;
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
