import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <>
      <div className="flex items-start justify-between mb-5 flex-col gap-3 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <DashboardFilter />
      </div>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
