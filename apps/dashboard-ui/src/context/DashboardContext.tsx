import { Participant } from "@/lib/api";
import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }: React.PropsWithChildren) => {
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState<Participant[] | undefined>();
  const regionParam = searchParams.get("region") || "";
  const studyTypeParam = searchParams.get("studyType") || "";
  const ageRangeParam = searchParams.get("ageRange") || "";
  const dateRangeParam = searchParams.get("dateRange") || "";

  const currentPageNumber = Number(searchParams.get("page") || "1");

  const [region, setRegion] = useState<string | undefined>(regionParam);
  const [studyType, setStudyType] = useState<string | undefined>(
    studyTypeParam,
  );
  const [ageRange, setAgeRange] = useState<string | undefined>(ageRangeParam);
  const [dateRange, setDateRange] = useState<string | undefined>(
    dateRangeParam,
  );

  const value = {
    region,
    studyType,
    ageRange,
    dateRange,
    currentPage,
    setRegion,
    setStudyType,
    setAgeRange,
    setDateRange,
    currentPageNumber,
    setCurrentPage,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
