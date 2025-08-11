import { Summary } from "@/components/Summary";
import { Filters } from "@/components/Filters";
import { Charts } from "@/components/Charts/Charts";
import { Table } from "@/components/Table/Table";
import { Pagination } from "@/components/Pagination";
import { useDashboard } from "@/hooks/useDashboard";

export const Dashboard = () => {
  const { isLoading, handleFilterChange, handlePageChange } = useDashboard();

  return (
    <div className="w-11/12 max-w-7xl flex flex-col gap-5">
      <Summary />
      <Charts />
      <Filters handleFilterChange={handleFilterChange} />
      <Table showLoading={isLoading} />
      <Pagination isLoading={isLoading} handlePageChange={handlePageChange} />
    </div>
  );
};
