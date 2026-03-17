import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: removeBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: (_, bookingId) => {
      toast.success(`Booking ${bookingId} has been successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.removeQueries({ queryKey: ["booking", bookingId] });
    },
    onError: (error) =>
      toast.error(
        `There was an error when attempting to delete the booking: ${error.message}`,
      ),
  });
  return { removeBooking, isDeletingBooking };
}
