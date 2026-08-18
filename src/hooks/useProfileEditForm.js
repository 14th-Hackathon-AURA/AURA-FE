import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMemberProfile from "./useMemberProfile";
import useMultiSelect from "./useMultiSelect";
import { updateMyProfile } from "@apis/profile";

const SAVE_COMPLETE_REDIRECT_DELAY = 1200;

export const GENDER_OPTIONS = ["여성", "남성", "기타/응답 안 함"];

const GENDER_LABEL_TO_VALUE = {
  "여성": "FEMALE",
  "남성": "MALE",
  "기타/응답 안 함": "OTHER",
};
const GENDER_VALUE_TO_LABEL = Object.fromEntries(
  Object.entries(GENDER_LABEL_TO_VALUE).map(([label, value]) => [value, label]),
);

export const AGE_OPTIONS = [
  "10대 이하", "20대 초중반", "20대 중후반", "30대 초중반",
  "30대 중후반", "40대", "50-60대", "60대 이상",
]; // age_range는 choices 없는 자유 문자열 필드라 그대로 둬도 됨

export const CATEGORY_OPTIONS = ["핸드백", "숄더백", "백팩", "클러치", "파우치", "액세서리", "트래블"];
export const USAGE_OPTIONS = ["일상", "특별한 날", "여행", "비즈니스"]; // BE의 lifestyle 필드에 저장됨

const useProfileEditForm = () => {
  const { raw } = useMemberProfile();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [categories, toggleCategory, setCategories] = useMultiSelect([]);
  const [usageContexts, toggleUsageContext, setUsageContexts] = useMultiSelect([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [loadedRaw, setLoadedRaw] = useState(null);
  if (raw && raw !== loadedRaw) {
    setLoadedRaw(raw);
    setNickname(raw.nickname || "");
    setAvatarPreviewUrl(raw.image || null);
    setGender(GENDER_VALUE_TO_LABEL[raw.gender] || "");
    setAgeGroup(raw.age_range || "");
    setMinBudget(raw.min_budget != null ? String(raw.min_budget) : "");
    setMaxBudget(raw.max_budget != null ? String(raw.max_budget) : "");
    setCategories(raw.preferred_categories || []);
    setUsageContexts(raw.lifestyle || []);
  }

  const handleAvatarChange = useCallback((file) => {
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreviewUrl(URL.createObjectURL(file));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setError("");
      setIsSubmitting(true);
      try {
        await updateMyProfile(
          {
            nickname,
            gender: GENDER_LABEL_TO_VALUE[gender] || "",
            age_range: ageGroup,
            preferred_categories: categories,
            lifestyle: usageContexts,
            min_budget: minBudget || undefined,
            max_budget: maxBudget || undefined,
          },
          avatarFile,
        );
        setIsSaved(true);
      } catch {
        setError("저장에 실패했어요. 입력값을 확인해주세요.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [nickname, gender, ageGroup, categories, usageContexts, minBudget, maxBudget, avatarFile],
  );

  useEffect(() => {
    if (!isSaved) return;
    const timer = setTimeout(() => navigate("/mypage"), SAVE_COMPLETE_REDIRECT_DELAY);
    return () => clearTimeout(timer);
  }, [isSaved, navigate]);

  return {
    nickname, setNickname,
    avatarPreviewUrl, handleAvatarChange,
    gender, setGender,
    ageGroup, setAgeGroup,
    categories, toggleCategory,
    usageContexts, toggleUsageContext,
    minBudget, setMinBudget,
    maxBudget, setMaxBudget,
    isSaved, isSubmitting, error,
    handleSubmit,
  };
};

export default useProfileEditForm;