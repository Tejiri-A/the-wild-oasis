import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getBookings } from "../../services/apiBookings.js";
import { PAGE_SIZE } from "../../utils/constants.js";

function getStatusFilter(searchParams) {
  const status = searchParams.get("status");

  if (!status || status === "all") return null;

  return { field: "status", value: status };
}

function getSortBy(searchParams) {
  const sortParam = searchParams.get("sortBy") || "start_date-desc";
  const [field, direction] = sortParam.split("-");
  return { field, direction };
}

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filter = getStatusFilter(searchParams);
  const sortBy = getSortBy(searchParams);

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isPending, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(data?.count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return {
    bookings: data?.data ?? [],
    count: data?.count ?? 0,
    isPending,
    error,
  };
}
