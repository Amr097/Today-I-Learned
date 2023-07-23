import React from "react";
import { sortBy } from "@/store/functions/sortFacts";
import SearchBar from "@/Home/SortMenu/SearchBar/SearchBar";
import ViewMenu from "./viewMenu/ViewMenu";
import "./SortMenu.scss";

const SortMenu = ({ factsCtx }) => {
  return (
    <div className="sort-container">
      <select
        name=""
        id=""
        className="filter-category"
        onChange={(e) => {
          sortBy(e, factsCtx);
        }}
      >
        <option value="">Sort by:</option>
        <option value="Default">Total interactions</option>
        <option value="MindBlowing">Most mind blowing</option>
        <option value="False">Most false</option>
        <option value="Liked">Most likes</option>
        <option value="Most recent">Most recent</option>
        <option value="Oldest">Oldest</option>
      </select>

      <ViewMenu factsCtx={factsCtx} />
      <SearchBar factsCtx={factsCtx} />
    </div>
  );
};

export default SortMenu;
