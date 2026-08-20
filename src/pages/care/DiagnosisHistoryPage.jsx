import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import HistoryFilters from "@components/care/history/HistoryFilters";
import HistoryList from "@components/care/history/HistoryList";
import { deleteDiagnosis, getDiagnoses } from "@apis/diagnoses";
import { getMyProducts } from "@apis/products";
import { mapDiagnosisHistoryItem } from "@utils/diagnosisMappers";
import { mapProduct } from "@utils/productMappers";

const DiagnosisHistoryPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [product, setProduct] = useState("");
  const [year, setYear] = useState("");
  const [filterKey, setFilterKey] = useState("|");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const nextFilterKey = `${product}|${year}`;
  if (nextFilterKey !== filterKey) {
    setFilterKey(nextFilterKey);
    setIsLoading(true);
    setErrorMessage("");
  }

  useEffect(() => {
    let mounted = true;

    getMyProducts()
      .then((products) => {
        if (!mounted) return;
        setProductOptions([
          { value: "", label: "전체" },
          ...products.map(mapProduct).map((item) => ({
            value: String(item.id),
            label: item.name || `제품 ${item.id}`,
          })),
        ]);
      })
      .catch(() => {
        if (mounted) setProductOptions([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    getDiagnoses({
      product: product || undefined,
      year: year || undefined,
    })
      .then((diagnoses) => {
        if (!mounted) return;
        setItems(diagnoses.map(mapDiagnosisHistoryItem));
      })
      .catch(() => {
        if (!mounted) return;
        setItems([]);
        setErrorMessage("진단 이력을 불러오지 못했어요.");
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [product, year]);

  const handleEdit = (id) => {
    navigate(`/care?diagnosisId=${encodeURIComponent(id)}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDiagnosis(id);
      setItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch {
      setErrorMessage("진단 이력 삭제에 실패했어요.");
    }
  };

  const handleOpenResult = (id) => {
    navigate(`/care/result/${id}`);
  };

  return (
    <PageWrapper>
      <PageHeader title="진단 이력 보기" backTo="/care" />

      <Main>
        <Title>진단 이력</Title>
        <HistoryFilters
          product={product}
          year={year}
          productOptions={productOptions}
          onProductChange={setProduct}
          onYearChange={setYear}
        />
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {isLoading ? (
          <EmptyText>불러오는 중...</EmptyText>
        ) : (
          <HistoryList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onOpen={handleOpenResult}
          />
        )}
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

const ErrorText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-danger);
`;

const EmptyText = styled.p`
  margin: 4rem 0 0;
  font-size: 1.4rem;
  color: var(--color-gray);
  text-align: center;
`;
