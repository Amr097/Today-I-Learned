"use client";
import React from "react";
import "./SearchBar.scss";
import { useRef, useState } from "react";
import { searchFact } from "./Functions/searchFact";

const SearchBar = ({ factsCtx }) => {
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef();

  return (
    <div className="search">
      <input
        type="text"
        placeholder="SEARCH"
        ref={searchRef}
        value={searchText}
        className="search__input"
        onChange={() => {
          setSearchText(searchRef.current.value);
        }}
      ></input>

      <button
        className="search__button"
        onClick={() => {
          setSearchText("");
          if (factsCtx.userFilteredFacts.length < factsCtx.userFacts.length) {
            factsCtx.setLoading(true);
            factsCtx.filterFacts("", [...factsCtx.userFacts]);
            setTimeout(() => {
              factsCtx.setLoading(false);
            }, 100);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="grey"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="rgb(223, 210, 210)"
          className="w-6 h-6 search__icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <button
        className="search__button"
        onClick={() => {
          searchFact(searchText, factsCtx);
        }}
      >
        <svg className="search__icon">
          <use xlinkHref="images/sprite.svg#icon-magnifying-glass"></use>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
