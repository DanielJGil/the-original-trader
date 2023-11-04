import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTrade as deleteTradeApi } from "../../services/apiTrades";

export function useDeleteTrade() {
  const queryClient = useQueryClient();

  const { mutate: deleteTrade } = useMutation({
    mutationFn: deleteTradeApi,
    onSuccess: () => {
      toast.success("Trade successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["trades"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteTrade };
}
