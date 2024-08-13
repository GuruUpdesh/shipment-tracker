import React, { useEffect } from "react";
import HomePage from "./HomePage";
import MainPage from "./MainPage";
import NotFound from "./NotFound";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ArchivePage from "./ArchivePage";
import TestPage from "./TestPage";
import { AnimatePresence } from "framer-motion";

import { Routes, Route, useLocation } from "react-router-dom";
import useAuthenticate from "../features/authentication/hooks/useAuthenticate";
import RequireAuthForRoutes from "../Components/Routes/RequireAuthForRoutes";

function AllRoutes() {
	const location = useLocation();

	useAuthenticate();

	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				{/* public routes */}
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />

				{/* protected routes */}
				<Route element={<RequireAuthForRoutes />}>
					<Route path="/packages" element={<MainPage />} />
					<Route path="/archive" element={<ArchivePage />} />
					<Route path="/test" element={<TestPage />} />
				</Route>
			</Routes>
		</AnimatePresence>
	);
}

export default AllRoutes;
