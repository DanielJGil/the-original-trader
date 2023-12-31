import { Skeleton } from "@mui/material";
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

  if (isLoading)
    return (
      <div className="space-y-6">
        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-6 w-full">
            <Skeleton variant="rounded" width={"100%"} height={80} />
            <Skeleton variant="rounded" width={"100%"} height={80} />
          </div>
          <div className="flex flex-col gap-6 w-full">
            <Skeleton variant="rounded" width={"100%"} height={80} />
            <Skeleton variant="rounded" width={"100%"} height={80} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-around gap-6">
            <Skeleton variant="rounded" width={"100%"} height={320} />
            <Skeleton variant="rounded" width={"100%"} height={320} />
          </div>
          <Skeleton variant="rounded" width={"100%"} height={500} />
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 justify-center items-center">
        <Stats userTrades={userTrades} numTrades={numTrades} />
      </div>

      <div>
        <div className="flex flex-col xl:flex-row gap-6 mb-6">
          <TodayActivityTable />
          <OutcomeChart userTrades={userTrades} />
        </div>
        <ProfitChart userTrades={userTrades} />
      </div>
    </div>
  );
}

export default DashboardLayout;
