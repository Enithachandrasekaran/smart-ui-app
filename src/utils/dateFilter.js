import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays
} from "date-fns";

export const filterByPeriod = (data, period) => {
  const now = new Date();

  let start, end;

  // If dataset provides a precomputed "category" field, prefer it for
  // relative buckets (today/yesterday/week) so demo JSON keeps working
  // even when the real current date changes.
  const hasCategory = Array.isArray(data) && data.some((d) => d && d.category);
  if (hasCategory && typeof period === "string") {
    const map = {
      today: "today",
      yesterday: "yesterday",
      week: "this_week",
    };
    const category = map[period];
    if (category) {
      return data.filter(
        (item) => String(item?.category || "").toLowerCase() === category
      );
    }
  }

  // Support custom range object: { start: Date, end: Date }
  if (period && typeof period === "object" && period.start && period.end) {
    start = period.start;
    end = period.end;
  } else {
  switch (period) {
    case "today":
      start = startOfDay(now);
      end = endOfDay(now);
      break;

    case "yesterday":
      const yesterday = subDays(now, 1);
      start = startOfDay(yesterday);
      end = endOfDay(yesterday);
      break;

    case "week":
      start = startOfWeek(now, { weekStartsOn: 1 });
      end = endOfWeek(now, { weekStartsOn: 1 });
      break;

    case "month":
      start = startOfMonth(now);
      end = endOfMonth(now);
      break;

    default:
      return data;
  }
  }

  return data.filter((item) => {
    if (!item.createdAt) return false;
    const created = new Date(item.createdAt);
    return created >= start && created <= end;
  });
};