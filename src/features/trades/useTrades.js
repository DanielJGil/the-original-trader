import { useQuery } from "@tanstack/react-query";
import { getTrades } from "../../services/apiTrades";

export function useTrades() {
  const {
    data: trades,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trades"],
    queryFn: getTrades,
  });

  return { trades, isLoading, error };
}
