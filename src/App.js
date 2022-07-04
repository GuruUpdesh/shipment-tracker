import { useState, createContext, useEffect, useLayoutEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./Styles/styles.css";
import ContextMenu from "./Components/other/ContextMenu";
import AnimatedRoutes from "./pages/AnimatedRoutes";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

function App() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
	const [user, setUser] = useState({});

	useLayoutEffect(() => {
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches &&
			localStorage.getItem("theme") !== "light"
		) {
			setTheme("dark");
		}
		setUser({
			isMobile: /Mobi/i.test(window.navigator.userAgent),
		});
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<ThemeContext.Provider value={{ theme, setTheme }}>
					<ContextMenu />
					<AnimatedRoutes />
				</ThemeContext.Provider>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
