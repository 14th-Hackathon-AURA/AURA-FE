export const mapMembershipGrade = (tier) =>
  (tier || "AURA Silver").replace(/^AURA\s+/i, "").toLowerCase();

const formatDateLabel = (isoString) => {
  const date = new Date(isoString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const period = date.getHours() < 12 ? "오전" : "오후";
  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}월 ${day}일 ${period} ${hours}:${minutes}`;
};

const formatTimeLabel = (isoString) => {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}일 전`;
  return formatDateLabel(isoString);
};

export const mapComment = (apiComment) => ({
  id: apiComment.id,
  nickname: apiComment.author_nickname,
  content: apiComment.body,
});

export const mapPost = (apiPost) => {
  const taggedProductCard = apiPost.tagged_product_cards?.[0] ?? null;
  const images = [
    ...(apiPost.image ? [apiPost.image] : []),
    ...(apiPost.images ?? []).map((image) => image.image),
  ];

  return {
    id: apiPost.id,
    author: {
      nickname: apiPost.author_nickname,
      grade: mapMembershipGrade(apiPost.author_membership_tier),
    },
    itemName: taggedProductCard?.name ?? "",
    timeLabel: formatTimeLabel(apiPost.created_at),
    createdLabel: formatDateLabel(apiPost.created_at),
    title: apiPost.title,
    content: apiPost.body,
    images,
    taggedProduct: taggedProductCard
      ? {
          id: taggedProductCard.id,
          name: taggedProductCard.name,
          brand: taggedProductCard.brand,
          image: taggedProductCard.image || taggedProductCard.image_url || null,
        }
      : null,
    likeCount: apiPost.like_count,
    liked: apiPost.liked_by_me,
    commentCount: apiPost.comments?.length ?? 0,
    comments: (apiPost.comments ?? []).map(mapComment),
  };
};
