import { useContext } from "react";
import { Dropdown } from "./Dropdown";
import { DashboardContext } from "@/context/DashboardContext";
import { useSearchParams } from "react-router-dom";

interface FiltersProps {
  handleFilterChange: (key: string, value: string) => void;
}

const regions = [
  "All Regions",
  "North America",
  "South America",
  "Europe",
  "Africa",
  "Asia",
  "Australia/Oceania",
];

const studyTypes = [
  "All Study Types",
  "Longitudinal Studies",
  "Surveys",
  "Interviews",
  "Focus Groups",
  "Clinical Trials",
  "Observational Studies",
];

const ageRanges = [
  "All Ages",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "54-64",
  "65+",
];

const dateRanges = ["All Dates", "last 7 days", "last 14 days", "last 30 days"];

export const Filters = ({ handleFilterChange }: FiltersProps) => {
  const {
    region,
    studyType,
    ageRange,
    dateRange,
    setRegion,
    setStudyType,
    setAgeRange,
    setDateRange,
  } = useContext(DashboardContext);

  const [_, setSearchParams] = useSearchParams();

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md p-4 flex flex-col md:flex-row gap-5">
      <Dropdown
        value={region}
        onChange={(event) => {
          handleFilterChange("region", event.target.value);
          setRegion(event.target.value);
        }}
        label="Region"
        options={regions}
      />
      <Dropdown
        value={studyType}
        onChange={(event) => {
          handleFilterChange("studyType", event.target.value);
          setStudyType(event.target.value);
        }}
        label="Study Types"
        options={studyTypes}
      />
      <Dropdown
        value={ageRange}
        onChange={(event) => {
          handleFilterChange("ageRange", event.target.value);
          setAgeRange(event.target.value);
        }}
        label="Age Ranges"
        options={ageRanges}
      />
      <Dropdown
        value={dateRange}
        onChange={(event) => {
          handleFilterChange("dateRange", event.target.value);
          setDateRange(event.target.value);
        }}
        label="Date ranges"
        options={dateRanges}
      />
      <button
        type="button"
        onClick={() => {
          setRegion("");
          setStudyType("");
          setAgeRange("");
          setDateRange("");
          setSearchParams({});
        }}
        className="h-fit self-start md:self-end w-fit cursor-pointer rounded-md bg-white px-3 py-2 text-nowrap text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
      >
        Clear Filters
      </button>
    </div>
  );
};
