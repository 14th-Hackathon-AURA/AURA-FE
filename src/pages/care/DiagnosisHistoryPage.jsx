import { useMemo, useState } from "react";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import HistoryFilters from "@components/care/history/HistoryFilters";
import HistoryList from "@components/care/history/HistoryList";
import { MOCK_DIAGNOSIS_HISTORY } from "@mocks/diagnosisHistoryMockData";

const DiagnosisHistoryPage = () => {
  const [items, setItems] = useState(MOCK_DIAGNOSIS_HISTORY);
  const [product, setProduct] = useState("");
  const [year, setYear] = useState("");

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const matchesProduct = !product || item.category === product;
        const matchesYear = !year || item.year === year;
        return matchesProduct && matchesYear;
      }),
    [items, product, year],
  );

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PageWrapper>
      <PageHeader title="진단 이력 보기" backTo="/care" />

      <Main>
        <Title>진단 이력</Title>
        <HistoryFilters
          product={product}
          year={year}
          onProductChange={setProduct}
          onYearChange={setYear}
        />
        <HistoryList items={filteredItems} onDelete={handleDelete} />
      </Main>
    </PageWrapper>
  );
};

export default DiagnosisHistoryPage;

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
  gap: 1.6rem;
  min-height: 0;
  padding: 2.4rem;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;
