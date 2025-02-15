import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  onSubmit(e: SyntheticEvent): void;
}

const route = getRouteApi("/_authenticated");

function SearchBar({ onSubmit }: Readonly<SearchBarProps>) {
  const { t } = useTranslation("search");
  const navigate = useNavigate();
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
          "flex items-center overflow-hidden rounded-full border p-0 shadow-inner"
        }
      >
        <input
          className={
            "grow border-none bg-transparent px-3 py-2 pr-0 focus:ring-0"
          }
          autoComplete="off"
          type="search"
          name="search"
          placeholder={t("search")}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <button className={"px-3 py-2"} aria-label={t("search")}>
          <Search className={"h-6"} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
