import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import CompleteOverlay from "@components/common/CompleteOverlay";
import ReservationForm from "@components/care/reservation/ReservationForm";

const COMPLETE_REDIRECT_DELAY = 2000;

const INITIAL_FORM = {
  product: "",
  consultType: "",
  symptom: "",
  visitDate: null,
  visitTime: "",
  contact: "",
  note: "",
};

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(location.state?.form ?? INITIAL_FORM);
  const [storeName] = useState(location.state?.storeName ?? "");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isSubmitted) return undefined;

    const timer = setTimeout(() => {
      navigate("/care");
    }, COMPLETE_REDIRECT_DELAY);

    return () => clearTimeout(timer);
  }, [isSubmitted, navigate]);

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSelectStore = () => {
    navigate("/care/reservation/stores", {
      state: { form, storeName },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <PageWrapper>
      <PageHeader title="매장 AS 예약" backTo="/care" />

      <Main>
        <ReservationForm
          values={form}
          storeName={storeName}
          onChangeField={updateField}
          onSelectStore={handleSelectStore}
          onSubmit={handleSubmit}
        />
      </Main>

      {isSubmitted && (
        <CompleteOverlay
          multiline
          message={`예약 요청이 완료되었습니다.
매장에서 검토 후 고객님의 연락처로
방문 일자를 안내드릴 예정입니다.`}
          onClose={() => navigate("/care")}
        />
      )}
    </PageWrapper>
  );
};

export default ReservationPage;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  min-height: 0;
  padding: 2.4rem;
  overflow-y: auto;
`;
