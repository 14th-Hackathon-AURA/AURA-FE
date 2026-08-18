import { useEffect, useState } from "react";
import { getMyProfile } from "@apis/profile";

const MEMBERSHIP_BENEFITS = {
  silver: {
    benefitsTitle: "실버 멤버 혜택",
    benefits: ["AI 제품 추천 서비스 기본 이용", "커뮤니티 배지 제공"],
  },
  gold: {
    benefitsTitle: "골드 멤버 혜택",
    benefits: ["AI 제품 추천 서비스 무제한 이용", "우선 AS 예약"],
  },
  platinum: {
    benefitsTitle: "플래티넘 멤버 혜택",
    benefits: ["전담 케어 상담", "프리미엄 이벤트 초청"],
  },
  diamond: {
    benefitsTitle: "다이아몬드 멤버 혜택",
    benefits: ["VIP 전용 라운지 이용", "연간 무료 케어 서비스"],
  },
};

const useMemberProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getMyProfile()
      .then((data) => {
        if (mounted) setProfile(data);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // "AURA Silver" -> "silver" 처럼 접두어를 떼고 소문자로 변환
  const rawTier = profile?.membership_tier || "AURA Silver";
  const grade = rawTier.replace(/^AURA\s+/i, "").toLowerCase();
  const benefitsInfo = MEMBERSHIP_BENEFITS[grade] || MEMBERSHIP_BENEFITS.silver;

  return {
    nickname: profile?.nickname || "",
    avatarUrl: profile?.image || null,
    joinedAt: profile?.date_joined
      ? `${new Date(profile.date_joined).getFullYear()}년 ${new Date(profile.date_joined).getMonth() + 1}월 가입`
      : "",
    membership: {
      grade,
      ...benefitsInfo,
    },
    isLoading,
    raw: profile,
  };
};

export default useMemberProfile;