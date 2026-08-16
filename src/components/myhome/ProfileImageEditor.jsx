import styled from "styled-components";
import avatarEditIcon from "@assets/icons/myhome/avatar-edit.svg";

const ProfileImageEditor = ({ previewUrl, onChangeAvatar }) => {
  const handleFileChange = (event) => {
    onChangeAvatar(event.target.files?.[0]);
  };

  return (
    <Row>
      <Avatar>{previewUrl && <img src={previewUrl} alt="프로필 이미지" />}</Avatar>
      <UploadButton>
        <input type="file" accept="image/*" onChange={handleFileChange} hidden />
        <img src={avatarEditIcon} alt="프로필 이미지 변경" />
      </UploadButton>
    </Row>
  );
};

export default ProfileImageEditor;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-avatar-bg);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UploadButton = styled.label`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.2rem;
  height: 7.2rem;
  border: 1px solid var(--color-stroke-gray);
  border-radius: 50%;
  background: var(--color-soft-gray);
  cursor: pointer;

  img {
    width: 2.1rem;
    height: 1.9rem;
  }
`;
