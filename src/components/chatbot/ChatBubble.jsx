import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/common/Button";

const ChatBubble = ({ role, text, action }) => {
  if (role === "user") {
    return (
      <UserRow>
        <UserBubble>{text}</UserBubble>
      </UserRow>
    );
  }

  return (
    <AiRow>
      <AiBubble>{text}</AiBubble>
      {action && (
        <ActionButton as={Link} to={action.to}>
          {action.label}
        </ActionButton>
      )}
    </AiRow>
  );
};

export default ChatBubble;

const UserRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const UserBubble = styled.p`
  max-width: 80%;
  margin: 0;
  padding: 1.2rem;
  border: 1px solid var(--color-stroke-gray);
  border-radius: 0.4rem;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-black);
  text-align: right;
  white-space: pre-line;
`;

const AiRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.3rem;
  width: 100%;
`;

const AiBubble = styled.p`
  max-width: 80%;
  margin: 0;
  padding: 1.2rem;
  border-radius: 0.4rem;
  background: #f7f7f7;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-black);
  white-space: pre-line;
`;

const ActionButton = styled(Button)`
  width: 10rem;
  padding: 1rem 1.2rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  color: var(--color-ivory);
`;
