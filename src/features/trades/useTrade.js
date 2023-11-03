import { useQuery } from "@tanstack/react-query";
import { getTrade } from "../../services/apiTrades";
import { useParams } from "react-router-dom";

export function useTrade() {
  const { tradeId } = useParams();

  const {
    data: trade,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trade", tradeId],
    queryFn: () => getTrade(tradeId),
    retry: false,
  });

  return { trade, isLoading, error };
}
