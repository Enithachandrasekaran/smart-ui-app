import { useMemo, useState } from "react";
import CustomRangeModal from "./CustomRangeModal";

const OPTIONS = [
  { label: "Global", value: "global" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

const DashboardCard = ({
  title,
  data,
  icon,
  filterFn,
  globalPeriod,
  globalCustomRange,
}) => {
  const [scope, setScope] = useState("global"); // dropdown selection
  const [customRange, setCustomRange] = useState(null);
  const [showCustom, setShowCustom] = useState(false);

  const safeData = Array.isArray(data) ? data : [];

  const effectivePeriod = useMemo(() => {
    if (scope === "global") {
      return globalPeriod === "custom" ? globalCustomRange : globalPeriod;
    }
    if (scope === "custom") return customRange;
    return scope;
  }, [scope, globalPeriod, globalCustomRange, customRange]);

  const filtered = useMemo(() => {
    if (typeof filterFn !== "function") return safeData;
    return filterFn(safeData, effectivePeriod);
  }, [filterFn, safeData, effectivePeriod]);

  const count = Array.isArray(filtered) ? filtered.length : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">{title}</p>

            <select
              className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700"
              value={scope}
              onChange={(e) => {
                const next = e.target.value;
                setScope(next);
                if (next === "custom") setShowCustom(true);
              }}
            >
              {OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-3xl font-bold mt-2">{count}</p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700">
          {icon}
        </div>
      </div>

      {showCustom && (
        <CustomRangeModal
          onClose={() => {
            setShowCustom(false);
            if (!customRange) setScope("global");
          }}
          onApply={(range) => {
            setCustomRange(range);
            setScope("custom");
            setShowCustom(false);
          }}
        />
      )}
    </div>
  );
};

export default DashboardCard;