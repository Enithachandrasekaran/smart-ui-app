import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardCard from "./DashboardCard";
import PeriodTabs from "./PeriodTabs";
import { filterByPeriod } from "../utils/dateFilter";
import CustomRangeModal from "./CustomRangeModal";

import usersData from "../data/users.json";
import doctorsData from "../data/doctors.json";
import patientsData from "../data/patients.json";

import { Users, Stethoscope, User } from "lucide-react";

const Dashboard = () => {
  const [globalPeriod, setGlobalPeriod] = useState("today");
  const [globalCustomRange, setGlobalCustomRange] = useState(null);
  const [showGlobalCustom, setShowGlobalCustom] = useState(false);

  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setUsers(usersData?.data || []);
    setDoctors(doctorsData?.data || []);
    setPatients(patientsData?.data || []);
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Overview</h1>

          <PeriodTabs
            selected={globalPeriod}
            onChange={setGlobalPeriod}
            onCustomRange={() => setShowGlobalCustom(true)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Users"
            data={users}
            icon={<Users />}
            filterFn={filterByPeriod}
            globalPeriod={globalPeriod}
            globalCustomRange={globalCustomRange}
          />

          <DashboardCard
            title="Total Doctors"
            data={doctors}
            icon={<Stethoscope />}
            filterFn={filterByPeriod}
            globalPeriod={globalPeriod}
            globalCustomRange={globalCustomRange}
          />

          <DashboardCard
            title="Total Patients"
            data={patients}
            icon={<User />}
            filterFn={filterByPeriod}
            globalPeriod={globalPeriod}
            globalCustomRange={globalCustomRange}
          />
        </div>

        {showGlobalCustom && (
          <CustomRangeModal
            onClose={() => setShowGlobalCustom(false)}
            onApply={(range) => {
              setGlobalCustomRange(range);
              setGlobalPeriod("custom");
              setShowGlobalCustom(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;