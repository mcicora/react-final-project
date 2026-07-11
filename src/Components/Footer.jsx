import React from "react";
import "./Footer.css";
import movie__logo from "../../assets/movie_logo2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer">
      <div className="container">
        <div className="row">
          <div className="footer__logo--wrapper">
            <img src={movie__logo} alt="Movie logo" className="footer__logo" />
          </div>
          <p className="footer__copyright">© 2026 Browse Our Movies</p>
          <div className="footer__links">
            <Link to="/">Home</Link>
            <Link to="/search">Browse Movies</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
