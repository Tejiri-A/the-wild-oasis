import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logoutApi } from "../../services/apiAuth.js";
import { useNavigate } from "react-router";
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: logout,
    error,
    isPending,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, error, isPending };
}
