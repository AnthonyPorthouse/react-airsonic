import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  onSubmit(e: SyntheticEvent): void;
}

function SearchBar({ onSubmit }: Readonly<SearchBarProps>) {
  const { t } = useTranslation("search");
  const navigate = useNavigate();
  const route = getRouteApi("/_authenticated");
  const { query } = route.useSearch();

  const [filter, setFilter] = useState(query ?? "");

  const search = (query: string) => {
    navigate({
      to: "/search",
      search: {
        query,
      },
    });
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
