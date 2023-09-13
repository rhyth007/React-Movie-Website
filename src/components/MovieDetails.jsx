import { NavLink, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useState, useEffect } from "react";

const API_KEY = `https://www.omdbapi.com/?apikey=e3150f0`;

const MovieDetails = () => {
	const { id } = useParams();
	console.log(id);

	//const { isLoading, movie, isError } = useGlobalContext();

	const [movie, setMovie] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const getMovies = async (url) => {
		setIsLoading(true);
		try {
			const res = await fetch(url);
			const data = await res.json();
			console.log(data);

			if (data.Response === "True") {
				setIsLoading(false);
				setMovie(data);
			}
		} catch (err) {
			console.log("ERROR " + err);
		}
	};

	useEffect(() => {
		let timeout = setTimeout(() => {
			getMovies(`${API_KEY}&i=${id}`);
		}, 500);

		return () => clearTimeout(timeout);
	}, [id]);

	console.log(movie);

	if (isLoading) {
		return (
			<section className="movie-section ">
				<div className="loading">Loading....</div>;
			</section>
		);
	}

	return (
		<section className="movie-section">
			<div className="movie-card">
				<figure>
					<img src={movie.Poster} alt="" />
				</figure>
				<div className="card-content">
					<p className="title">{movie.Title}</p>
					<p className=""></p>
					<p className="card-text">{movie.Released}</p>
					<p className="card-text">{movie.Genre}</p>
					<p className="card-text">{movie.imdbRating} / 10</p>
					<p className="card-text">{movie.Country}</p>
					<NavLink to="/" className="back-btn">
						Go Back
					</NavLink>
				</div>
			</div>
		</section>
	);
};

export default MovieDetails;
