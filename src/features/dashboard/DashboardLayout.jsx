import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import ProfitChart from "./ProfitChart";
import Stats from "./Stats";
import { useRecentTrades } from "./useRecentTrades";

function DashboardLayout() {
  const { trades, isLoading } = useRecentTrades();
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
        <div>Today's Trades</div>
        <div>Chart</div>
        <ProfitChart userTrades={userTrades} numTrades={numTrades} />
      </div>
    </div>
  );
}

export default DashboardLayout;
