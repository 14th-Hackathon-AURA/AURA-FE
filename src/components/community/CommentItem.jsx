import styled from "styled-components";

const CommentItem = ({ nickname, content }) => (
  <Row>
    <Avatar />
    <Text>
      <Nickname>{nickname}</Nickname>
      <Content>{content}</Content>
    </Text>
  </Row>
);

export default CommentItem;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 999px;
  background: var(--color-avatar-bg);
`;

const Text = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-navy);
`;

const Nickname = styled.p`
  margin: 0;
  font-weight: 600;
`;

const Content = styled.p`
  margin: 0;
  font-weight: 400;
`;
