import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Error from "./components/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movie/:id" element={<MovieDetails/>} />
        <Route path="*" element={<Error/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
