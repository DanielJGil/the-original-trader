import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import { useTrades } from "../trades/useTrades";
import ProfitChart from "./AccountGrowthChart";
import OutcomeChart from "./OutcomeChart";
import Stats from "./Stats";
import TodayActivityTable from "./TodayActivityTable";

function DashboardLayout() {
  const { trades, isLoading } = useTrades();
  const { user } = useUser();

  const userTrades = trades?.filter((trade) => trade.userId === user.id);

  const numTrades = userTrades?.length;

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 justify-center items-center">
        <Stats userTrades={userTrades} numTrades={numTrades} />
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-around gap-6">
          <TodayActivityTable />
          <OutcomeChart userTrades={userTrades} />
        </div>
        <ProfitChart userTrades={userTrades} />
      </div>
    </div>
  );
}

export default DashboardLayout;
