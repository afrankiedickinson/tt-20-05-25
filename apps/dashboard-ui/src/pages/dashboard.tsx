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

//
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
    <div className="w-11/12 max-w-7xl overflow-hidden rounded-lg bg-white shadow-md">
      <div className="flex gap-5">
        <Dropdown
          value={region}
          onChange={(value) => {
            console.log(value.target.value);
            setRegion(value.target.value);
          }}
          label="Region"
          options={regions}
        />
        <Dropdown
          value={studyType}
          onChange={(value) => {
            console.log(value.target.value);
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
            console.log(value.target.value);
            setDateRange(value.target.value);
          }}
          label="Date ranges"
          options={dateRanges}
        />
      </div>
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
          {showLoading && (
            <tr className="h-[1000px]">
              <td>Loading...</td>
            </tr>
          )}
          {currentPage?.map((participant, index) => (
            <tr key={participant.participantId} className="hover:bg-gray-50">
              <TableData>{index + 1 + (currentPageNumber - 1) * 50}</TableData>
              <TableData>{participant.createdDate}</TableData>
              <TableData>{participant.fullName}</TableData>
              <TableData>{participant.demographics.age}</TableData>
              <TableData>{participant.demographics.region}</TableData>
              <TableData>{participant.participantId}</TableData>
            </tr>
          ))}
        </tbody>
      </table>
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
