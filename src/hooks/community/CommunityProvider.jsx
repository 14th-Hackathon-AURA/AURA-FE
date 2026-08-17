import { useCallback, useMemo, useState } from "react";
import useMemberProfile from "@hooks/useMemberProfile";
import CommunityContext from "./CommunityContext";
import { createMockPosts } from "./communityMockData";

const CommunityProvider = ({ children }) => {
  const profile = useMemberProfile();
  const [posts, setPosts] = useState(createMockPosts);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLike = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likeCount: post.likeCount + (post.liked ? -1 : 1) }
          : post,
      ),
    );
  }, []);

  const addComment = useCallback(
    (postId, content) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                commentCount: post.commentCount + 1,
                comments: [
                  ...post.comments,
                  { id: `comment-${Date.now()}`, nickname: profile.nickname, content },
                ],
              }
            : post,
        ),
      );
    },
    [profile.nickname],
  );

  const addPost = useCallback(
    ({ title, content, images, taggedProduct }) => {
      const newPost = {
        id: `post-${Date.now()}`,
        author: { nickname: profile.nickname, grade: profile.membership.grade },
        itemName: taggedProduct?.name ?? "",
        timeLabel: "방금 전",
        createdLabel: "방금 전",
        title,
        content,
        images: images ?? [],
        taggedProduct: taggedProduct ?? null,
        likeCount: 0,
        liked: false,
        commentCount: 0,
        comments: [],
      };
      setPosts((prev) => [newPost, ...prev]);
      return newPost.id;
    },
    [profile.nickname, profile.membership.grade],
  );

  const getPostById = useCallback((postId) => posts.find((post) => post.id === postId), [posts]);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query),
    );
  }, [posts, searchQuery]);

  const value = useMemo(
    () => ({
      posts,
      filteredPosts,
      searchQuery,
      setSearchQuery,
      toggleLike,
      addComment,
      addPost,
      getPostById,
    }),
    [posts, filteredPosts, searchQuery, toggleLike, addComment, addPost, getPostById],
  );

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
};

export default CommunityProvider;
