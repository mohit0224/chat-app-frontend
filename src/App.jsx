import React from "react";
import Dashboard from "./dashboard/Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { useData } from "./context/DataProvider";

const App = () => {
	const { userDetails } = useData();

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={userDetails ? <Dashboard /> : <Navigate to={"/login"} />}
				/>
				<Route
					path="/signup"
					element={!userDetails ? <Signup /> : <Navigate to={"/"} />}
				/>
				<Route
					path="/login"
					element={!userDetails ? <Login /> : <Navigate to={"/"} />}
				/>
			</Routes>
		</>
	);
};

export default App;
