import styled from "styled-components";

const ProfileEditCompleteOverlay = () => (
  <Overlay>
    <Toast>프로필 수정 완료!</Toast>
  </Overlay>
);

export default ProfileEditCompleteOverlay;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;

const Toast = styled.p`
  margin: 0;
  padding: 1.6rem 2rem;
  border-radius: 0.4rem;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--color-black);
  text-align: center;
  white-space: nowrap;
`;
