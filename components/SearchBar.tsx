"use client";

interface SearchBarProps {
  value: string;
  onChange: (
    value: string
  ) => void;

  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder =
    "Search quizzes..."
}: SearchBarProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="
          w-full
          p-4
          rounded-lg
          border
          outline-none
          text-lg
          transition
        "
      />
    </div>
  );
}