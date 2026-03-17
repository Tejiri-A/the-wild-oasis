import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getBookings } from "../../services/apiBookings.js";

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
  const [searchParams] = useSearchParams();

  const filter = getStatusFilter(searchParams);
  const sortBy = getSortBy(searchParams);

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isPending, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return {
    bookings: data?.data ?? [],
    count: data?.count ?? 0,
    isPending,
    error,
  };
}
