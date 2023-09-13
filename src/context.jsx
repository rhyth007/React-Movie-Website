//context(warehouse)
//Provider (delivery)
//consumer // (useContext)(you)

import React, { useContext, useEffect, useState } from "react";

const API_KEY = `http://www.omdbapi.com/?apikey=e3150f0`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [movie, setMovie] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState({ show: "false", msg: "" });

	const [query, setQuery] = useState("Avengers");

	const getMovies = async (url) => {
		setIsLoading(true);
		try {
			const res = await fetch(url);
			const data = await res.json();
			console.log(data);

			if (data.Response === "True") {
				setIsLoading(false);
				setMovie(data.Search);
			} else {
				setIsError({
					show: true,
					msg: data.Error,
				});
			}
		} catch (err) {
			console.log("ERROR " + err);
		}
	};

	useEffect(() => {
		let timeout = setTimeout(() => {
			getMovies(`${API_KEY}&s=${query}`);
		},500);

		return () => clearTimeout(timeout);
	}, [query]);
	return (
		<AppContext.Provider value={{ isLoading, movie, isError, setQuery, query }}>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
