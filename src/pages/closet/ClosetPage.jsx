import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "@components/common/BottomNavBar";
import Button from "@components/common/Button";
import ClosetSearchBar from "@components/closet/ClosetSearchBar";
import CategoryFilter from "@components/closet/CategoryFilter";
import ClosetItemList from "@components/closet/ClosetItemList";
import ChatbotButton from "@components/closet/ChatbotButton";
import { CLOSET_CATEGORIES } from "@mocks/closetMockData";
import { mapProduct } from "@utils/productMappers";
import { deleteProduct, getMyProducts } from "@apis/products";

const ClosetPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    getMyProducts()
      .then((products) => {
        if (mounted) setItems(products.map(mapProduct));
      })
      .catch(() => {
        if (!mounted) return;
        setItems([]);
        setErrorMessage("제품 목록을 불러오지 못했어요.");
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!menuOpenId) return undefined;

    const closeMenu = () => setMenuOpenId(null);
    document.addEventListener("pointerdown", closeMenu);
    return () => document.removeEventListener("pointerdown", closeMenu);
  }, [menuOpenId]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = category === "전체" || item.category === category;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.subCategory.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [items, searchQuery, category]);

  const handleToggleMenu = (id) => {
    setMenuOpenId((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch {
      setErrorMessage("제품 삭제에 실패했어요.");
    } finally {
      setMenuOpenId(null);
    }
  };

  const handleEdit = (id) => {
    setMenuOpenId(null);
    navigate(`/closet/${id}`);
  };

  return (
    <PageWrapper>
      <Header>
        <HeaderTitle>디지털 클로젯</HeaderTitle>
      </Header>

      <Main>
        <Toolbar>
          <TitleRow>
            <Title>내 클로젯</Title>
            <RegisterButton
              type="button"
              onClick={() => navigate("/closet/register")}
            >
              새 제품 등록하기
            </RegisterButton>
          </TitleRow>

          <ClosetSearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            categories={CLOSET_CATEGORIES}
            selected={category}
            onSelect={setCategory}
          />
        </Toolbar>

        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        {isLoading ? (
          <EmptyText>불러오는 중...</EmptyText>
        ) : filteredItems.length > 0 ? (
          <ClosetItemList
            items={filteredItems}
            menuOpenId={menuOpenId}
            onToggleMenu={handleToggleMenu}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <EmptyText>상품이 없습니다.</EmptyText>
        )}
      </Main>

      <ChatbotButton />
      <BottomNavBar />
    </PageWrapper>
  );
};

export default ClosetPage;

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
  gap: 1.6rem;
  min-height: 0;
  padding: 2.4rem 2.4rem 2rem;
  overflow-y: auto;
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-black);
`;

const RegisterButton = styled(Button)`
  flex-shrink: 0;
  width: auto;
  height: 3.3rem;
  padding: 0.8rem 1.4rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
`;

const EmptyText = styled.p`
  margin: 4rem 0 0;
  font-size: 1.4rem;
  color: var(--color-gray);
  text-align: center;
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-primary);
  text-align: center;
`;
