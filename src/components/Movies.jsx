import React from "react";
import { useGlobalContext } from "../context";
import { NavLink } from "react-router-dom";

const Movies = () => {
	const { movie } = useGlobalContext();
	return (
		<section className="container movie-page">
			<div className="grid grid-4-col">
				{movie.map((currMovie) => {
					const { imdbID, Title, Poster } = currMovie;

                    const movieTitle = Title.substring(0,18);



					return (
						<NavLink to={`movie/${imdbID}`} key={imdbID}>
							<div className="card">
								<div className="card-info">
									<h2>{movieTitle.length>=18? `${movieTitle}...`:movieTitle}</h2>
									<img src={Poster} alt={imdbID} />
								</div>
							</div>
						</NavLink>
					);
				})}
			</div>
		</section>
	);
};

export default Movies;
