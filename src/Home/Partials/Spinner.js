import React from "react";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <p>Loading facts...</p>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Spinner;
