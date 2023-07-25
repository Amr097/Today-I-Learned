import React from "react";
import { viewBy } from "./functions/viewBy";
import "./ViewMenu.scss";

const ViewMenu = ({ factsCtx }) => {
  return (
    <div className="view-container">
      <select
        name=""
        id=""
        className="filter-category"
        onChange={(e) => {
          viewBy(e, factsCtx);
        }}
      >
        <option value="">View: </option>
        <option value="All">All facts</option>
        <option value="My Facts">My facts</option>
        <option value="Upvotes">My upvotes</option>
        <option value="Downvotes">My downvotes</option>
      </select>
    </div>
  );
};

export default ViewMenu;
