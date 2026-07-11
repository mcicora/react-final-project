import React, { useEffect, useState } from "react";
import "./Details.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    axios
      .get(
        `https://www.omdbapi.com/?i=${encodeURIComponent(id)}&apikey=84448407`,
      )
      .then((res) => {
        if (res.data && res.data.Response === "True") {
          setMovie(res.data);
        } else {
          setMovie(null);
          setError(res.data.Error || "Movie Not Found");
        }
      })
      .catch((err) => {
        console.log("Details fetch error:", err);
        setError("Unable to load movie details");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div id="details">
      <div className="details__container">
        <div className="details__container--back">
          <button className="details__back" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
            Back
          </button>
        </div>
        <div className="row">
          <div className="details__poster--wrapper">
            <img className="details__poster" src={movie.Poster} alt="" />
          </div>
          <div className="details__movie--info">
            <div className="details__movie--title">
              <h1>
                {movie.Title} - {movie.Year}
              </h1>
            </div>
            <div className="details__movie--details">
              <h2 className="details__movie--detail">
                {" "}
                Plot Summary: <br /> <br /> {movie.Plot}
              </h2>
              <h2 className="details__movie--detail">Rating: {movie.Rating}</h2>
              <h2 className="details__movie--detail">
                Actors: <br /> {movie.Actors}
              </h2>
              <h2 className="details__movie--detail">
                Director: {movie.Director}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
