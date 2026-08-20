import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "@components/common/BottomNavBar";
import CompleteOverlay from "@components/common/CompleteOverlay";
import DiagnosisUpload from "@components/care/DiagnosisUpload";
import DiagnosisInstructions from "@components/care/DiagnosisInstructions";

const DIAGNOSIS_DURATION = 2000;

const CarePage = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isDiagnosing) return undefined;

    const timer = setTimeout(() => {
      navigate("/care/result");
    }, DIAGNOSIS_DURATION);
    return () => clearTimeout(timer);
  }, [isDiagnosing, navigate]);

  const handleImageChange = useCallback((file) => {
    if (!file) return;

    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);

  const handleStartDiagnosis = () => {
    if (!previewUrl || isDiagnosing) return;
    setIsDiagnosing(true);
  };

  return (
    <PageWrapper>
      <Header>
        <HeaderTitle>AI 케어 진단</HeaderTitle>
      </Header>

      <Main>
        <DiagnosisUpload
          previewUrl={previewUrl}
          isDiagnosing={isDiagnosing}
          onImageChange={handleImageChange}
          onStartDiagnosis={handleStartDiagnosis}
        />
        <DiagnosisInstructions />
      </Main>

      <BottomNavBar />

      {isDiagnosing && (
        <CompleteOverlay message="AI가 제품을 꼼꼼히 진단 중입니다..." />
      )}
    </PageWrapper>
  );
};

export default CarePage;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: var(--color-white);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2.4rem;
  background: var(--color-primary);
  box-shadow: 0 0.1rem 0.4rem 0 rgba(0, 0, 0, 0.08);
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  min-height: 0;
  padding: 2.4rem 2.4rem 2rem;
  overflow-y: auto;
`;
