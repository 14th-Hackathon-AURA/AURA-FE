import {
  CLOSET_CATEGORIES,
  PRODUCT_REGISTER_CATEGORIES,
} from "@mocks/closetMockData";

const BAG_CATEGORY_SET = new Set(PRODUCT_REGISTER_CATEGORIES);
const TOP_LEVEL_CATEGORIES = new Set(
  CLOSET_CATEGORIES.filter((category) => category !== "전체"),
);

const formatPurchaseDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const formatDiagnosisDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}.${month}.${day}`;
};

const getLatestDiagnosis = (history) => {
  if (!Array.isArray(history) || history.length === 0) return null;
  return [...history].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )[0];
};

const resolveFilterCategory = (category) => {
  if (!category) return "";
  if (TOP_LEVEL_CATEGORIES.has(category)) return category;
  if (BAG_CATEGORY_SET.has(category)) return "가방";
  return category;
};

export const mapProduct = (apiProduct) => {
  const latestDiagnosis = getLatestDiagnosis(apiProduct.diagnosis_history);
  const rawCategory = apiProduct.category || "";

  return {
    id: apiProduct.id,
    brand: apiProduct.brand || "",
    name: apiProduct.name || "",
    category: resolveFilterCategory(rawCategory),
    subCategory: rawCategory,
    price: apiProduct.purchase_price ?? 0,
    purchaseDate: formatPurchaseDate(apiProduct.purchased_at),
    purchasePlace: apiProduct.purchase_place || "",
    serialNumber: apiProduct.passport_code ? "등록됨" : "-",
    passportCode: apiProduct.passport_code || "",
    diagnosisDate: formatDiagnosisDate(latestDiagnosis?.created_at),
    conditionLevel: latestDiagnosis?.condition_level || null,
    verified: Boolean(apiProduct.passport_code),
    material:
      apiProduct.metadata?.material || apiProduct.metadata?.소재 || "가죽",
    image: apiProduct.image || null,
    memo: apiProduct.memo || "",
    purchaseChannel: apiProduct.purchase_channel || "",
    diagnosisHistory: apiProduct.diagnosis_history || [],
    serviceHistory: apiProduct.service_history || [],
  };
};

// API DateField용 YYYY-MM-DD 변환 / 파싱 실패 시 빈 문자열
export const toApiDate = (value) => {
  if (value == null || value === "") return "";

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const trimmed = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) return trimmed.slice(0, 10);

  const dotted = trimmed.match(/^(\d{4})[./](\d{1,2})[./](\d{1,2})$/);
  if (dotted) {
    return `${dotted[1]}-${dotted[2].padStart(2, "0")}-${dotted[3].padStart(2, "0")}`;
  }

  const korean = trimmed.match(
    /(\d{4})\s*년\s*(\d{1,2})\s*월\s*(\d{1,2})\s*일/,
  );
  if (korean) {
    return `${korean[1]}-${korean[2].padStart(2, "0")}-${korean[3].padStart(2, "0")}`;
  }

  const date = new Date(trimmed);
  if (!Number.isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return "";
};

/** purchase_channel은 ONLINE | OFFLINE 만 허용. */
export const toApiPurchaseChannel = (value) => {
  if (value == null || value === "") return "";
  const raw = String(value).trim();
  const upper = raw.toUpperCase();
  if (upper === "ONLINE" || upper === "OFFLINE") return upper;
  if (/온라인|online/i.test(raw)) return "ONLINE";
  if (/오프라인|offline|매장/i.test(raw)) return "OFFLINE";
  return "";
};

const toApiPurchasePrice = (value) => {
  if (value === "" || value == null) return null;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  const cleaned = String(value).replace(/[^\d.-]/g, "");
  if (!cleaned) return null;
  const price = Number(cleaned);
  return Number.isNaN(price) ? null : price;
};

const toFormDate = (value) => {
  const apiDate = toApiDate(value);
  if (!apiDate) return null;
  const [year, month, day] = apiDate.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const mapExtractDocumentToForm = (response = {}) => ({
  brand: response.brand || "",
  productName: response.name || "",
  category: response.category || "",
  purchaseDate: toFormDate(response.purchased_at),
  purchasePlace: response.purchase_place || "",
  memo: "",
  purchasePrice:
    response.purchase_price === null || response.purchase_price === undefined
      ? ""
      : String(response.purchase_price).replace(/[^\d.-]/g, ""),
  purchaseChannel: toApiPurchaseChannel(response.purchase_channel),
});

export const buildProductPayload = (form) => {
  const payload = {};

  if (form.productName?.trim()) payload.name = form.productName.trim();
  if (form.brand?.trim()) payload.brand = form.brand.trim();
  if (form.category?.trim()) payload.category = form.category.trim();

  const purchasedAt = toApiDate(form.purchaseDate);
  if (purchasedAt) payload.purchased_at = purchasedAt;

  if (form.purchasePlace?.trim()) {
    payload.purchase_place = form.purchasePlace.trim();
  }
  if (form.memo?.trim()) payload.memo = form.memo.trim();

  const purchasePrice = toApiPurchasePrice(form.purchasePrice);
  if (purchasePrice != null) payload.purchase_price = purchasePrice;

  const purchaseChannel = toApiPurchaseChannel(form.purchaseChannel);
  if (purchaseChannel) payload.purchase_channel = purchaseChannel;

  return payload;
};

export const formatApiError = (data) => {
  if (!data) return "";
  if (typeof data === "string") return data;
  if (data.detail) return String(data.detail);

  if (typeof data === "object") {
    const FIELD_LABELS = {
      name: "제품명",
      brand: "브랜드",
      category: "카테고리",
      purchased_at: "구매일",
      purchase_place: "구매처",
      purchase_price: "구매가",
      purchase_channel: "구매 채널",
      non_field_errors: "요청",
    };

    return Object.entries(data)
      .map(([key, value]) => {
        const label = FIELD_LABELS[key] || key;
        const message = Array.isArray(value) ? value.join(", ") : String(value);
        return `${label}: ${message}`;
      })
      .join(" ");
  }

  return "";
};
