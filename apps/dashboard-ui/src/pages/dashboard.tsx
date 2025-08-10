import { ParticipationTrendBarChart } from "@/components/ParticipantionTrendBarChart";
import { StudyBarChart } from "@/components/StudyBarChart";
import { Summary } from "@/components/Summary";
import { useParticipantPages } from "@/hooks/useParticipantPages";
import { Participant } from "@/lib/api";
import { PropsWithChildren, useEffect, useState } from "react";

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
  "Longitudinal Studies",
  "Surveys",
  "Interviews",
  "Focus Groups",
  "Clinical Trials",
  "Observational Studies",
];

const ageRanges = ["18-24", "25-34", "35-44", "45-54", "54-64", "65+"];

const dateRanges = ["last 7 days", "last 14 days", "last 30 days"];

// Define the props for the component
type RegionDropdownProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: string[];
};

export const Dropdown = ({
  value,
  onChange,
  label,
  options,
}: RegionDropdownProps) => {
  return (
    <div className="w-fit">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id="region"
        name="region"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base shadow-sm ring-1 ring-inset ring-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const TableHeader = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <th
      className={`${className} p-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-600`}
    >
      {children}
    </th>
  );
};

const TableData = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <td className={`${className} whitespace-nowrap p-4 text-sm text-gray-900`}>
      {children}
    </td>
  );
};
const LoadingRow = () => (
  <tr className="h-[1000px]">
    <td colSpan={6} className="text-center p-10">
      <div className="flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400">
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>Loading Participants...</span>
      </div>
    </td>
  </tr>
);

export const Dashboard = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [region, setRegion] = useState("All Regions");
  const [studyType, setStudyType] = useState<string | undefined>();
  const [ageRange, setAgeRange] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<string | undefined>();

  const [currentPage, setCurrentPage] = useState<Participant[] | undefined>();

  const { data: participants, isLoading } = useParticipantPages({
    numberOfRows: "50",
    currentPageNumber: currentPageNumber.toString(),
    region,
    studyType,
    ageRange,
    dateRange,
  });

  const showLoading = isLoading && !currentPage;

  useEffect(() => {
    if (participants) {
      setCurrentPage(participants?.data.currentPage);
    }
  }, [participants, isLoading]);

  return (
    <div className="w-11/12 max-w-7xl flex flex-col gap-5">
      <Summary />
      <div className="overflow-hidden rounded-lg bg-white shadow-md flex gap-5 mb-6">
        <ParticipationTrendBarChart />
        <StudyBarChart />
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-md p-4 flex flex-col md:flex-row gap-5">
        <Dropdown
          value={region}
          onChange={(value) => {
            setRegion(value.target.value);
          }}
          label="Region"
          options={regions}
        />
        <Dropdown
          value={studyType}
          onChange={(value) => {
            setStudyType(value.target.value);
          }}
          label="Study Types"
          options={studyTypes}
        />
        <Dropdown
          value={ageRange}
          onChange={(value) => {
            setAgeRange(value.target.value);
          }}
          label="Age Ranges"
          options={ageRanges}
        />
        <Dropdown
          value={dateRange}
          onChange={(value) => {
            setDateRange(value.target.value);
          }}
          label="Date ranges"
          options={dateRanges}
        />
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader className="w-12">#</TableHeader>
              <TableHeader className="w-40">Created Date</TableHeader>
              <TableHeader className="w-40">Full Name</TableHeader>
              <TableHeader className="w-12">Age</TableHeader>
              <TableHeader className="w-36">Region</TableHeader>
              <TableHeader className="w-60">Participant ID</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {showLoading && <LoadingRow />}
            {currentPage?.map((participant, index) => (
              <tr key={participant.participantId} className="hover:bg-gray-50">
                <TableData>
                  {index + 1 + (currentPageNumber - 1) * 50}
                </TableData>
                <TableData>{participant.createdDate}</TableData>
                <TableData>{participant.fullName}</TableData>
                <TableData>{participant.demographics.age}</TableData>
                <TableData>{participant.demographics.region}</TableData>
                <TableData>{participant.participantId}</TableData>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center p-4">
        <div className="flex items-center gap-x-2">
          <button
            className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              setCurrentPage(participants.data.previousPage);
              setCurrentPageNumber(currentPageNumber - 1);
            }}
            disabled={currentPageNumber === 1}
          >
            Prev
          </button>
          <button
            disabled={isLoading}
            className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              setCurrentPageNumber(currentPageNumber + 1);
              setCurrentPage(participants.data.nextPage);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
