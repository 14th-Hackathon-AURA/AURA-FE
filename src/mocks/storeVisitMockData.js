import dummyBag1 from "@assets/images/closet/dummy-bag-1.png";
import dummyBag2 from "@assets/images/closet/dummy-bag-2.png";

const DEFAULT_NEEDS_SUMMARY =
  "{name}님이 원한다고 언급하신 브라운 색상의 스카프입니다. 또한 사이즈에 구애받지 않길 바라시는 {name}님에게 적합하도록 프리사이즈로 제작되었으며, 착용 예정인 '블랙 슈트'에도 잘 어울리는 색상 구성입니다. 언급하신 예산 '50만원' 안에서 구매 가능합니다.";

export const MOCK_STORE_VISIT_CARDS = [
  {
    id: 1,
    name: "디스코 모노그램 스카프",
    price: "₩ 430,000",
    image: dummyBag1,
    tags: ["#예산범위", "#선호색상", "#사용상황"],
    needsSummary: DEFAULT_NEEDS_SUMMARY,
  },
  {
    id: 2,
    name: "디스코 모노그램 스카프",
    price: "₩ 430,000",
    image: dummyBag2,
    tags: ["#예산범위", "#선호색상", "#사용상황"],
    needsSummary: DEFAULT_NEEDS_SUMMARY,
  },
  {
    id: 3,
    name: "디스코 모노그램 스카프",
    price: "₩ 430,000",
    image: dummyBag1,
    tags: ["#예산범위", "#선호색상", "#사용상황"],
    needsSummary: DEFAULT_NEEDS_SUMMARY,
  },
  {
    id: 4,
    name: "디스코 모노그램 스카프",
    price: "₩ 430,000",
    image: dummyBag2,
    tags: ["#예산범위", "#선호색상", "#사용상황"],
    needsSummary: DEFAULT_NEEDS_SUMMARY,
  },
  {
    id: 5,
    name: "디스코 모노그램 스카프",
    price: "₩ 430,000",
    image: dummyBag1,
    tags: ["#예산범위", "#선호색상", "#사용상황"],
    needsSummary: DEFAULT_NEEDS_SUMMARY,
  },
];

export const getStoreVisitCardById = (id) =>
  MOCK_STORE_VISIT_CARDS.find((card) => String(card.id) === String(id));

export const formatVisitNeedsSummary = (template, nickname) =>
  template.replaceAll("{name}", nickname || "00");
