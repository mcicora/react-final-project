import React from "react";
import "./Home.css";
import banner from "../../assets/movie_banner.png";
import HpTiles from "../Components/HpTiles";

const Home = () => {
  return (
    <div id="home">
      <div className="container">
        <div className="row home__row">
          <div className="home__main">
            <div className="home__banner--wrapper">
              <img src={banner} alt="" />
            </div>
            <div className="home__main--description">
              <h1>
                Movie night should be exciting—not stressful. Browse our collection of movies, search by title or genre, and discover top-rated films, hidden gems, and timeless classics. Whether you're planning a family movie night or looking for something new to watch, we'll help you find the perfect pick in just a few clicks.
              </h1>
            </div>
          </div>
          <HpTiles />
        </div>
      </div>
    </div>
  );
};

export default Home;
