import { useState } from "react";
import styled from "styled-components";
import sendIcon from "@assets/icons/community/send.svg";

const CommentInput = ({ onSubmit }) => {
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
        placeholder="댓글 내용을 작성해주세요"
      />
      <SendButton type="submit" aria-label="댓글 등록">
        <img src={sendIcon} alt="" />
      </SendButton>
    </Form>
  );
};

export default CommentInput;

const Form = styled.form`
  position: sticky;
  bottom: 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: calc(100% - 4.8rem);
  margin: 0.8rem auto 0;
  padding: 1.2rem;
  border-radius: 0.4rem;
  background: var(--color-soft-gray);
  box-shadow: 0 0.5rem 0.8rem 0 rgba(0, 0, 0, 0.08);
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
