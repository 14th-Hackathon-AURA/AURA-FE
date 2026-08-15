import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/common/Button";

const ProfileSummary = ({ avatarUrl, nickname, joinedAt }) => (
  <Row>
    <Identity>
      <Avatar>{avatarUrl && <img src={avatarUrl} alt="" />}</Avatar>
      <NameBlock>
        <Nickname>{nickname}</Nickname>
        <JoinedAt>{joinedAt}</JoinedAt>
      </NameBlock>
    </Identity>

    <EditButton as={Link} to="/mypage/edit-profile">
      프로필 수정
    </EditButton>
  </Row>
);

export default ProfileSummary;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  width: 100%;
`;

const Identity = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-avatar-bg);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Nickname = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-navy);
`;

const JoinedAt = styled.p`
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.5;
  color: var(--color-navy);
`;

const EditButton = styled(Button)`
  flex-shrink: 0;
  width: 11.2rem;
  height: 3.3rem;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  color: var(--color-ivory);
`;
