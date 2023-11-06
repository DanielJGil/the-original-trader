import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import Stats from "./Stats";
import { useRecentTrades } from "./useRecentTrades";

function DashboardLayout() {
  const { trades, isLoading } = useRecentTrades();
  const { user } = useUser();

  const userTrades = trades?.filter((trade) => trade.userId === user.id);

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 justify-center items-center">
        <Stats userTrades={userTrades} />
      </div>

      <div>
        <div>Today's Trades</div>
        <div>Chart</div>
        <div>Chart</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
