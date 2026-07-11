// api key = 84448407
//api =  http://www.omdbapi.com/?i=tt3896198&apikey=84448407&s

import React, { useEffect, useState } from "react";
import "./Search.css";
import sheep_poster from "../../assets/the_sheep_detectives_poster.png";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "movies";
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate()

  let sortedMovies = [...movies];

  if (sortOrder === "A_TO_Z") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortOrder === "Z_TO_A") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (sortOrder === "NEWEST_TO_OLDEST") {
    sortedMovies.sort((a, b) => parseInt(b.Year, 10) - parseInt(a.Year, 10));
  } else if (sortOrder === "OLDEST_TO_NEWEST") {
    sortedMovies.sort((a, b) => parseInt(a.Year, 10) - parseInt(b.Year, 10));
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=84448407&s=${encodeURIComponent(query)}`,
        );

        const moviesArray = response.data.Search || [];
        setMovies(moviesArray.slice(0, 6));
      } catch (err) {
        console.log("Search fetch error:", err);
        setError("Unable to load movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div id="search">
      <div className="search__bar">
        <div className="search__info--right-side">
          <button className="details__back" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
            Back
          </button>
          <h1 className="search__info">Search Results:</h1>
        </div>
        <div className="search__content--info">
          <select
            id="filter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="A_TO_Z">A to Z</option>
            <option value="Z_TO_A">Z to A</option>
            <option value="NEWEST_TO_OLDEST">Newest to Oldest</option>
            <option value="OLDEST_TO_NEWEST">Oldest to Newest</option>
          </select>
        </div>
      </div>

      <div id="movies">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((item) => (
              <div className="movie movie--skeleton" key={item}>
                <div className="movie__img--wrapper">
                  <div className="movie__poster-skeleton"></div>
                </div>
                <div className="movie__title-skeleton"></div>
                <div className="movie__year-skeleton"></div>
              </div>
            ))
          : sortedMovies.map((movie) => (
              <Link to={`/details/${movie.imdbID}`} key={movie.imdbID}>
                <div className="movie">
                  <div className="movie__img--wrapper">
                    <img className="movie__img" src={movie.Poster} alt="" />
                    <div className="movie__overlay">
                      <p>Click for More Details</p>
                    </div>
                  </div>
                  <h3 className="movie__title">{movie.Title}</h3>
                  <p className="movie__year">{movie.Year}</p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Search;
