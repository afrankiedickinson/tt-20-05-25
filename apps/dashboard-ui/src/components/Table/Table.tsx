import { Participant } from "@/lib/api";
import { TableHeader } from "./TableHeader";
import { TableData } from "./TableData";
import { LoadingRow } from "./LoadingRow";

export interface TableProps {
  currentPage: Participant[];
  currentPageNumber: number;
  showLoading: boolean;
}

export const Table = ({
  currentPage,
  currentPageNumber,
  showLoading,
}: TableProps) => (
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
        {currentPage?.map((participant, index) => (
          <tr key={participant.participantId} className="hover:bg-gray-50">
            <TableData>{index + 1 + (currentPageNumber - 1) * 50}</TableData>
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
        ))}
      </tbody>
    </table>
  </div>
);
