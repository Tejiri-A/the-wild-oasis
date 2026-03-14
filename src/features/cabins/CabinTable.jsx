import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./queries.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router";


function CabinTable() {
  const { cabins, isPending } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  // 1. FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2. SORT
  const sortBy = searchParams.get("sortBy") || "name-asc"
  const [field, direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1
  const sortedCabins = [...filteredCabins].sort(
    (a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      if(typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      }
      return (aValue - bValue) * modifier;
    }
  );


  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins || []}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
