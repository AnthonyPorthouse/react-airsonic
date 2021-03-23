import { useState } from "react";
import { ReactComponent as Search } from "../images/search.svg";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import { getSearchResults } from "../features/api";

function SearchBar() {
  const auth = useSelector(selectAuth);

  const [filter, setFilter] = useState("");

  const search = (query) => {
    getSearchResults({ query, ...auth }).then((results) => {
      console.log(results);
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        search(filter);
      }}
      autoComplete="off"
    >
      <div className={"flex items-center border border-black p-0"}>
        <input
          className={"border-none focus:border-none px-3 py-2 pr-0"}
          autoComplete="off"
          type="search"
          name="search"
          placeholder="Search"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <button className={"px-3 py-2"} aria-label={"Search"}>
          <Search className={"h-6"} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
