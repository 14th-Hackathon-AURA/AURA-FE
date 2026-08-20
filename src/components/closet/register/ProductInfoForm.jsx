import { useState } from "react";
import styled from "styled-components";
import ReservationDateField from "@components/care/reservation/ReservationDateField";
import FormInput from "./FormInput";
import CategorySelect from "./CategorySelect";

const ProductInfoForm = ({ values, onChangeField, categoryOptions }) => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [viewDate, setViewDate] = useState(
    () => values.purchaseDate || new Date(),
  );
  const [syncedPurchaseDate, setSyncedPurchaseDate] = useState(
    values.purchaseDate,
  );

  if (values.purchaseDate !== syncedPurchaseDate) {
    setSyncedPurchaseDate(values.purchaseDate);
    if (values.purchaseDate instanceof Date) {
      setViewDate(values.purchaseDate);
    }
  }

  return (
    <Section>
      <Title>기본 정보</Title>

      <Fields>
        <FormInput
          label="브랜드"
          value={values.brand}
          onChange={(event) => onChangeField("brand", event.target.value)}
        />
        <FormInput
          label="제품명"
          value={values.productName}
          onChange={(event) => onChangeField("productName", event.target.value)}
        />
        <CategorySelect
          label="카테고리"
          placeholder="Select..."
          options={categoryOptions}
          value={values.category}
          onChange={(value) => onChangeField("category", value)}
        />
        <ReservationDateField
          label="구매일"
          placeholder="Select..."
          value={values.purchaseDate}
          viewDate={viewDate}
          isOpen={isDateOpen}
          onToggle={setIsDateOpen}
          onChange={(date) => {
            onChangeField("purchaseDate", date);
            setViewDate(date);
          }}
          onViewDateChange={setViewDate}
        />
        <FormInput
          label="구매처"
          value={values.purchasePlace}
          onChange={(event) =>
            onChangeField("purchasePlace", event.target.value)
          }
        />
        <FormInput
          label="메모 (선택)"
          value={values.memo}
          onChange={(event) => onChangeField("memo", event.target.value)}
        />
      </Fields>
    </Section>
  );
};

export default ProductInfoForm;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
