import { useState, createContext, useEffect, useLayoutEffect, useRef } from "react";
import { HashRouter } from "react-router-dom";
import "./Styles/styles.scss";
import Routes from "./pages/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

function App() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
	const [user, setUser] = useState({
		isMobile: /Mobi/i.test(window.navigator.userAgent),
		isAuth: localStorage.getItem("jwtToken") ? true : false,
	});

	useLayoutEffect(() => {
		// theme check
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches &&
			localStorage.getItem("theme") !== "light"
		) {
			setTheme("dark");
		}
	}, []);

	useEffect(() => {
		console.log(user);
	}, [user]);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const packagesRef = useRef();

	return (
		<HashRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<ThemeContext.Provider value={{ theme, setTheme }}>
					<ToastContainer position="bottom-center" closeOnClick draggable={false} toastId="test" />
					<Routes />
				</ThemeContext.Provider>
			</UserContext.Provider>
		</HashRouter>
	);
}

export default App;
