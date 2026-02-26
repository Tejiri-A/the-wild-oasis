import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins.js";

export function useCabins() {
  const {
    data: cabins,
    error,
    isPending,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: async () => await getCabins(),
  });

  return { cabins, error, isPending };
}
