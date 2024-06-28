import React from "react";
import "../components/CSS/Head.css";
import logo from "../images/logo.jpg";
const Head = ({ settodos, todos, setfiltred }) => {
  return (
    <div className="head">
      <img src={logo} alt="" />
      <ul>
        <li>
          {" "}
          <button
            onClick={() => {
              setfiltred([...todos].sort((a, b) => b.etat - a.etat));
            }}
          >
            All
          </button>{" "}
        </li>
        <li>
          <button
            onClick={() => {
              setfiltred(todos.filter((todo) => todo.etat === false));
            }}
          >
            Not Done{" "}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setfiltred(todos.filter((todo) => todo.etat === true));
            }}
          >
            {" "}
            Done
          </button>{" "}
        </li>
      </ul>

      <input
        type="text"
        className="searching"
        placeholder="Search Todo"
        onChange={(e) => {
          setfiltred(
            todos.filter((todo) =>
              todo.titre.toLowerCase().includes(e.target.value.toLowerCase())
            )
          );
        }}
      />
    </div>
  );
};

export default Head;
