import { Dropdown } from "./Dropdown";

interface FiltersProps {
  handleFilterChange: (key: string, value: string) => void;
  setRegion: (value: string) => void;
  setStudyType: (value: string) => void;
  setAgeRange: (value: string) => void;
  setDateRange: (value: string) => void;
  region: string;
  studyType: string;
  ageRange: string;
  dateRange: string;
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

const handleFilterChange = (key: string, value: string) => {
  const newParams = new URLSearchParams(searchParams);
  if (value) {
    newParams.set(key, value);
  } else {
    // If the value is empty (e.g., "All Regions"), remove it from the URL
    newParams.delete(key);
  }
  // When a filter changes, always reset to the first page.
  newParams.set("page", "1");
  setSearchParams(newParams);
};

export const Filters = ({
  handleFilterChange,
  setRegion,
  setStudyType,
  setAgeRange,
  setDateRange,
  region,
  studyType,
  ageRange,
  dateRange,
}: FiltersProps) => (
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
      onClick={() => {
        setRegion("");
        setStudyType("");
        setAgeRange("");
        setDateRange("");
      }}
      className="h-fit self-start md:self-end w-fit cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
    >
      Clear Filters
    </button>
  </div>
);
