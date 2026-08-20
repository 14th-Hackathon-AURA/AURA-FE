const DEFAULT_COORDS = {
  latitude: 37.5172,
  longitude: 127.0473,
};

export const getCurrentPosition = () =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ ...DEFAULT_COORDS, usedDefault: true });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          usedDefault: false,
        });
      },
      () => {
        resolve({ ...DEFAULT_COORDS, usedDefault: true });
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 },
    );
  });

export const mapStore = (store) => {
  const distanceKm =
    store?.distance_km == null || Number.isNaN(Number(store.distance_km))
      ? null
      : Number(store.distance_km);

  return {
    id: store.id,
    name: store.name || "",
    address: store.address || "",
    phone: store.phone || "",
    openingHours: store.opening_hours || "",
    supportsAs: Boolean(store.supports_as),
    distanceKm,
    mapSearchUrl: store.map_search_url || "",
    latitude: store.latitude ?? null,
    longitude: store.longitude ?? null,
  };
};

export const formatStoreDistance = (distanceKm) => {
  if (distanceKm == null) return "거리 정보 없음";
  return `현재 위치에서 약 ${distanceKm} km`;
};
