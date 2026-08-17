import styled from "styled-components";
import commentIcon from "@assets/icons/community/comment.svg";

const HeartIcon = ({ filled }) => (
  <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 2.58394C9 5.5013 4.82987 7.86269 4.65228 7.96021C4.60547 7.98633 4.55315 8 4.5 8C4.44685 8 4.39453 7.98633 4.34772 7.96021C4.17013 7.86269 0 5.5013 0 2.58394C0.000744403 1.89888 0.263435 1.24209 0.73044 0.757672C1.19745 0.273256 1.83063 0.000772156 2.49107 0C3.32076 0 4.04719 0.370087 4.5 0.995651C4.95281 0.370087 5.67924 0 6.50893 0C7.16937 0.000772156 7.80255 0.273256 8.26956 0.757672C8.73657 1.24209 8.99926 1.89888 9 2.58394Z"
      fill={filled ? "#FF7979" : "none"}
      stroke={filled ? "none" : "#B8B2BC"}
      strokeWidth={filled ? 0 : 0.8}
    />
  </svg>
);

const PostStats = ({ likeCount, commentCount, liked = false, onToggleLike, variant = "compact" }) => {
  const labeled = variant === "labeled";

  return (
    <Wrapper>
      {onToggleLike ? (
        <LikeButton type="button" onClick={onToggleLike} aria-pressed={liked}>
          <HeartIcon filled={liked} />
          <StatText>{labeled ? `좋아요 ${likeCount}` : likeCount}</StatText>
        </LikeButton>
      ) : (
        <StatItem>
          <HeartIcon filled={liked} />
          <StatText>{labeled ? `좋아요 ${likeCount}` : likeCount}</StatText>
        </StatItem>
      )}
      <StatItem>
        <img src={commentIcon} alt="" width={8} height={8} />
        <StatText>{labeled ? `댓글 ${commentCount}` : commentCount}</StatText>
      </StatItem>
    </Wrapper>
  );
};

export default PostStats;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StatText = styled.span`
  font-size: 1.1rem;
  line-height: 1.5;
  color: var(--color-black);
`;
