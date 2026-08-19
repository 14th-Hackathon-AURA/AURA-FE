import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import cameraPlusIcon from "@assets/icons/closet/camera-plus.svg";
import UploadActionMenu from "@components/closet/UploadActionMenu";

const ReceiptUploader = ({ previewUrl, onChange }) => {
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
    if (file) onChange(file);
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

  return (
    <Section>
      <Heading>
        제품 등록을 위해 <br /> 보증서 혹은 영수증을 업로드 해주세요
      </Heading>
      <SubText>걱정마세요, 구매 정보는 제품 등록용으로만 사용됩니다.</SubText>

      <UploadWrap onPointerDown={(event) => event.stopPropagation()}>
        <UploadBox
          type="button"
          aria-label="보증서 또는 영수증 업로드"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {previewUrl ? (
            <Preview src={previewUrl} alt="업로드한 영수증" />
          ) : (
            <Placeholder>
              <PlusIcon src={cameraPlusIcon} alt="" />
              <PlaceholderText>
                구매한 제품의 보증서
                <br /> 또는 영수증을 업로드 해주세요
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

      <HelpText>
        JPG, PNG 형식의 텍스트가 잘 보이는 사진을 올려주세요.
        <br />
        사진이 없다면, 아래 정보칸에서 직접 작성할 수 있어요
      </HelpText>
    </Section>
  );
};

export default ReceiptUploader;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-black);
`;

const SubText = styled.p`
  margin: 0.8rem 0 0;
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

const HelpText = styled.p`
  margin: 1.6rem 0;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;
