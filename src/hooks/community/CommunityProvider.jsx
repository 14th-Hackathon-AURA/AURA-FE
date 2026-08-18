import { useCallback, useEffect, useMemo, useState } from "react";
import { createComment, createPost, getMyPostLikes, getPosts, likePost, unlikePost } from "@apis/community";
import CommunityContext from "./CommunityContext";
import { mapComment, mapPost } from "./communityMappers";

const CommunityProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [likeIdByPostId, setLikeIdByPostId] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;

    Promise.all([getPosts(), getMyPostLikes()])
      .then(([postsData, likesData]) => {
        if (!mounted) return;
        setPosts(postsData.map(mapPost));
        const likeMap = {};
        likesData.forEach((like) => {
          likeMap[like.post] = like.id;
        });
        setLikeIdByPostId(likeMap);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const toggleLike = useCallback(
    async (postId) => {
      const existingLikeId = likeIdByPostId[postId];

      if (existingLikeId) {
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId ? { ...post, liked: false, likeCount: post.likeCount - 1 } : post,
          ),
        );
        setLikeIdByPostId((prev) => {
          const next = { ...prev };
          delete next[postId];
          return next;
        });
        try {
          await unlikePost(existingLikeId);
        } catch {
          setPosts((prev) =>
            prev.map((post) =>
              post.id === postId ? { ...post, liked: true, likeCount: post.likeCount + 1 } : post,
            ),
          );
          setLikeIdByPostId((prev) => ({ ...prev, [postId]: existingLikeId }));
        }
        return;
      }

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, liked: true, likeCount: post.likeCount + 1 } : post,
        ),
      );
      try {
        const like = await likePost(postId);
        setLikeIdByPostId((prev) => ({ ...prev, [postId]: like.id }));
      } catch {
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId ? { ...post, liked: false, likeCount: post.likeCount - 1 } : post,
          ),
        );
      }
    },
    [likeIdByPostId],
  );

  const addComment = useCallback(async (postId, content) => {
    const comment = await createComment(postId, content);
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentCount: post.commentCount + 1,
              comments: [...post.comments, mapComment(comment)],
            }
          : post,
      ),
    );
  }, []);

  const addPost = useCallback(async ({ title, content, imageFile, taggedProductId }) => {
    const created = await createPost({
      title,
      body: content,
      image: imageFile,
      taggedProductIds: taggedProductId ? [taggedProductId] : [],
    });
    const newPost = mapPost(created);
    setPosts((prev) => [newPost, ...prev]);
    return newPost.id;
  }, []);

  const getPostById = useCallback(
    (postId) => posts.find((post) => String(post.id) === String(postId)),
    [posts],
  );

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
      isLoading,
    }),
    [posts, filteredPosts, searchQuery, toggleLike, addComment, addPost, getPostById, isLoading],
  );

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
};

export default CommunityProvider;
