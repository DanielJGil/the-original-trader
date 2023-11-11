import { useMutation } from "@tanstack/react-query";
import { createSettings as createSettingsApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useCreateSettings() {
  const { mutate: createSettings } = useMutation({
    mutationFn: createSettingsApi,
    onSuccess: () => {
      toast.success("Account size successfully created.");
    },
  });

  return { createSettings };
}
