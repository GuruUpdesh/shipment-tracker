import {
	useState,
	createContext,
	useEffect,
	useLayoutEffect,
	useRef,
} from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./Styles/styles.scss";
import Routes from "./pages/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

function App() {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
	);
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
		getIsAuthCookie();
		async function getIsAuthCookie() {
			await fetch(
				`${import.meta.env.VITE_REACT_APP_API_URL}/api/is-auth`,
				{
					credentials: "include",
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
					},
					
				}
			);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const packagesRef = useRef();

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<ThemeContext.Provider value={{ theme, setTheme }}>
					<ToastContainer
						position="bottom-center"
						closeOnClick
						draggable={false}
						toastId="test"
					/>
					<Routes />
				</ThemeContext.Provider>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
