// =========================
// 📁 components/StatsCard.jsx (Updated with Icons + Date)
// =========================
import { Users, Stethoscope, User } from "lucide-react";

const iconMap = {
  "Total Users": Users,
  "Total Doctors": Stethoscope,
  "Total Patients": User,
};

export const StatsCard = ({ title, value, dateLabel }) => {
  const Icon = iconMap[title];

  return (
    <div className="bg-white shadow p-5 rounded-xl flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-blue-600" />}
      </div>

      <p className="text-2xl font-bold">{value}</p>

      <p className="text-xs text-gray-400">{dateLabel}</p>

      <span className="text-xs text-gray-400">
        vs previous period
      </span>
    </div>
  );
};
