const PeriodTabs = ({ selected, onChange, onCustomRange }) => {
  const tabs = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "Custom Range", value: "custom" },
  ];

  return (
    <div className="flex bg-white p-1 rounded-xl shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => {
            if (tab.value === "custom") {
              onCustomRange?.();
              onChange("custom");
              return;
            }
            onChange(tab.value);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selected === tab.value
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default PeriodTabs;