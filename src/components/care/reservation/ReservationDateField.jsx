import styled from "styled-components";
import calendarIcon from "@assets/icons/care/calendar.svg";
import chevronIcon from "@assets/icons/care/chevron-down.svg";
import chevronLeftIcon from "@assets/icons/care/chevron-left.svg";
import chevronRightIcon from "@assets/icons/care/chevron-right.svg";
import { formatVisitDate } from "@utils/formatDate";

const weekendColor = (weekday) => {
  if (weekday === 0) return "#B55341";
  if (weekday === 6) return "#4E70BC";
  return "var(--color-gray)";
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const getMonthCells = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
};

const ReservationDateField = ({
  label,
  placeholder = "Select...",
  value,
  viewDate,
  isOpen,
  onToggle,
  onChange,
  onViewDateChange,
}) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = getMonthCells(year, month);
  const selectedKey = value
    ? `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`
    : "";

  const moveMonth = (offset) => {
    onViewDateChange(new Date(year, month + offset, 1));
  };

  const handleSelectDay = (day) => {
    onChange(new Date(year, month, day));
    onToggle(false);
  };

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Box>
        <Trigger type="button" onClick={() => onToggle(!isOpen)}>
          <ValueText $placeholder={!value}>
            {value ? formatVisitDate(value) : placeholder}
          </ValueText>
          <Icon
            src={isOpen ? chevronIcon : calendarIcon}
            alt=""
            $open={isOpen}
          />
        </Trigger>

        {isOpen && (
          <Calendar>
            <MonthRow>
              <NavButton
                type="button"
                onClick={() => moveMonth(-1)}
                aria-label="이전 달"
              >
                <NavIcon src={chevronLeftIcon} alt="" />
              </NavButton>
              <MonthTitle>
                {year}년 {month + 1}월
              </MonthTitle>
              <NavButton
                type="button"
                onClick={() => moveMonth(1)}
                aria-label="다음 달"
              >
                <NavIcon src={chevronRightIcon} alt="" />
              </NavButton>
            </MonthRow>

            <WeekRow>
              {WEEKDAYS.map((day, index) => (
                <WeekDay key={day} $weekday={index}>
                  {day}
                </WeekDay>
              ))}
            </WeekRow>

            <DayGrid>
              {cells.map((day, index) => {
                if (!day) {
                  return <EmptyCell key={`empty-${index}`} />;
                }

                const key = `${year}-${month}-${day}`;
                const weekday = index % 7;
                const selected = key === selectedKey;

                return (
                  <DayButton
                    key={key}
                    type="button"
                    $selected={selected}
                    $weekday={weekday}
                    onClick={() => handleSelectDay(day)}
                  >
                    {day}
                  </DayButton>
                );
              })}
            </DayGrid>
          </Calendar>
        )}
      </Box>
    </Wrapper>
  );
};

export default ReservationDateField;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.p`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-black);
`;

const Box = styled.div`
  width: 100%;
  border: 1px solid var(--color-input-border);
  border-radius: 0.6rem;
  overflow: hidden;
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.2rem;
`;

const ValueText = styled.span`
  font-size: 1.4rem;
  color: ${({ $placeholder }) =>
    $placeholder ? "var(--color-placeholder-gray)" : "var(--color-black)"};
`;

const Icon = styled.img`
  width: 1.2rem;
  height: auto;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

const Calendar = styled.div`
  padding: 2rem;
  border-top: 1px solid var(--color-input-border);
  background: var(--color-soft-gray);
`;

const MonthRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;
`;

const MonthTitle = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--color-black);
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.4rem;
`;

const NavIcon = styled.img`
  width: 0.7rem;
  height: auto;
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 1.4rem;
`;

const WeekDay = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  color: ${({ $weekday }) => weekendColor($weekday)};
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 0.4rem;
`;

const EmptyCell = styled.span`
  aspect-ratio: 1;
`;

const DayButton = styled.button`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 3.2rem;
  border-radius: 50%;
  font-size: 1.3rem;
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  color: ${({ $selected, $weekday }) => {
    if ($selected) return "var(--color-white)";
    if ($weekday === 0 || $weekday === 6) return weekendColor($weekday);
    return "var(--color-black)";
  }};
  background: ${({ $selected }) =>
    $selected ? "var(--color-primary)" : "transparent"};
`;
