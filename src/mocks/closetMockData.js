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
    brand: "MCM",
    name: "Stark Backpack in Disco Visetos",
    category: "가방",
    subCategory: "백팩",
    price: 2150000,
    purchaseDate: "2025년 3월 12일",
    purchasePlace: "MCM 롯데백화점 본점",
    serialNumber: "등록됨",
    diagnosisDate: "2026.07.22",
    verified: true,
    material: "가죽",
    image: backpackImage,
  },
  {
    id: "closet-2",
    brand: "MCM",
    name: "Aren Hobo in Visetos",
    category: "가방",
    subCategory: "숄더백 & 크로스백",
    price: 1890000,
    purchaseDate: "2025년 3월 12일",
    purchasePlace: "MCM 롯데백화점 본점",
    serialNumber: "등록됨",
    diagnosisDate: "2026.07.22",
    verified: true,
    material: "캔버스",
    image: hoboImage,
  },
];

export const getClosetProductById = (id) =>
  MOCK_CLOSET_PRODUCTS.find((item) => item.id === id);
