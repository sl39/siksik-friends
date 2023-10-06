// input Box

import type { ChangeEvent } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type: string;
}

export default function Input({ value, onChange, placeholder, type = "text" }: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <input type={type} value={value} onChange={handleChange} placeholder={placeholder} />;
}
