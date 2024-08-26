'use client';
import { memo } from 'react';

interface InputNumberProps {
  name: string;
  label: string;
  value: number;
  onChange: (_value: string) => void;
}
function InputNumber({ label, name, onChange, value }: InputNumberProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        inputMode="numeric"
        id={name}
        name={name}
        min="1"
        step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

export default memo(InputNumber);
