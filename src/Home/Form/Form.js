import React from "react";
import "./Form.scss";

const Form = () => {
  return (
    <form action="POST" className="form">
      <input
        type="text"
        placeholder="Share a fact with this world.."
        required
      />
      <span>200</span>
      <input type="text" placeholder="Trustworthy source.." required />
      <select name="" id="">
        <option value="">Choose category:</option>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Finance">Finance</option>
        <option value="Society">Society</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Health">Health</option>
        <option value="History">History</option>
        <option value="News">News</option>
      </select>
      <button className="form__btn" type="submit">
        post
      </button>
    </form>
  );
};

export default Form;
