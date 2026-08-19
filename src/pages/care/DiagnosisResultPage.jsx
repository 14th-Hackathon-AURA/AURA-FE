import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import Button from "@components/common/Button";
import locationMarker from "@assets/icons/care/location-marker.svg";
import warnIcon from "@assets/icons/care/warn.svg";
import { MOCK_DIAGNOSIS_RESULT } from "@mocks/diagnosisHistoryMockData";

const STATUS_MAP = {
  warn: { label: "주의", color: "var(--color-warn)" },
  safe: { label: "안전", color: "var(--color-safe)" },
  danger: { label: "위험", color: "var(--color-danger)" },
};

const SPOTLIGHT_RADIUS = "2rem";

const DiagnosisResultPage = () => {
  const navigate = useNavigate();
  const result = MOCK_DIAGNOSIS_RESULT;
  const status = STATUS_MAP[result.status];

  return (
    <PageWrapper>
      <PageHeader title="진단 결과" backTo="/care" />

      <Main>
        <Headline>{result.damageCount}개의 손상을 발견했어요</Headline>

        <ProductRow>
          <ProductText>[{result.productName}] 진단 결과:</ProductText>
          <StatusBadge $color={status.color}>{status.label}</StatusBadge>
        </ProductRow>

        <PreviewWrap>
          <Photo src={result.image} alt={`${result.productName} 진단 사진`} />
          <DimOverlay aria-hidden>
            <svg width="100%" height="100%">
              <defs>
                <mask id="diagnosis-spotlight-mask">
                  <rect width="100%" height="100%" fill="white" />
                  {result.markers.map((marker) => (
                    <Hole key={marker.id} cx={marker.left} cy={marker.top} />
                  ))}
                </mask>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="rgba(0, 0, 0, 0.55)"
                mask="url(#diagnosis-spotlight-mask)"
              />
            </svg>
          </DimOverlay>
          {result.markers.map((marker) => (
            <DamagePoint key={marker.id} $top={marker.top} $left={marker.left}>
              <Marker src={locationMarker} alt="" />
            </DamagePoint>
          ))}
          <RetakeButton type="button" onClick={() => navigate("/care")}>
            다시 촬영하기
          </RetakeButton>
        </PreviewWrap>

        <InfoSection>
          <InfoBlock>
            <InfoLabel>손상 상태</InfoLabel>
            <InfoText>{result.damageStatus}</InfoText>
          </InfoBlock>
          <InfoBlock>
            <InfoLabel>관리 제안</InfoLabel>
            <InfoText>{result.careSuggestion}</InfoText>
          </InfoBlock>
        </InfoSection>

        <SubSection>
          <WarnIcon src={warnIcon} alt="" />
          <SubText>
            이 진단은 참고 목적으로만 제공됩니다. 내부 손상이나 정밀 점검이
            필요한 경우, 공식 수선 센터 방문을 권장합니다.
          </SubText>
        </SubSection>

        <AsButton type="button" onClick={() => navigate("/care/reservation")}>
          공식 AS 예약하기
        </AsButton>
      </Main>
    </PageWrapper>
  );
};

export default DiagnosisResultPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 2.4rem;
  overflow-y: auto;
`;

const Headline = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-black);
`;

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin: 1.6rem 0;
`;

const ProductText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-black);
`;

const StatusBadge = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  background: ${({ $color }) => $color};
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-white);
`;

const PreviewWrap = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 0.4rem;
  background: #f7f7f7;
`;

const Photo = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DimOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Hole = styled.circle`
  r: ${SPOTLIGHT_RADIUS};
`;

const DamagePoint = styled.span`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  z-index: 1;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const Marker = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  height: 3.7rem;
  transform: translate(-50%, calc(-100% - ${SPOTLIGHT_RADIUS}));
`;

const RetakeButton = styled.button`
  position: absolute;
  bottom: 2.4rem;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  background: rgba(253, 252, 249, 0.6);
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-black);
  white-space: nowrap;
`;

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2.4rem;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const InfoLabel = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-black);
`;

const SubSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin: 1.6rem 0;
`;

const WarnIcon = styled.img`
  flex-shrink: 0;
  width: 1.4rem;
  height: 1.4rem;
  margin-top: 0.2rem;
`;

const SubText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-placeholder-gray);
`;

const AsButton = styled(Button)`
  width: 100%;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
`;
