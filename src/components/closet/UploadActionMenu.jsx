import styled from "styled-components";
import cameraIcon from "@assets/icons/closet/camera.svg";
import pictureIcon from "@assets/icons/closet/picture.svg";

const UploadActionMenu = ({ onTakePhoto, onUploadImage }) => (
  <Menu role="menu" onPointerDown={(event) => event.stopPropagation()}>
    <MenuItem type="button" role="menuitem" onClick={onTakePhoto}>
      <span>촬영하기</span>
      <Icon src={cameraIcon} alt="" />
    </MenuItem>

    <Divider />

    <MenuItem type="button" role="menuitem" onClick={onUploadImage}>
      <span>이미지 업로드</span>
      <Icon src={pictureIcon} alt="" />
    </MenuItem>
  </Menu>
);

export default UploadActionMenu;

const Menu = styled.div`
  position: absolute;
  top: 4rem;
  right: 2.2rem;
  z-index: 4;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  background: var(--color-white);
  box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.08);
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.2rem;
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
  white-space: nowrap;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--color-input-border);
`;

const Icon = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  flex-shrink: 0;
`;
