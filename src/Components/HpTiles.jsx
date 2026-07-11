import React, { useEffect, useState } from "react";
import "./HpTiles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const HpTiles = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genreMovies, setGenreMovies] = useState({
    Action: [],
    Romance: [],
    Horror: [],
    Comedy: [],
  });

  const genres = [
    {
      name: "Action",
      searchTerm: "avengers",
    },
    {
      name: "Romance",
      searchTerm: "romance",
    },
    {
      name: "Horror",
      searchTerm: "horror",
    },
    {
      name: "Comedy",
      searchTerm: "comedy",
    },
  ];

  useEffect(() => {
    const fetchGenreRows = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = "84448407";
        const rows = {};

        for (const genre of genres) {
          const searchResponse = await axios.get(
            `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
              genre.searchTerm,
            )}&type=movie`,
          );

          const searchResults = searchResponse.data.Search || [];

          const detailRequests = searchResults
            .slice(0, 6)
            .map((movie) =>
              axios.get(
                `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`,
              ),
            );

          const detailResponses = await Promise.all(detailRequests);

          const detailedMovies = detailResponses
            .map((response) => response.data)
            .filter((movie) =>
              movie.Genre?.toLowerCase().includes(genre.name.toLowerCase()),
            );

          rows[genre.name] = detailedMovies;
        }

        setGenreMovies(rows);
      } catch (err) {
        console.log("Genre fetch error:", err);
        setError("Unable to load movie categories");
      } finally {
        setLoading(false);
      }
    };

    fetchGenreRows();
  }, []);

  if (loading) {
    return (
      <div className="hp-tiles">
        {["Action", "Romance", "Horror", "Comedy"].map((genre) => (
          <section className="hp-tiles__section" key={genre}>
            <h2>{genre}</h2>

            <div className="hp-tiles__row">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  className="hp-tiles__card hp-tiles__card--loading"
                  key={item}
                >
                  <div className="hp-tiles__poster-skeleton"></div>
                  <div className="hp-tiles__title-skeleton"></div>
                  <div className="hp-tiles__year-skeleton"></div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
    }

  return (
    <div className="hp-tiles">
      {Object.entries(genreMovies).map(([genre, movies]) => (
        <section className="hp-tiles__section" key={genre}>
          <h2>{genre}</h2>

          <div className="hp-tiles__row">
            {movies.map((movie) => (
              <Link to={`/details/${movie.imdbID}`} key={movie.imdbID}>
                <div className="hp-tiles__card">
                  <div className="hp-tiles__img--wrapper">
                    <img
                      src={
                        movie.Poster !== "N/A" ? movie.Poster : "N/A"
                      }
                      alt={movie.Title}
                    />
                    <div className="hp-tiles__overlay">
                      <p>Click for More Details</p>
                    </div>
                  </div>
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default HpTiles;
