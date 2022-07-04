import React from "react";
import HomePage from "./HomePage";
import MainPage from "./MainPage";
import NotFound from "./NotFound";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ArchivePage from "./ArchivePage";
import TestPage from "./TestPage";
import { AnimatePresence } from "framer-motion";

import { Routes, Route, useLocation } from "react-router-dom";

function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/packages" element={<MainPage />} />
				<Route path="/archive" element={<ArchivePage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/test" element={<TestPage />} />
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoutes;
