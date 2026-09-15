import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import ChatBubble, { ChatBubbleSkeleton } from "@components/chatbot/ChatBubble";
import ChatInputBar from "@components/chatbot/ChatInputBar";
import Button from "@components/common/Button";
import CompleteOverlay from "@components/common/CompleteOverlay";
import useMemberProfile from "@hooks/useMemberProfile";
import { sendChatMessage } from "@apis/chat";
import { createVisitCard } from "@apis/visitCards";

const CHAT_STORAGE_KEY = "aura_chat_state";
const VISIT_CARD_ACTION_STATE = { from: "/chatbot" };
const EMPTY_CHAT = { messages: [], sessionId: null };

const readStoredChat = () => {
  try {
    const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return EMPTY_CHAT;
    const parsed = JSON.parse(raw);
    return {
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
      sessionId: parsed.sessionId ?? null,
    };
  } catch {
    return EMPTY_CHAT;
  }
};

const clearStoredChat = () => {
  sessionStorage.removeItem(CHAT_STORAGE_KEY);
};

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname } = useMemberProfile();
  const [messages, setMessages] = useState(() => {
    if (location.state?.resetChat) {
      clearStoredChat();
      return EMPTY_CHAT.messages;
    }
    return readStoredChat().messages;
  });
  const [sessionId, setSessionId] = useState(() => {
    if (location.state?.resetChat) return EMPTY_CHAT.sessionId;
    return readStoredChat().sessionId;
  });
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const listEndRef = useRef(null);

  useEffect(() => {
    if (!location.state?.resetChat) return;
    navigate(".", { replace: true, state: null });
  }, [location.state, navigate]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isSending]);

  useEffect(() => {
    sessionStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify({ messages, sessionId }),
    );
  }, [messages, sessionId]);

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timer = window.setTimeout(() => setToastMessage(null), 1500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const VISIT_CARD_SAVED_TEXT =
    "카드 형식으로 정리를 완료했어요.\n다음을 눌러 확인해보세요.";

  const buildAiMessage = (data) => {
    const visitCard = data.visit_card;
    const cardId = visitCard?.id;

    return {
      id: Date.now() + 1,
      role: "ai",
      text: visitCard ? VISIT_CARD_SAVED_TEXT : data.answer,
      recommendedProducts: data.recommended_products || [],
      action: visitCard
        ? {
            label: "방문 카드 확인",
            to: cardId
              ? `/chatbot/store-visit/${cardId}`
              : "/chatbot/store-visit",
            state: VISIT_CARD_ACTION_STATE,
          }
        : undefined,
    };
  };

  const handleSend = async (text) => {
    const userMessage = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const data = await sendChatMessage({ sessionId, message: text });

      if (data.session_id) setSessionId(data.session_id);

      setMessages((prev) => [...prev, buildAiMessage(data)]);
    } catch (error) {
      const detail = error.response?.data?.detail;
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text:
            detail ||
            "죄송해요, 답변을 가져오지 못했어요. 잠시 후 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveCard = async (productCode) => {
    setIsSending(true);

    try {
      if (sessionId) {
        const data = await sendChatMessage({
          sessionId,
          message: "이 제품 카드로 저장해줘",
          productCode,
        });

        if (data.session_id) setSessionId(data.session_id);
        setMessages((prev) => [...prev, buildAiMessage(data)]);
        return;
      }

      const card = await createVisitCard({ styleCode: productCode });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: VISIT_CARD_SAVED_TEXT,
          action: {
            label: "방문 카드 확인",
            to: card?.id
              ? `/chatbot/store-visit/${card.id}`
              : "/chatbot/store-visit",
            state: VISIT_CARD_ACTION_STATE,
          },
        },
      ]);
    } catch {
      setToastMessage("저장에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <PageWrapper>
      <PageHeader title="AI 챗봇" backTo="/closet" />

      <Body>
        {messages.length === 0 ? (
          <EmptyState>
            <Greeting>
              {nickname ? `반가워요, ${nickname}님` : "반가워요,"}
              <br />
              무엇이든 물어보세요
            </Greeting>
            <VisitCardButton
              type="button"
              onClick={() => navigate("/chatbot/store-visit")}
            >
              방문 카드 목록
            </VisitCardButton>
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
                onSaveCard={handleSaveCard}
              />
            ))}
            {isSending && <ChatBubbleSkeleton />}
            <div ref={listEndRef} />
          </MessageList>
        )}
      </Body>

      <ChatInputBar onSubmit={handleSend} disabled={isSending} />

      {toastMessage && (
        <CompleteOverlay
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </PageWrapper>
  );
};

export default ChatPage;

const PageWrapper = styled.div`
  position: relative;
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

const VisitCardButton = styled(Button)`
  align-self: center;
  width: auto;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
`;
