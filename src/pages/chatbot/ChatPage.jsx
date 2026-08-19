import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import ChatBubble from "@components/chatbot/ChatBubble";
import ChatInputBar from "@components/chatbot/ChatInputBar";
import useMemberProfile from "@hooks/useMemberProfile";
import { sendChatMessage } from "@apis/chat";

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
          text: data.answer,
          recommendedProducts: data.recommended_products || [],
        },
      ]);
    } catch (error) {
      const detail = error.response?.data?.detail;
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: detail || "죄송해요, 답변을 가져오지 못했어요. 잠시 후 다시 시도해주세요.",
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

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem 0;
`;
