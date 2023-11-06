import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTradesAfterDate } from "../../services/apiTrades";
import dayjs from "dayjs";

export function useRecentTrades() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  //   const queryDate = subDays(new Date(), numDays).toISOString();
  const queryDate = dayjs().subtract(numDays, "day").toISOString();

  const { isLoading, data: trades } = useQuery({
    queryKey: ["trades", `last-${numDays}`],
    queryFn: () => getTradesAfterDate(queryDate),
  });

  return { isLoading, trades };
}
