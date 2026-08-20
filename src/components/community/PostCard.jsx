import { Link } from "react-router-dom";
import styled from "styled-components";
import GradeBadge from "./GradeBadge";
import PostStats from "./PostStats";
import defaultProfile from "@assets/icons/default-profile.svg";

const PostCard = ({ post }) => (
  <Card to={`/community/${post.id}`}>
    <Row>
      <Avatar>
        <img src={post.author.avatarUrl || defaultProfile} alt="" />
      </Avatar>
      <Meta>
        <NicknameRow>
          <Nickname>{post.author.nickname}</Nickname>
          <GradeBadge grade={post.author.grade} />
        </NicknameRow>
        <SubText>
          {post.itemName} · {post.timeLabel}
        </SubText>
      </Meta>
    </Row>

    <Content>{post.title}</Content>

    <StatsRow>
      <PostStats
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        liked={post.liked}
      />
    </StatsRow>
  </Card>
);

export default PostCard;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 2rem 2rem 1.2rem;
  border-bottom: 1px solid #d4cfd8;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 999px;
  overflow: hidden;
  background: var(--color-avatar-bg);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Meta = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 0.4rem;
`;

const NicknameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Nickname = styled.span`
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-black);
`;

const SubText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-black);
`;

const Content = styled.p`
  margin: 0;
  font-size: 1.4rem;
  line-height: normal;
  color: var(--color-black);
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
