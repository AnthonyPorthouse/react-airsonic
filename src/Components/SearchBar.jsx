import { useState } from "react";
import { ReactComponent as Search } from "../images/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import { useHistory } from "react-router-dom";
import { getSearchResultsFromApi } from "../features/searchSlice";

function SearchBar({ onSubmit }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector(selectAuth);

  const [filter, setFilter] = useState("");

  const search = (query) => {
    dispatch(getSearchResultsFromApi({ query, ...auth }));
    history.push("/search");
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
