import { useState, useCallback } from "react";
import useMemberProfile from "./useMemberProfile";
import useMultiSelect from "./useMultiSelect";

export const GENDER_OPTIONS = ["여성", "남성", "공개하지 않음"];

export const AGE_OPTIONS = [
  "10대 이하",
  "20대 초중반",
  "20대 중후반",
  "30대 초중반",
  "30대 중후반",
  "40대",
  "50-60대",
  "60대 이상",
];

export const CATEGORY_OPTIONS = ["핸드백", "숄더백", "백팩", "클러치", "파우치", "액세서리", "트래블"];

export const USAGE_OPTIONS = ["일상", "특별한 날", "여행", "비즈니스"];

const useProfileEditForm = () => {
  const profile = useMemberProfile();

  const [nickname, setNickname] = useState(profile.nickname);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(profile.avatarUrl);
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [categories, toggleCategory] = useMultiSelect([]);
  const [usageContexts, toggleUsageContext] = useMultiSelect([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleAvatarChange = useCallback((file) => {
    if (!file) return;
    setAvatarPreviewUrl(URL.createObjectURL(file));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setIsSaved(true);
  }, []);

  return {
    nickname,
    setNickname,
    avatarPreviewUrl,
    handleAvatarChange,
    gender,
    setGender,
    ageGroup,
    setAgeGroup,
    categories,
    toggleCategory,
    usageContexts,
    toggleUsageContext,
    minBudget,
    setMinBudget,
    maxBudget,
    setMaxBudget,
    isSaved,
    handleSubmit,
  };
};

export default useProfileEditForm;
