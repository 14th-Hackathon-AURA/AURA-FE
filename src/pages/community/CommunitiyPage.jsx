import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "@components/common/BottomNavBar";
import Button from "@components/common/Button";
import SearchBar from "@components/community/SearchBar";
import PostCard from "@components/community/PostCard";
import useCommunityStore from "@hooks/community/useCommunityStore";

const CommunityPage = () => {
  const { filteredPosts, searchQuery, setSearchQuery, isLoading } = useCommunityStore();

  return (
    <PageWrapper>
      <Header>
        <HeaderTitle>커뮤니티</HeaderTitle>
      </Header>

      <Main>
        <Body>
          <IntroRow>
            <IntroText>
              다양한 이용자들의 경험을
              <br />
              공유할 수 있어요
            </IntroText>
            <WriteButton as={Link} to="/community/write">
              게시물 작성
            </WriteButton>
          </IntroRow>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          <SectionTitle>최신 게시물</SectionTitle>
        </Body>

        <PostList>
          {isLoading ? (
            <EmptyState>불러오는 중...</EmptyState>
          ) : filteredPosts.length === 0 ? (
            <EmptyState>게시물이 없어요</EmptyState>
          ) : (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </PostList>
      </Main>

      <BottomNavBar />
    </PageWrapper>
  );
};

export default CommunityPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
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
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem 2.4rem 0.8rem;
`;

const IntroRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.2rem;
  width: 100%;
`;

const IntroText = styled.p`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-black);
`;

const WriteButton = styled(Button)`
  flex-shrink: 0;
  width: 9.2rem;
  height: 3.3rem;
  padding: 1rem 1rem;
  border-radius: 0.2rem;
  font-size: 1.2rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-black);
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.p`
  margin: 0;
  padding: 4rem 2.4rem;
  text-align: center;
  font-size: 1.4rem;
  color: var(--color-mediumgray);
`;
