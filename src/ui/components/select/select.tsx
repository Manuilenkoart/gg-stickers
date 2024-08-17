import { Options } from '@/lib/definitions';

interface SelectProps {
  name: string;
  label: string;
  defaultValue: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  options: Options<string | number, string | number>[];
}
export default function Select({ defaultValue, label, name, onChange, options }: SelectProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map(({ label, value }) => (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
