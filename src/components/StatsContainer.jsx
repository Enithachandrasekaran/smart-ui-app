// =========================
// 📁 components/StatsContainer.jsx (Updated)
// =========================
export const StatsContainer = ({ users, doctors, patients, dateLabel }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="Total Users"
        value={users.length}
        dateLabel={dateLabel}
      />
      <StatsCard
        title="Total Doctors"
        value={doctors.length}
        dateLabel={dateLabel}
      />
      <StatsCard
        title="Total Patients"
        value={patients.length}
        dateLabel={dateLabel}
      />
    </div>
  );
};
