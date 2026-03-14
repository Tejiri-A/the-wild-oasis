import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";

export function useBookings() {
  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async() => await getBookings(),
  });
  return { bookings, isPending, error };
}
