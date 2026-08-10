import { Outlet } from "react-router-dom";
import styled from "styled-components";

function MobileLayout() {
  return (
    <MobileShell>
      <MobileFrame>
        <Outlet />
      </MobileFrame>
    </MobileShell>
  );
}

export default MobileLayout;

const MobileShell = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100dvh;
  background-color: #f5f5f5;
`;

const MobileFrame = styled.div`
  width: 100%;
  min-width: 36rem;
  max-width: 42rem;
  min-height: 100dvh;
  background-color: #fff;
`;
