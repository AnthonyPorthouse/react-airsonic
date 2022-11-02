import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSubmit(e: SyntheticEvent): void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const { t } = useTranslation("search");
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");

  const search = (query: string) => {
    navigate(`/search?query=${encodeURI(query)}`);
  };

  return (
    <form
      className={`w-full`}
      onSubmit={(event) => {
        event.preventDefault();
        search(filter);
        if (onSubmit) {
          onSubmit(event);
        }
      }}
      autoComplete="off"
    >
      <div
        className={
          "flex items-center rounded-full border shadow-inner p-0 overflow-hidden"
        }
      >
        <input
          className={
            "flex-grow bg-transparent border-none focus:ring-0 px-3 py-2 pr-0"
          }
          autoComplete="off"
          type="search"
          name="search"
          placeholder={t("search")}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <button className={"px-3 py-2"} aria-label={t("search")}>
          <MagnifyingGlassIcon className={"h-6"} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
