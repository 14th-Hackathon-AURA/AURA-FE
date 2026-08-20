import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "@components/common/PageHeader";
import CompleteOverlay from "@components/common/CompleteOverlay";
import ReservationForm from "@components/care/reservation/ReservationForm";
import { getMyProducts } from "@apis/products";
import { createServiceRequest } from "@apis/serviceRequests";
import {
  createVisitReservation,
  getVisitAvailability,
} from "@apis/visitReservations";
import useMemberProfile from "@hooks/useMemberProfile";
import { mapProduct } from "@utils/productMappers";
import {
  buildPurpose,
  buildServiceSymptom,
  formatReservationApiError,
  mapAvailabilitySlots,
  parseVisitDate,
} from "@utils/reservationMappers";

const COMPLETE_REDIRECT_DELAY = 2000;

const createInitialForm = (stateForm = {}) => ({
  productId:
    stateForm.productId != null && stateForm.productId !== ""
      ? String(stateForm.productId)
      : "",
  diagnosisId:
    stateForm.diagnosisId != null && stateForm.diagnosisId !== ""
      ? String(stateForm.diagnosisId)
      : "",
  consultType: stateForm.consultType || "",
  symptom: stateForm.symptom || "",
  visitDate: parseVisitDate(stateForm.visitDate),
  visitAt: stateForm.visitAt || "",
  contactPhone: stateForm.contactPhone || stateForm.contact || "",
  note: stateForm.note || "",
});

const toDateKey = (visitDate) => {
  if (!visitDate) return "";
  const year = visitDate.getFullYear();
  const month = String(visitDate.getMonth() + 1).padStart(2, "0");
  const day = String(visitDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname, raw: profile } = useMemberProfile();

  const [locationKey, setLocationKey] = useState(location.key);
  const [form, setForm] = useState(() =>
    createInitialForm(location.state?.form),
  );
  const [storeId, setStoreId] = useState(location.state?.storeId ?? "");
  const [storeName, setStoreName] = useState(location.state?.storeName ?? "");
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [timeOptions, setTimeOptions] = useState([]);
  const [timesLoading, setTimesLoading] = useState(false);
  const [availabilityKey, setAvailabilityKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completeMessage, setCompleteMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (location.key !== locationKey) {
    setLocationKey(location.key);
    setForm(createInitialForm(location.state?.form));
    setStoreId(location.state?.storeId ?? "");
    setStoreName(location.state?.storeName ?? "");
  }

  const nextAvailabilityKey =
    storeId && form.visitDate ? `${storeId}:${toDateKey(form.visitDate)}` : "";

  if (nextAvailabilityKey !== availabilityKey) {
    setAvailabilityKey(nextAvailabilityKey);
    setTimeOptions([]);
    setTimesLoading(Boolean(nextAvailabilityKey));
  }

  useEffect(() => {
    if (!isSubmitted) return undefined;

    const timer = setTimeout(() => {
      navigate("/care");
    }, COMPLETE_REDIRECT_DELAY);

    return () => clearTimeout(timer);
  }, [isSubmitted, navigate]);

  useEffect(() => {
    let mounted = true;

    getMyProducts()
      .then((data) => {
        if (!mounted) return;
        setProducts(data.map(mapProduct));
      })
      .catch(() => {
        if (!mounted) return;
        setProducts([]);
        setErrorMessage("제품 목록을 불러오지 못했어요.");
      })
      .finally(() => {
        if (mounted) setProductsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!availabilityKey) return undefined;

    const [store, date] = availabilityKey.split(":");
    let mounted = true;

    getVisitAvailability({ store, date })
      .then((data) => {
        if (!mounted) return;
        const slots = mapAvailabilitySlots(data);
        setTimeOptions(slots);
        setForm((prev) => {
          if (
            prev.visitAt &&
            !slots.some((slot) => String(slot.value) === String(prev.visitAt))
          ) {
            return { ...prev, visitAt: "" };
          }
          return prev;
        });
      })
      .catch((error) => {
        if (!mounted) return;
        setTimeOptions([]);
        setErrorMessage(
          formatReservationApiError(error?.response?.data) ||
            "예약 가능 시간을 불러오지 못했어요.",
        );
      })
      .finally(() => {
        if (mounted) setTimesLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [availabilityKey]);

  const productOptions = useMemo(
    () =>
      products.map((product) => ({
        value: String(product.id),
        label: product.name || `제품 ${product.id}`,
      })),
    [products],
  );

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrorMessage("");
  }, []);

  const handleSelectStore = () => {
    navigate("/care/reservation/stores", {
      state: {
        form: {
          ...form,
          visitDate: form.visitDate ? form.visitDate.toISOString() : null,
        },
        storeId,
        storeName,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!storeId) {
      setErrorMessage("예약 매장을 선택해 주세요.");
      return;
    }
    if (!form.productId) {
      setErrorMessage("제품을 선택해 주세요.");
      return;
    }
    if (!form.consultType) {
      setErrorMessage("상담 유형을 선택해 주세요.");
      return;
    }
    if (!form.visitDate || !form.visitAt) {
      setErrorMessage("희망 방문 일정을 선택해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const purpose = buildPurpose({
      consultType: form.consultType,
      symptom: form.symptom,
    });

    const payload = {
      store: Number(storeId),
      product: Number(form.productId),
      visit_at: form.visitAt,
      purpose,
      contact_name: nickname || profile?.nickname || "",
      contact_phone: form.contactPhone || profile?.phone || "",
      request_note: form.note || "",
    };

    if (form.diagnosisId) {
      payload.diagnosis = Number(form.diagnosisId);
    }

    try {
      const reservation = await createVisitReservation(payload);

      try {
        await createServiceRequest({
          product: Number(form.productId),
          store: Number(storeId),
          reservation: reservation.id,
          symptom: buildServiceSymptom({
            consultType: form.consultType,
            symptom: form.symptom,
            purpose,
          }),
        });
      } catch {
        // 방문 예약은 성공했으므로 서비스 요청 실패는 예약 완료 흐름을 막지 않습니다.
      }

      const code = reservation?.reservation_code
        ? `\n예약 코드: ${reservation.reservation_code}`
        : "";

      setCompleteMessage(
        `예약 요청이 완료되었습니다.${code}
매장에서 검토 후 고객님의 연락처로
방문 일자를 안내드릴 예정입니다.`,
      );
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(
        formatReservationApiError(error?.response?.data) ||
          error?.message ||
          "예약을 요청하지 못했어요. 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <PageHeader title="매장 AS 예약" backTo="/care" />

      <Main>
        <ReservationForm
          values={{ ...form, storeId }}
          storeName={storeName}
          productOptions={productOptions}
          productsLoading={productsLoading}
          timeOptions={timeOptions}
          timesLoading={timesLoading}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          onChangeField={updateField}
          onSelectStore={handleSelectStore}
          onSubmit={handleSubmit}
        />
      </Main>

      {isSubmitted && (
        <CompleteOverlay
          multiline
          message={
            completeMessage ||
            `예약 요청이 완료되었습니다.
매장에서 검토 후 고객님의 연락처로
방문 일자를 안내드릴 예정입니다.`
          }
          onClose={() => navigate("/care")}
        />
      )}
    </PageWrapper>
  );
};

export default ReservationPage;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: var(--color-white);
`;

const Main = styled.main`
  flex: 1;
  min-height: 0;
  padding: 2.4rem;
  overflow-y: auto;
`;
