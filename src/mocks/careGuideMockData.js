export const DEFAULT_CARE_MATERIAL = "가죽";

export const MATERIAL_CARE_TIPS = {
  캔버스: [
    "오염은 자국이 남지 않도록 바로 닦아냅니다.",
    "거친 표면과의 마찰을 줄여 코팅 벗겨짐을 예방합니다.",
    "알코올이나 강한 세정제 사용은 피합니다.",
  ],
  스웨이드: [
    "물과 습기에 특히 약하므로 비 오는 날 사용을 피합니다.",
    "전용 브러시로 결 방향을 따라 관리합니다.",
    "얼룩은 문지르지 말고 전용 지우개나 브러시를 사용합니다.",
  ],
  패브릭: [
    "먼지가 쉽게 쌓이므로 부드러운 브러시로 주기적으로 관리합니다.",
    "오염은 오래 두지 말고 즉시 제거합니다.",
  ],
  가죽: [
    "직사광선과 고온을 피하고 통풍이 잘 되는 곳에 보관합니다.",
    "사용 후에는 마른 극세사 천으로 가볍게 먼지를 닦습니다.",
    "가죽이 젖었다면 드라이어나 햇빛 대신 자연 건조합니다.",
    "사용하지 않을 때는 충전재를 넣어 형태를 유지합니다.",
  ],
};

export const DAILY_CARE_HABITS = [
  "가방 안에 충전재를 넣어 형태를 유지합니다.",
  "손 소독제, 향수, 화장품이 가방에 직접 닿지 않도록 합니다.",
  "바닥에 직접 내려놓기보다 의자나 가방걸이를 이용합니다.",
  "한 달에 한 번 정도 상태를 확인하고 먼지를 제거합니다.",
];

export const STORAGE_CHECKLIST = [
  "보관 전 내용물 비우기",
  "방습제·보존백 함께 보관하기",
  "직사광선·고온 다습한 환경 피하기",
  "사용 전 먼지·이물질 확인하기",
  "사용 후 부드러운 천으로 가볍게 닦기",
];

export const SEASONAL_CARE_GUIDES = [
  {
    id: "spring-summer",
    title: "봄 · 여름",
    items: [
      "땀과 선크림이 손잡이에 묻지 않도록 관리합니다.",
      "비를 맞았다면 즉시 물기를 제거하고 자연 건조합니다.",
      "사용 후에는 습기를 날릴 수 있도록 잠시 꺼내 둡니다.",
    ],
  },
  {
    id: "autumn-winter",
    title: "가을 · 겨울",
    items: [
      "난방기와 떨어진 곳에 보관합니다.",
      "두꺼운 외투와의 마찰로 모서리 마모가 생기지 않도록 주의합니다.",
      "눈이 묻었다면 녹기 전에 부드러운 천으로 닦아줍니다.",
    ],
  },
  {
    id: "rainy-season",
    title: "장마 · 환절기 특별 관리",
    items: [
      "사용 후 내부까지 충분히 건조한 뒤 보관합니다.",
      "실리카겔 등 제습제를 함께 넣되 가죽에 직접 닿지 않게 합니다.",
      "옷장 안 보다는 통풍이 되는 장소에 보관합니다.",
      "곰팡이 냄새가 나거나 표면이 끈적해지면 즉시 관리합니다.",
      "계절이 바뀔 때는 전체 손상과 오염도를 점검합니다.",
    ],
  },
];

export const OFFICIAL_AS_CENTER_URL = "https://www.mcmworldwide.com";

export const getCareGuideByMaterial = (material) => {
  const resolvedMaterial = MATERIAL_CARE_TIPS[material]
    ? material
    : DEFAULT_CARE_MATERIAL;

  return {
    material: resolvedMaterial,
    materialTips: MATERIAL_CARE_TIPS[resolvedMaterial],
    habits: DAILY_CARE_HABITS,
    checklist: STORAGE_CHECKLIST,
    seasonal: SEASONAL_CARE_GUIDES,
    asCenterUrl: OFFICIAL_AS_CENTER_URL,
  };
};
