import { Options } from 'app/lib/definitions';

interface SelectProps {
  name: string;
  label: string;
  defaultValue: string;
  options: Options<string | number, string | number>[];
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}
export default function Select({ name, label, defaultValue, options, onChange }: SelectProps) {
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
