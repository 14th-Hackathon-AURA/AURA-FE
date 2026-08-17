import { useRef } from "react";
import styled from "styled-components";
import uploadBoxIcon from "@assets/icons/community/upload-box.svg";

const ImageUploadField = ({ previewUrl, onChange }) => {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <Box type="button" onClick={() => inputRef.current?.click()} aria-label="이미지 업로드하기">
      {previewUrl ? <Preview src={previewUrl} alt="업로드한 이미지" /> : <Placeholder src={uploadBoxIcon} alt="" />}
      <HiddenInput ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
    </Box>
  );
};

export default ImageUploadField;

const Box = styled.button`
  position: relative;
  width: 11.7rem;
  height: 11.7rem;
  border-radius: 0.4rem;
  overflow: hidden;
`;

const Placeholder = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;
