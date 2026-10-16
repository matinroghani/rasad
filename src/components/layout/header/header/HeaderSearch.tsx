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
    <div className="group relative w-full min-w-0">
      <Search
        aria-hidden="true"
        className={[
          "pointer-events-none absolute right-3 top-1/2",
          "size-4 -translate-y-1/2",
          "text-white/45 transition-colors duration-200",
          "group-focus-within:text-[var(--accent-green-glow)]",
        ].join(" ")}
      />

      <input
        type="search"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={[
          "h-10 w-full min-w-0",
          "rounded-[var(--radius-md)]",
          "border border-white/15",
          "bg-black/10",
          "py-2.5 pr-10 pl-3",
          "font-[var(--font-family)]",
          "text-[var(--font-size-md)] text-white",
          "outline-none placeholder:text-white/45",
          "transition-[background-color,border-color,box-shadow] duration-200",
          "hover:border-white/25",
          "focus:border-[var(--accent-green-light)]",
          "focus:bg-white/[0.06]",
          "focus:shadow-[var(--focus-ring)]",
        ].join(" ")}
      />
    </div>
  );
}
