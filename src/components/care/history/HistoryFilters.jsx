import styled from "styled-components";
import CategorySelect from "@components/closet/register/CategorySelect";
import {
  DIAGNOSIS_PRODUCT_OPTIONS,
  DIAGNOSIS_YEAR_OPTIONS,
} from "@mocks/diagnosisHistoryMockData";

const HistoryFilters = ({ product, year, onProductChange, onYearChange }) => (
  <Filters>
    <CategorySelect
      label="제품 선택"
      placeholder="Select..."
      options={DIAGNOSIS_PRODUCT_OPTIONS}
      value={product}
      onChange={onProductChange}
    />
    <CategorySelect
      label="진단 날짜"
      placeholder="Select..."
      options={DIAGNOSIS_YEAR_OPTIONS}
      value={year}
      onChange={onYearChange}
    />
  </Filters>
);

export default HistoryFilters;

const Filters = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  align-items: start;
`;
