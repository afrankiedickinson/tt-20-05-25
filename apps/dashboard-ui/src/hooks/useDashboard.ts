// hooks/useDashboard.ts
import { useParticipantPages } from "@/hooks/useParticipantPages";
import { Participant } from "@/lib/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL search params
  const regionParam = searchParams.get("region") || "";
  const studyTypeParam = searchParams.get("studyType") || "";
  const ageRangeParam = searchParams.get("ageRange") || "";
  const dateRangeParam = searchParams.get("dateRange") || "";
  const currentPageNumberParam = Number(searchParams.get("page") || "1");

  // State for filter inputs
  const [region, setRegion] = useState<string | undefined>(regionParam);
  const [studyType, setStudyType] = useState<string | undefined>(
    studyTypeParam,
  );
  const [ageRange, setAgeRange] = useState<string | undefined>(ageRangeParam);
  const [dateRange, setDateRange] = useState<string | undefined>(
    dateRangeParam,
  );

  // State for the currently displayed page of participants
  const [currentPage, setCurrentPage] = useState<Participant[] | undefined>();

  // Data fetching logic
  const { data: participants, isLoading } = useParticipantPages({
    numberOfRows: "50",
    currentPageNumber: currentPageNumberParam.toString(),
    region,
    studyType,
    ageRange,
    dateRange,
  });

  // Derived state to determine if the initial loading skeleton should be shown
  const showLoading = isLoading && !currentPage;

  // Effect to update the displayed page data when new data is fetched
  useEffect(() => {
    if (participants) {
      setCurrentPage(participants?.data.currentPage);
    }
  }, [participants, isLoading]);

  // Handler to update URL params when a filter changes
  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  // Handler to update URL param for page navigation
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  // Return all the state and functions needed by the UI
  return {
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
  };
};
