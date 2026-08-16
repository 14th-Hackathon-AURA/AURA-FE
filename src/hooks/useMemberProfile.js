const MOCK_PROFILE = {
  nickname: "아기사자",
  joinedAt: "2024년 3월 가입",
  avatarUrl: null,
  membership: {
    grade: "silver",
    benefitsTitle: "실버 멤버 혜택",
    benefits: ["AI 제품 추천 서비스 기본 이용", "커뮤니티 배지 제공"],
  },
};

const useMemberProfile = () => MOCK_PROFILE;

export default useMemberProfile;
