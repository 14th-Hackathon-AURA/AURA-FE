import styled from "styled-components";
import deleteIcon from "@assets/icons/closet/delete.svg";
import editIcon from "@assets/icons/closet/edit.svg";

const ClosetActionMenu = ({ onDelete, onEdit }) => (
  <Menu role="menu" onPointerDown={(event) => event.stopPropagation()}>
    <MenuItem type="button" role="menuitem" onClick={onDelete}>
      <span>삭제하기</span>
      <Icon src={deleteIcon} alt="" />
    </MenuItem>

    <Divider />

    <MenuItem type="button" role="menuitem" onClick={onEdit}>
      <span>수정하기</span>
      <Icon src={editIcon} alt="" />
    </MenuItem>
  </Menu>
);

export default ClosetActionMenu;

const Menu = styled.div`
  position: absolute;
  top: 7.4rem;
  right: 2.4rem;
  z-index: 4;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  background: var(--color-white);
  box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.04);
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.2rem;
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-black);
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--color-input-border);
`;

const Icon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
`;
