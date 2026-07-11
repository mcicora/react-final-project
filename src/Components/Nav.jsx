import React, { useState } from "react";
import "./Nav.css";
import movie__logo from "../../assets/movie_logo2.png";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }
  

  return (
    <div id='nav'>
      <div className="container nav__container">
        <div className="row">
          <div className="nav__logo--wrapper">
            <Link to="/"><img src={movie__logo} alt="Movie logo" className="nav__logo" /></Link>
          </div>
          <div className="nav__browse">
            <Link to="/" className="nav__title-link"><h1>Browse Our Movies</h1></Link>
            <div className="nav__input--wrapper">
              <input
                className="nav__input"
                type="text"
                placeholder="Search by Title"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                  }}
              />
              <button className="nav__content--search" onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass nav__content--img"></i>
              </button>
            </div>
          </div>
          <div className="nav__links">
            <Link to="/">Home</Link>
            <Link to="/search">Browse Movies</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
