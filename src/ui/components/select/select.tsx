import { Options } from '@/lib/definitions';
import { memo } from 'react';

interface SelectProps {
  name: string;
  label: string;
  defaultValue: string;
  onChange: (_value: string) => void;
  options: Options<string | number, string | number>[];
}
function Select({ defaultValue, label, name, onChange, options }: SelectProps) {
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

export default memo(Select);
