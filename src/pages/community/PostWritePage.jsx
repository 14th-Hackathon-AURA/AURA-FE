import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import Button from "@components/common/Button";
import ImageUploadField from "@components/community/ImageUploadField";
import ProductTagRow from "@components/community/ProductTagRow";
import ProductTagModal from "@components/community/ProductTagModal";
import tagIcon from "@assets/icons/community/tag.svg";
import usePostWriteForm from "@hooks/community/usePostWriteForm";
import { MOCK_CLOSET_ITEMS } from "@hooks/community/communityMockData";

const PostWritePage = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    imagePreviewUrl,
    handleImageChange,
    taggedProduct,
    removeTag,
    isTagModalOpen,
    openTagModal,
    closeTagModal,
    confirmTag,
    handleSubmit,
  } = usePostWriteForm();

  return (
    <PageWrapper>
      <PageHeader title="게시물 작성" backTo="/community" />

      <Main as="form" onSubmit={handleSubmit}>
        <TitleInput
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 작성해주세요"
        />
        <ContentInput
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 작성해주세요"
          rows={6}
        />

        <Divider />

        <FieldLabel>이미지 업로드하기</FieldLabel>
        <ImageUploadField previewUrl={imagePreviewUrl} onChange={handleImageChange} />

        <TagSection>
          <TagSectionHeader>
            <FieldLabel>제품 태그하기</FieldLabel>
            {taggedProduct && (
              <TagAddLink type="button" onClick={openTagModal}>
                태그 추가
              </TagAddLink>
            )}
          </TagSectionHeader>

          {taggedProduct ? (
            <ProductTagRow
              name={taggedProduct.name}
              sub={`${taggedProduct.category} · ${taggedProduct.registeredLabel}`}
              onRemove={removeTag}
            />
          ) : (
            <EmptyTagRow>
              <Avatar />
              <Spacer />
              <TagAddButton type="button" onClick={openTagModal}>
                <img src={tagIcon} alt="" />
                제품 태그 추가하기
              </TagAddButton>
            </EmptyTagRow>
          )}
        </TagSection>

        <SubmitButton type="submit">게시물 올리기</SubmitButton>

        <Disclaimer>
          ⚠ 이 게시물에 포함된 관리·케어 경험은 개인적인 사용 경험입니다. 공식 관리 지침이나 전문 수선
          판단을 대체하지 않습니다.
        </Disclaimer>
      </Main>

      {isTagModalOpen && (
        <ProductTagModal
          items={MOCK_CLOSET_ITEMS}
          initialSelectedId={taggedProduct?.id ?? null}
          onCancel={closeTagModal}
          onConfirm={confirmTag}
        />
      )}
    </PageWrapper>
  );
};

export default PostWritePage;

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
  gap: 1.6rem;
  padding: 2.4rem;
`;

const TitleInput = styled.input`
  width: 100%;
  border: none;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);

  &::placeholder {
    color: var(--color-black);
  }
`;

const ContentInput = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font-family: inherit;
  font-size: 1.4rem;
  color: var(--color-black);
  height: 17.5rem;

  &::placeholder {
    color: #767179;
  }
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: 0;
  border: none;
  background: var(--color-stroke-gray);
`;

const FieldLabel = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-black);
`;

const TagSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

const TagSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TagAddLink = styled.button`
  font-size: 1.4rem;
  color: var(--color-mediumgray);
  text-decoration: underline;
`;

const EmptyTagRow = styled.div`
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
  border: 1px solid var(--color-input-border);
  background: #f7f7f7;
`;

const Spacer = styled.div`
  flex: 1;
`;

const TagAddButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 6rem;
  padding: 0.8rem 1.6rem;
  border: 1px solid var(--color-navy);
  border-radius: 30px;
  background: var(--color-white);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-navy);

  img {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  font-size: 1.4rem;
`;

const Disclaimer = styled.p`
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5;
  color: #767179;
`;
