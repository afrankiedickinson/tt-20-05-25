import { Summary } from "@/components/Summary";
import { Filters } from "@/components/Filters";
import { Charts } from "@/components/Charts";
import { Table } from "@/components/Table/Table";
import { Pagination } from "@/components/Pagination";
import { useDashboard } from "@/hooks/useDashboard";

export const Dashboard = () => {
  const {
    region,
    studyType,
    ageRange,
    dateRange,
    currentPageNumberParam,
    currentPage,
    participants,
    isLoading,
    showLoading,
    handleFilterChange,
    handlePageChange,
    setRegion,
    setStudyType,
    setAgeRange,
    setDateRange,
  } = useDashboard();

  return (
    <div className="w-11/12 max-w-7xl flex flex-col gap-5">
      <Summary />
      <Charts />
      <Filters
        handleFilterChange={handleFilterChange}
        setRegion={setRegion}
        setStudyType={setStudyType}
        setAgeRange={setAgeRange}
        setDateRange={setDateRange}
        region={region}
        studyType={studyType}
        ageRange={ageRange}
        dateRange={dateRange}
      />
      <Table
        currentPage={currentPage}
        currentPageNumber={currentPageNumberParam}
        showLoading={showLoading}
      />
      <Pagination
        currentPageNumber={currentPageNumberParam}
        handlePageChange={handlePageChange}
        isLoading={isLoading}
        participants={participants}
      />
    </div>
  );
};
