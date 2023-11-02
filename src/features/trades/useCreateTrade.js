import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrade as createTradeApi } from "../../services/apiTrades";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateTrade() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createTrade, isLoading: isCreating } = useMutation({
    mutationFn: createTradeApi,
    onSuccess: () => {
      toast.success("New trade successfully added");
      queryClient.invalidateQueries({
        queryKey: ["trades"],
      });
      navigate("/trades");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createTrade, isCreating };
}
