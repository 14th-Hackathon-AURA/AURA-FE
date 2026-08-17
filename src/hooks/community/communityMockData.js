const GRADES = ["silver", "gold", "platinum", "diamond"];

export const MOCK_CLOSET_ITEMS = [
  { id: "closet-1", name: "디스코 모노그램 스카프", category: "스카프", registeredLabel: "2024년 등록" },
  { id: "closet-2", name: "디스코 모노그램 스카프", category: "스카프", registeredLabel: "2024년 등록" },
  { id: "closet-3", name: "디스코 모노그램 스카프", category: "스카프", registeredLabel: "2024년 등록" },
  { id: "closet-4", name: "디스코 모노그램 스카프", category: "스카프", registeredLabel: "2024년 등록" },
];

const createMockComments = () =>
  Array.from({ length: 4 }, (_, index) => ({
    id: `comment-${index + 1}`,
    nickname: "닉네임",
    content: "너무 예뻐요! 어쩌구 저쩌구",
  }));

export const createMockPosts = () =>
  GRADES.map((grade, index) => ({
    id: `post-${index + 1}`,
    author: { nickname: "velvet_jiyeon", grade },
    itemName: "디스코 모노그램 스카프",
    timeLabel: "2시간 전",
    createdLabel: "8월 14일 오후 3:22",
    title: "첫 명품 관리 후기예요! 방수 스프레이 직접 써봤어요",
    content: "",
    images: [null, null, null],
    taggedProduct: { id: "closet-1", name: "디스코 모노그램 스카프", category: "스카프", registeredLabel: "2024년 등록" },
    likeCount: 48,
    liked: false,
    commentCount: 12,
    comments: createMockComments(),
  }));
