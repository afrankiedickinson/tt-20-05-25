import { TableHeader } from "./TableHeader";
import { TableData } from "./TableData";
import { LoadingRow } from "./LoadingRow";
import { useContext } from "react";
import { DashboardContext } from "@/context/DashboardContext";
import { useParticipantPages } from "@/hooks/useParticipantPages";

import type { Participant } from "@/lib/api";

export interface TableProps {
  showLoading: boolean;
}

export const Table = ({ showLoading }: TableProps) => {
  const { currentPageNumber, region, studyType, ageRange, dateRange } =
    useContext(DashboardContext);

  const { data: participants } = useParticipantPages(
    {
      numberOfRows: "50",
      currentPageNumber: currentPageNumber.toString(),
      region,
      studyType,
      ageRange,
      dateRange,
    },
    { staleTime: Infinity },
  );

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <table className="w-full table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader className="w-12">#</TableHeader>
            <TableHeader className="w-40 hidden md:table-cell">
              Created Date
            </TableHeader>
            <TableHeader className="w-40">Full Name</TableHeader>
            <TableHeader className="w-12">Age</TableHeader>
            <TableHeader className="w-36">Region</TableHeader>
            <TableHeader className="w-60 hidden md:table-cell">
              Participant ID
            </TableHeader>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {showLoading && <LoadingRow />}
          {participants?.data[currentPageNumber]?.map(
            (participant: Participant, index: number) => (
              <tr key={participant.participantId} className="hover:bg-gray-50">
                <TableData>
                  {index + 1 + (currentPageNumber - 1) * 50}
                </TableData>
                <TableData className="hidden md:table-cell">
                  {participant.createdDate}
                </TableData>
                <TableData>{participant.fullName}</TableData>
                <TableData>{participant.demographics.age}</TableData>
                <TableData>{participant.demographics.region}</TableData>
                <TableData className="hidden md:table-cell">
                  {participant.participantId}
                </TableData>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};
