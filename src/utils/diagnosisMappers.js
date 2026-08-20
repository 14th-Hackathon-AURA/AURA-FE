export const DIAGNOSIS_STATUS = {
  PENDING: "PENDING",
  DONE: "DONE",
  FAILED: "FAILED",
};

export const CONDITION_LEVEL = {
  SAFE: "SAFE",
  CAUTION: "CAUTION",
  DANGER: "DANGER",
};

export const DIAGNOSIS_YEAR_OPTIONS = [
  { value: "", label: "전체" },
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
];

const CONDITION_UI = {
  SAFE: { key: "safe", label: "안전", color: "var(--color-safe)" },
  CAUTION: { key: "warn", label: "주의", color: "var(--color-warn)" },
  DANGER: { key: "danger", label: "위험", color: "var(--color-danger)" },
};

const DEFAULT_NOTICE =
  "이 진단은 참고 목적으로만 제공됩니다. 내부 손상이나 정밀 점검이 필요한 경우, 공식 수선 센터 방문을 권장합니다.";

export const getConditionUi = (conditionLevel) =>
  CONDITION_UI[conditionLevel] || CONDITION_UI.CAUTION;

const resolveProductId = (diagnosis) => {
  if (diagnosis?.product == null) return null;
  if (typeof diagnosis.product === "object") {
    return diagnosis.product.id ?? null;
  }
  return diagnosis.product;
};

const resolveProductName = (diagnosis) => {
  if (typeof diagnosis?.product === "object" && diagnosis.product?.name) {
    return diagnosis.product.name;
  }
  return (
    diagnosis?.product_name ||
    diagnosis?.productName ||
    diagnosis?.product_detail?.name ||
    ""
  );
};

const formatDiagnosisDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const resolveYear = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return String(date.getFullYear());
};

const resolvePoints = (diagnosis) => {
  const points =
    diagnosis?.damage_location?.points ||
    diagnosis?.damage_location ||
    diagnosis?.points ||
    [];

  if (!Array.isArray(points)) return [];

  return points.slice(0, 2).map((point, index) => {
    const x = Number(point?.x_percent ?? point?.x ?? 0);
    const y = Number(point?.y_percent ?? point?.y ?? 0);

    return {
      id: point?.label || `marker-${index + 1}`,
      label: point?.label || "",
      top: `${Number.isFinite(y) ? y : 0}%`,
      left: `${Number.isFinite(x) ? x : 0}%`,
    };
  });
};

const resolveDamageStatus = (diagnosis) => {
  const type = diagnosis?.damage_type?.trim() || "";
  const description = diagnosis?.damage_description?.trim() || "";
  if (type && description && type !== description) {
    return `${type}, ${description}`;
  }
  return description || type || "";
};

const resolveDamageCount = (diagnosis) => {
  const count = diagnosis?.result?.damage_count ?? diagnosis?.damage_count;
  if (typeof count === "number" && Number.isFinite(count)) return count;
  return resolvePoints(diagnosis).length;
};

export const mapDiagnosisHistoryItem = (diagnosis) => {
  const conditionLevel = diagnosis?.condition_level || CONDITION_LEVEL.CAUTION;
  const conditionUi = getConditionUi(conditionLevel);

  return {
    id: diagnosis.id,
    image: diagnosis.image || null,
    date: formatDiagnosisDate(diagnosis.created_at),
    year: resolveYear(diagnosis.created_at),
    productId: resolveProductId(diagnosis),
    productName: resolveProductName(diagnosis),
    conditionLevel,
    status: conditionUi.key,
    statusLabel: conditionUi.label,
    statusColor: conditionUi.color,
    analysisStatus: String(diagnosis?.status || "").toUpperCase(),
  };
};

export const mapDiagnosisResult = (diagnosis) => {
  const conditionLevel = diagnosis?.condition_level || CONDITION_LEVEL.CAUTION;
  const conditionUi = getConditionUi(conditionLevel);
  const notice =
    diagnosis?.result?.notice ||
    (diagnosis?.result?.is_reference_only ? DEFAULT_NOTICE : DEFAULT_NOTICE);

  return {
    id: diagnosis.id,
    productId: resolveProductId(diagnosis),
    productName: resolveProductName(diagnosis) || "제품",
    image: diagnosis.image || null,
    conditionLevel,
    status: conditionUi.key,
    statusLabel: conditionUi.label,
    statusColor: conditionUi.color,
    damageCount: resolveDamageCount(diagnosis),
    markers: resolvePoints(diagnosis),
    damageStatus: resolveDamageStatus(diagnosis),
    careSuggestion: diagnosis?.care_suggestion || "",
    notice,
    analysisStatus: String(diagnosis?.status || "").toUpperCase(),
    isReferenceOnly: Boolean(diagnosis?.result?.is_reference_only ?? true),
  };
};

export const formatDiagnosisApiError = (data) => {
  if (!data) return "";
  if (typeof data === "string") return data;
  if (data.detail) return String(data.detail);

  if (typeof data === "object") {
    const FIELD_LABELS = {
      product: "제품",
      image: "사진",
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
