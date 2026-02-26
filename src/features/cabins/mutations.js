import toast from "react-hot-toast";
import {
  createEditCabin,
  deleteCabin as deleteCabinApi,
} from "../../services/apiCabins.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: async () => {
      toast.success("Cabin successfully deleted!");
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteCabin, isDeleting };
}

export function useCreateCabin(resetForm) {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreatingCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: async () => {
      toast.success("Cabin successfully created!");
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      if(resetForm) resetForm();
    },
    onError: (err) => toast.error(err.message),
  });
  return { createCabin, isCreatingCabin };
}

export function useEditCabin(closeForm) {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: async () => {
      toast.success("Cabin successfully updated!");
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      closeForm();
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}
