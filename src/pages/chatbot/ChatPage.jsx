import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import Button from "@components/common/Button";
import ChatBubble from "@components/chatbot/ChatBubble";
import ChatInputBar from "@components/chatbot/ChatInputBar";
import useMemberProfile from "@hooks/useMemberProfile";
import { sendChatMessage } from "@apis/chat";

// 추후 경로 수정 예정
const VISIT_CARD_LIST_PATH = "/chatbot/visit-cards";

const ChatPage = () => {
  const { nickname } = useMemberProfile();
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const listEndRef = useRef(null);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  const handleSend = async (text) => {
    const userMessage = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const data = await sendChatMessage({ sessionId, message: text });

      if (data.session_id) setSessionId(data.session_id);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: data.reply, // 실제 응답 필드명 확인 후 필요시 수정
          recommendedProducts: data.recommended_products || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "죄송해요, 답변을 가져오지 못했어요. 잠시 후 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
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
                recommendedProducts={message.recommendedProducts}
                sessionId={sessionId}
              />
            ))}
            <div ref={listEndRef} />
          </MessageList>
        )}
      </Body>

      <ChatInputBar onSubmit={handleSend} disabled={isSending} />
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
