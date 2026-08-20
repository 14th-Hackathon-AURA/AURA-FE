const toTag = (value) => {
  const text = String(value || "").trim();
  if (!text) return "";
  return text.startsWith("#") ? text : `#${text}`;
};

const buildTags = (product = {}) => {
  const candidates = [
    product.color,
    product.style,
    product.usage,
    product.category,
  ];
  const tags = [];

  candidates.forEach((value) => {
    const tag = toTag(value);
    if (tag && !tags.includes(tag)) tags.push(tag);
  });

  return tags;
};

export const formatVisitNeedsSummary = (summary, nickname) => {
  if (!summary) return "";
  return String(summary).replaceAll("{name}", nickname || "00");
};

export const mapVisitCard = (card) => {
  const product =
    card?.product && typeof card.product === "object" ? card.product : {};

  return {
    id: card.id,
    styleCode: card.style_code || product.style_code || "",
    name: product.name || "",
    price: product.price || "",
    image: product.image_url || "",
    tags: buildTags(product),
    needsSummary: card.consultation_summary || "",
    createdAt: card.created_at || "",
    updatedAt: card.updated_at || "",
    product,
  };
};
