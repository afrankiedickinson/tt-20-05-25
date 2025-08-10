import { PropsWithChildren } from "react";

export const TableData = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <td className={`${className} whitespace-nowrap p-4 text-sm text-gray-900`}>
      {children}
    </td>
  );
};
