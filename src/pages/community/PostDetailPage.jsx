import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import GradeBadge from "@components/community/GradeBadge";
import PostStats from "@components/community/PostStats";
import ProductTagRow from "@components/community/ProductTagRow";
import CommentItem from "@components/community/CommentItem";
import CommentInput from "@components/community/CommentInput";
import useCommunityStore from "@hooks/community/useCommunityStore";
import defaultProfile from "@assets/icons/default-profile.svg";

const PostDetailPage = () => {
  const { postId } = useParams();
  const { getPostById, toggleLike, addComment, isLoading } =
    useCommunityStore();
  const post = getPostById(postId);

  if (!post) {
    return (
      <PageWrapper>
        <PageHeader title="게시물 상세" backTo="/community" />
        <EmptyState>
          {isLoading ? "불러오는 중..." : "게시물을 찾을 수 없어요"}
        </EmptyState>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageHeader title="게시물 상세" backTo="/community" />

      <Main>
        <Section>
          <AuthorRow>
            <Avatar>
              <img src={post.author.avatarUrl || defaultProfile} alt="" />
            </Avatar>
            <AuthorMeta>
              <NicknameRow>
                <Nickname>{post.author.nickname}</Nickname>
                <GradeBadge grade={post.author.grade} />
              </NicknameRow>
              <DateText>{post.createdLabel}</DateText>
            </AuthorMeta>
            <Spacer />
            <EditLink type="button">수정하기</EditLink>
          </AuthorRow>

          <BodyText>{post.title}</BodyText>
          {post.content && <BodyText>{post.content}</BodyText>}

          {post.images.length > 0 && (
            <ImageGrid>
              {post.images.map((src, index) => (
                <ImageBox key={index}>
                  {src ? (
                    <img src={src} alt="" />
                  ) : (
                    <PlaceholderLabel>Image</PlaceholderLabel>
                  )}
                </ImageBox>
              ))}
            </ImageGrid>
          )}

          {post.taggedProduct && (
            <TagSection>
              <TagLabel>태그된 제품</TagLabel>
              <ProductTagRow
                name={post.taggedProduct.name}
                sub={post.taggedProduct.brand}
              />
            </TagSection>
          )}
        </Section>

        <Section>
          <CommentsHeader>
            <CommentsTitle>댓글</CommentsTitle>
            <PostStats
              variant="labeled"
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              liked={post.liked}
              onToggleLike={() => toggleLike(post.id)}
            />
          </CommentsHeader>

          <CommentList>
            {post.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                nickname={comment.nickname}
                content={comment.content}
                avatarUrl={comment.avatarUrl}
              />
            ))}
          </CommentList>
        </Section>
      </Main>

      <CommentInput
        onSubmit={(text) => addComment(post.id, text).catch(() => {})}
      />
    </PageWrapper>
  );
};

export default PostDetailPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const AuthorRow = styled.div`
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
  overflow: hidden;
  background: var(--color-avatar-bg);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const NicknameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Nickname = styled.span`
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-navy);
`;

const DateText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-navy);
`;

const Spacer = styled.div`
  flex: 1;
`;

const EditLink = styled.button`
  flex-shrink: 0;
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--color-mediumgray);
  text-decoration: underline;
`;

const BodyText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  line-height: normal;
  color: var(--color-black);
`;

const ImageGrid = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const ImageBox = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 11.7rem;
  height: 11.7rem;
  border-radius: 0.4rem;
  background: #f7f7f7;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderLabel = styled.span`
  font-size: 1.1rem;
  color: #9ca3af;
`;

const TagSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

const TagLabel = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-navy);
`;

const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  width: 100%;
`;

const CommentsTitle = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-navy);
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const EmptyState = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 4rem 2.4rem;
  font-size: 1.4rem;
  color: var(--color-mediumgray);
`;
