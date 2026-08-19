import dummyBag1 from "@assets/images/care/dummy-bag-1.png";
import dummyBag2 from "@assets/images/care/dummy-bag-2.png";
import dummyBag3 from "@assets/images/care/dummy-bag-3.png";

export const DIAGNOSIS_PRODUCT_OPTIONS = [
  "토트백 & 쇼퍼백",
  "숄더백 & 크로스백",
  "백팩",
  "벨트백",
  "탑 핸들백",
  "미니백",
  "클러치 & 파우치",
  "스트랩 & 액세서리",
];

export const DIAGNOSIS_YEAR_OPTIONS = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
];

export const MOCK_DIAGNOSIS_HISTORY = [
  {
    id: "diagnosis-1",
    image: dummyBag1,
    date: "2026년 3월 12일",
    year: "2026",
    category: "백팩",
    status: "warn",
  },
  {
    id: "diagnosis-2",
    image: dummyBag2,
    date: "2025년 3월 12일",
    year: "2025",
    category: "토트백 & 쇼퍼백",
    status: "safe",
  },
  {
    id: "diagnosis-3",
    image: dummyBag3,
    date: "2024년 3월 12일",
    year: "2024",
    category: "숄더백 & 크로스백",
    status: "danger",
  },
];
