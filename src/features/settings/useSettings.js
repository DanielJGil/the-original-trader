import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { useUser } from "../authentication/useUser";

export function useSettings() {
  const { user = {} } = useUser();

  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings", user.id],
    queryFn: () => getSettings(user.id),
  });

  return { settings, isLoading, error };
}
