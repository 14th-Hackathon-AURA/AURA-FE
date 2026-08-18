import backpackImage from "@assets/images/closet/dummy-bag-1.png";
import hoboImage from "@assets/images/closet/dummy-bag-2.png";

export const CLOSET_CATEGORIES = ["전체", "가방", "신발", "의류", "액세서리"];

export const PRODUCT_REGISTER_CATEGORIES = [
  "토트백 & 쇼퍼백",
  "숄더백 & 크로스백",
  "백팩",
  "벨트백",
  "탑 핸들백",
  "미니백",
  "클러치 & 파우치",
  "트래블",
  "스트랩 & 액세서리",
];

export const MOCK_CLOSET_PRODUCTS = [
  {
    id: "closet-1",
    name: "Stark Backpack in Visetos",
    category: "가방",
    purchaseDate: "2025년 3월 12일",
    verified: true,
    image: backpackImage,
  },
  {
    id: "closet-2",
    name: "Aren Hobo in Visetos",
    category: "가방",
    purchaseDate: "2025년 3월 12일",
    verified: true,
    image: hoboImage,
  },
];
