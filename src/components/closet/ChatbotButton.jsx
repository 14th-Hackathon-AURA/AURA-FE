import styled from "styled-components";
import chatbotIcon from "@assets/icons/chatbot.svg";

const ChatbotButton = ({ onClick }) => (
  <Fab type="button" onClick={onClick} aria-label="챗봇">
    <Icon src={chatbotIcon} alt="" />
  </Fab>
);

export default ChatbotButton;

const Fab = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 8.8rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 3.333px 13.333px 0 rgba(0, 0, 0, 0.25);
`;

const Icon = styled.img`
  width: auto;
  height: 3.2rem;
`;
