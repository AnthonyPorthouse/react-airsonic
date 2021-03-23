import { useState } from "react";
import { ReactComponent as Search } from "../images/search.svg";

function SearchBar() {
  const [filter, setFilter] = useState("");

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className={"flex items-center border border-black p-0"}>
        <input
          className={"border-none focus:border-none px-3 py-2 pr-0"}
          type="text"
          name="search"
          placeholder="Search"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <button
          className={"px-3 py-2"}
          onClick={(event) => event.preventDefault()}
          aria-label={"Search"}
        >
          <Search className={"h-6"} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
