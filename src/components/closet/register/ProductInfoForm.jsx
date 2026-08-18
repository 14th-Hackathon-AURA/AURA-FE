import styled from "styled-components";
import FormInput from "./FormInput";
import CategorySelect from "./CategorySelect";

const ProductInfoForm = ({ values, onChangeField, categoryOptions }) => (
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
      <FormInput
        label="구매일"
        value={values.purchaseDate}
        onChange={(event) => onChangeField("purchaseDate", event.target.value)}
      />
      <FormInput
        label="구매처"
        value={values.purchasePlace}
        onChange={(event) => onChangeField("purchasePlace", event.target.value)}
      />
      <FormInput
        label="메모 (선택)"
        value={values.memo}
        onChange={(event) => onChangeField("memo", event.target.value)}
      />
    </Fields>
  </Section>
);

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
