export const parseVisitDate = (value) => {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const buildPurpose = ({ consultType, symptom }) => {
  const purpose = [consultType, symptom].filter(Boolean).join(" / ").trim();
  return purpose.slice(0, 100);
};

export const buildServiceSymptom = ({ consultType, symptom, purpose }) => {
  const text = [consultType, symptom].filter(Boolean).join(" / ").trim();
  return text || purpose || "AS 상담 요청";
};

export const mapAvailabilitySlots = (data) => {
  const slots = Array.isArray(data?.slots) ? data.slots : [];

  return slots
    .filter((slot) => slot?.available)
    .map((slot) => ({
      value: slot.visit_at,
      label: slot.time,
    }));
};

export const formatReservationApiError = (data) => {
  if (!data) return "";
  if (typeof data === "string") return data;
  if (data.detail) return String(data.detail);

  if (typeof data === "object") {
    const FIELD_LABELS = {
      store: "매장",
      product: "제품",
      diagnosis: "진단",
      visit_at: "방문 일정",
      purpose: "상담 유형",
      contact_name: "이름",
      contact_phone: "연락처",
      request_note: "요청 사항",
      reservation: "방문 예약",
      symptom: "증상",
      non_field_errors: "요청",
      location: "위치",
      date: "날짜",
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
