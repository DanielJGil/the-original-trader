import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import { useTrades } from "../trades/useTrades";
import ProfitChart from "./ProfitChart";
import Stats from "./Stats";

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
        <div className="flex justify-around">
          <div>Today's Trades</div>
          <div>Chart</div>
        </div>
        <ProfitChart userTrades={userTrades} />
      </div>
    </div>
  );
}

export default DashboardLayout;
