import type { PropsWithChildren } from "react";

export const TableHeader = ({
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
