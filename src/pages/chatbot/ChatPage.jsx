import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import Button from "@components/common/Button";
import ChatBubble from "@components/chatbot/ChatBubble";
import ChatInputBar from "@components/chatbot/ChatInputBar";
import useMemberProfile from "@hooks/useMemberProfile";

// 추후 경로 수정 예정
const VISIT_CARD_LIST_PATH = "/chatbot/visit-cards";

const ChatPage = () => {
  const { nickname } = useMemberProfile();
  const [messages, setMessages] = useState([]);
  const listEndRef = useRef(null);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  const handleSend = (text) => {
    const userMessage = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    // 추후 백엔드 API 연결 후 수정 예정
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "카드 형식으로 정리를 완료했어요.\n다음을 눌러 확인해보세요.",
          action: { label: "방문 카드 확인", to: VISIT_CARD_LIST_PATH },
        },
      ]);
    }, 600);
  };

  return (
    <PageWrapper>
      <PageHeader title="AI 챗봇" />

      <Body>
        {messages.length === 0 ? (
          <EmptyState>
            <Greeting>
              반가워요, {nickname}님
              <br />
              무엇이든 물어보세요
            </Greeting>
            <VisitListButton as={Link} to={VISIT_CARD_LIST_PATH}>
              방문 카드 목록
            </VisitListButton>
          </EmptyState>
        ) : (
          <MessageList>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                role={message.role}
                text={message.text}
                action={message.action}
              />
            ))}
            <div ref={listEndRef} />
          </MessageList>
        )}
      </Body>

      <ChatInputBar onSubmit={handleSend} />
    </PageWrapper>
  );
};

export default ChatPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--color-white);
`;

const Body = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
  padding: 0 2.4rem;
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-top: 18rem;
`;

const Greeting = styled.p`
  margin: 0;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.5;
  text-align: center;
  color: var(--color-black);
`;

const VisitListButton = styled(Button)`
  align-self: center;
  width: 17rem;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  color: var(--color-ivory);
  align-items: center;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem 0;
`;
