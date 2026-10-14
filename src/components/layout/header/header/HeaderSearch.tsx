"use client";

import { Search } from "lucide-react";

type SearchInputProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
};

export default function SearchInput({
  placeholder = "جستجو...",
  value,
  onChange,
  onSearch,
}: SearchInputProps) {
  function handleChange(value: string) {
    onChange(value);
    onSearch?.(value);
  }

  return (
    <div className="group relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-white/65 transition-colors duration-300 group-focus-within:text-white"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        className="w-56 rounded-md border border-white/18 bg-white/8 py-2.5 pr-9 pl-3.5 text-[13px] text-[#e8f2e8] outline-none backdrop-blur-md transition-[width,background-color,border-color,box-shadow] duration-300 ease-out placeholder:text-white/50 focus:w-[16rem] focus:border-white/40 focus:bg-white/16 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
      />
    </div>
  );
}
