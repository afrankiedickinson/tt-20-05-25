export type RegionDropdownProps = {
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
        {options.map((option, index) => (
          <option key={option} value={index === 0 ? "" : option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
