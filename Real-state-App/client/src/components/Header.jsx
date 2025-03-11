import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
     <Link to="/">
     <h1>E <span>state</span></h1>
     </Link>
      <div className="">
        <ul>
          <li>
            <Link to="/properties">Properties</Link>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>

      <Link to="/sign-in">
        <button className=" cursor-pointer">Login</button>
      </Link>
    </header>
  );
}

export default Header;
