import { useState } from "react";
import styled from "styled-components";
import Button from "@components/common/Button";
import ReservationSelect from "./ReservationSelect";
import ReservationDateField from "./ReservationDateField";
import ReservationField from "./ReservationField";
import warnIcon from "@assets/icons/care/warn.svg";
import {
  RESERVATION_CONSULT_OPTIONS,
  RESERVATION_PRODUCT_OPTIONS,
} from "@mocks/reservationMockData";

const ReservationForm = ({
  values,
  storeName,
  onChangeField,
  onSelectStore,
  onSubmit,
}) => {
  const [openField, setOpenField] = useState(null);
  const [viewDate, setViewDate] = useState(values.visitDate || new Date());

  const toggleField = (field) => (nextOpen) => {
    setOpenField(nextOpen ? field : null);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Title>예약 정보 입력</Title>

      {storeName ? (
        <SelectedStore type="button" onClick={onSelectStore}>
          예약 매장: {storeName}
        </SelectedStore>
      ) : (
        <StoreButton type="button" onClick={onSelectStore}>
          예약 매장 선택하기
        </StoreButton>
      )}

      <ReservationSelect
        label="제품 선택"
        value={values.product}
        options={RESERVATION_PRODUCT_OPTIONS}
        isOpen={openField === "product"}
        onToggle={toggleField("product")}
        onChange={(value) => onChangeField("product", value)}
      />

      <ReservationSelect
        label="상담 유형"
        value={values.consultType}
        options={RESERVATION_CONSULT_OPTIONS}
        isOpen={openField === "consultType"}
        onToggle={toggleField("consultType")}
        onChange={(value) => onChangeField("consultType", value)}
      />

      <ReservationField
        label="증상 추가 (선택)"
        as="textarea"
        value={values.symptom}
        onChange={(event) => onChangeField("symptom", event.target.value)}
      />

      <ReservationDateField
        label="희망 방문 일정"
        value={values.visitDate}
        viewDate={viewDate}
        isOpen={openField === "visitDate"}
        onToggle={toggleField("visitDate")}
        onChange={(value) => onChangeField("visitDate", value)}
        onViewDateChange={setViewDate}
      />

      <ReservationField
        label="희망 방문 시간"
        value={values.visitTime}
        onChange={(event) => onChangeField("visitTime", event.target.value)}
      />

      <ReservationField
        label="연락처 (전화번호)"
        type="tel"
        value={values.contact}
        onChange={(event) => onChangeField("contact", event.target.value)}
      />

      <ReservationField
        label="요청 사항 (선택)"
        as="textarea"
        value={values.note}
        onChange={(event) => onChangeField("note", event.target.value)}
      />

      <Notice>
        <WarnIcon src={warnIcon} alt="" />
        <NoticeText>
          접수 확정 및 비용 산정은 공식 채널에서 이루어집니다. AI 답변은
          참고용이며 법적 책임 판단을 보장하지 않습니다.
        </NoticeText>
      </Notice>

      <SubmitButton type="submit">예약 요청하기</SubmitButton>
    </Form>
  );
};

export default ReservationForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const StoreButton = styled(Button)`
  align-self: flex-start;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
`;

const SelectedStore = styled.button`
  align-self: flex-start;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  border: 1px solid var(--color-primary);
  background: var(--color-white);
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-black);
`;

const Notice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
`;

const WarnIcon = styled.img`
  flex-shrink: 0;
  width: 1.4rem;
  height: 1.4rem;
  margin-top: 0.2rem;
`;

const NoticeText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-placeholder-gray);
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 1.2rem 2.4rem;
  border-radius: 0.2rem;
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
`;
