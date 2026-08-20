export const GUIDE_TYPE = {
  BASIC: "BASIC",
  POST_PURCHASE: "POST_PURCHASE",
  AFTER_CARE: "AFTER_CARE",
};

const DEFAULT_AS_CENTER_URL = "https://www.mcmworldwide.com";

export const splitGuideContent = (content) => {
  if (content == null) return [];
  const trimmed = String(content).trim();
  if (!trimmed) return [];

  const lines = trimmed
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s]*([-•*]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);

  return lines.length > 0 ? lines : [trimmed];
};

export const mapCareGuide = (apiGuide) => ({
  id: apiGuide.id,
  title: apiGuide.title || "",
  guideType: apiGuide.guide_type || GUIDE_TYPE.BASIC,
  material: apiGuide.material || "",
  category: apiGuide.category || "",
  items: splitGuideContent(apiGuide.content),
  season: apiGuide.season || "",
  sourceName: apiGuide.source_name || "",
  sourceUrl: apiGuide.source_url || "",
  image: apiGuide.image || null,
});

const byCreatedDesc = (a, b) => Number(b.id) - Number(a.id);

export const buildCareGuideView = (apiGuides = [], { material = "" } = {}) => {
  const guides = apiGuides.map(mapCareGuide).sort(byCreatedDesc);

  const dailyGuides = guides.filter(
    (guide) =>
      !guide.season &&
      (guide.guideType === GUIDE_TYPE.BASIC ||
        guide.guideType === GUIDE_TYPE.AFTER_CARE),
  );

  const checklist = guides
    .filter(
      (guide) => !guide.season && guide.guideType === GUIDE_TYPE.POST_PURCHASE,
    )
    .flatMap((guide) =>
      guide.items.length > 0 ? guide.items : guide.title ? [guide.title] : [],
    );

  const seasonalGuides = guides.filter((guide) => Boolean(guide.season));

  const asCenterUrl =
    guides.find((guide) => guide.sourceUrl)?.sourceUrl || DEFAULT_AS_CENTER_URL;

  return {
    material:
      material || guides.find((guide) => guide.material)?.material || "",
    dailyGuides,
    checklist,
    seasonalGuides,
    asCenterUrl,
    isEmpty:
      dailyGuides.length === 0 &&
      checklist.length === 0 &&
      seasonalGuides.length === 0,
  };
};
