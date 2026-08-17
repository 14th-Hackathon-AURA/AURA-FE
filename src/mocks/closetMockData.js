import backpackImage from "@assets/images/closet/dummy-bag-1.png";
import hoboImage from "@assets/images/closet/dummy-bag-2.png";

export const CLOSET_CATEGORIES = ["전체", "가방", "신발", "의류", "액세서리"];

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
