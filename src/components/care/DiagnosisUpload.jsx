import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/common/Button";
import CategorySelect from "@components/closet/register/CategorySelect";
import UploadActionMenu from "@components/closet/UploadActionMenu";
import cameraPlusIcon from "@assets/icons/care/camera-plus.svg";

const DiagnosisUpload = ({
  previewUrl,
  isDiagnosing,
  productId,
  productOptions,
  productsLoading,
  errorMessage,
  onProductChange,
  onImageChange,
  onStartDiagnosis,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const closeMenu = () => setIsMenuOpen(false);
    document.addEventListener("pointerdown", closeMenu);
    return () => document.removeEventListener("pointerdown", closeMenu);
  }, [isMenuOpen]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) onImageChange(file);
    event.target.value = "";
    setIsMenuOpen(false);
  };

  const handleTakePhoto = () => {
    setIsMenuOpen(false);
    cameraInputRef.current?.click();
  };

  const handleUploadImage = () => {
    setIsMenuOpen(false);
    galleryInputRef.current?.click();
  };

  const handleOpenMenu = () => {
    if (isDiagnosing) return;
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Section>
      <TitleRow>
        <Title>AI 상태 진단</Title>
        <HistoryButton to="/care/history">지난 기록 보기</HistoryButton>
      </TitleRow>

      <Description>
        구매한 제품의 현재 상태를 AI가 사진으로 확인해 드려요
      </Description>

      <CategorySelect
        label="제품 선택"
        placeholder={
          productsLoading ? "불러오는 중..." : "진단할 제품을 선택하세요"
        }
        options={productOptions}
        value={productId}
        onChange={onProductChange}
      />

      <UploadWrap onPointerDown={(event) => event.stopPropagation()}>
        <UploadBox
          type="button"
          aria-label="진단할 제품 사진 업로드"
          aria-expanded={isMenuOpen}
          onClick={handleOpenMenu}
        >
          {previewUrl ? (
            <Preview src={previewUrl} alt="업로드한 제품 사진" />
          ) : (
            <Placeholder>
              <PlusIcon src={cameraPlusIcon} alt="" />
              <PlaceholderText>
                진단할 제품의 사진을 <br />
                업로드 해주세요
              </PlaceholderText>
            </Placeholder>
          )}
        </UploadBox>

        {isMenuOpen && (
          <UploadActionMenu
            onTakePhoto={handleTakePhoto}
            onUploadImage={handleUploadImage}
          />
        )}

        <HiddenInput
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />
        <HiddenInput
          ref={galleryInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />
      </UploadWrap>

      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      <StartButton type="button" onClick={onStartDiagnosis}>
        AI 진단 시작하기
      </StartButton>
    </Section>
  );
};

export default DiagnosisUpload;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const HistoryButton = styled(Link)`
  flex-shrink: 0;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-gray);
  text-decoration: underline;
  text-underline-offset: 0.2rem;
`;

const Description = styled.p`
  margin: 1.6rem 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;

const UploadWrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1.6rem;
`;

const UploadBox = styled.button`
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 0.4rem;
  background: #f7f7f7;
`;

const Placeholder = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const PlusIcon = styled.img`
  width: 4.4rem;
  height: 4.4rem;
`;

const PlaceholderText = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-placeholder-gray);
  text-align: center;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ErrorText = styled.p`
  margin: 1.2rem 0 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-danger);
`;

const StartButton = styled(Button)`
  width: 100%;
  margin-top: 1.6rem;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.4rem;
  font-weight: 400;
`;
