import { useState } from "react";
import styled from "styled-components";
import sendIcon from "@assets/icons/chatbot/send.svg";

const ChatInputBar = ({ onSubmit, placeholder = "궁금한 내용을 편하게 질문해주세요" }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
      />
      <SendButton type="submit" aria-label="전송">
        <img src={sendIcon} alt="" />
      </SendButton>
    </Form>
  );
};

export default ChatInputBar;

const Form = styled.form`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: calc(100% - 4.8rem);
  margin: 0 auto 2.4rem;
  padding: 1.3rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.4rem;
  background: var(--color-soft-gray);
  box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.06);
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  color: var(--color-black);

  &::placeholder {
    color: #767179;
  }
`;

const SendButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 2.1rem;
    height: 1.875rem;
  }
`;
