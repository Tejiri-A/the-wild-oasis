import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth.js";
import toast from "react-hot-toast";
export function useSignUp() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please, verify the new account from the user's email address.",
      );
    },
    onError: (error) =>
      toast.error(
        "There was an error while trying to create an account: ",
        error,
      ),
  });
  return { signup, isPending };
}
