import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import Button from "@components/common/Button";
import ProfileImageEditor from "@components/myhome/ProfileImageEditor";
import TextField from "@components/myhome/TextField";
import SelectField from "@components/myhome/SelectField";
import ChipGroup from "@components/myhome/ChipGroup";
import ProfileEditCompleteOverlay from "@components/myhome/ProfileEditCompleteOverlay";
import useProfileEditForm, {
  GENDER_OPTIONS,
  AGE_OPTIONS,
  CATEGORY_OPTIONS,
  USAGE_OPTIONS,
} from "@hooks/useProfileEditForm";

const EditProfilePage = () => {
  const {
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
  } = useProfileEditForm();

  return (
    <PageWrapper>
      <PageHeader title="프로필 수정" backTo="/mypage" />

      <Main as="form" onSubmit={handleSubmit}>
        <ProfileImageEditor previewUrl={avatarPreviewUrl} onChangeAvatar={handleAvatarChange} />

        <FieldsSection>
          <TextField
            label="닉네임"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <SelectField
            label="성별"
            placeholder="Select…"
            options={GENDER_OPTIONS}
            value={gender}
            onChange={setGender}
          />
          <SelectField
            label="나이대"
            placeholder="Select…"
            options={AGE_OPTIONS}
            value={ageGroup}
            onChange={setAgeGroup}
          />
        </FieldsSection>

        <InterestSection>
          <SectionTitle>관심 정보</SectionTitle>
          <ChipGroup
            label="카테고리"
            options={CATEGORY_OPTIONS}
            selected={categories}
            onToggle={toggleCategory}
          />
          <ChipGroup
            label="주요 활용 상황"
            options={USAGE_OPTIONS}
            selected={usageContexts}
            onToggle={toggleUsageContext}
          />
        </InterestSection>

        <BudgetSection>
          <SectionTitle>예산 설정</SectionTitle>
          <TextField
            placeholder="최소 금액"
            value={minBudget}
            onChange={(event) => setMinBudget(event.target.value)}
          />
          <TextField
            placeholder="최대 금액"
            value={maxBudget}
            onChange={(event) => setMaxBudget(event.target.value)}
          />
        </BudgetSection>

        <SaveButton type="submit">저장하기</SaveButton>
      </Main>

      {isSaved && <ProfileEditCompleteOverlay />}
    </PageWrapper>
  );
};

export default EditProfilePage;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.4rem;
`;

const FieldsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const InterestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-navy);
`;

const BudgetSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SaveButton = styled(Button)`
  align-self: flex-start;
  width: 8.2rem;
  height: 3.3rem;
  padding: 0.5rem 1.0rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
`;
