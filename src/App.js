import { useState, createContext, useEffect, useLayoutEffect, useRef } from "react";
import { HashRouter } from "react-router-dom";
import "./Styles/styles.css";
import ContextMenu from "./Components/other/ContextMenu";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import authenticate from "./util/authenticate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

function App() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
	const [user, setUser] = useState({});

	useLayoutEffect(() => {
		fetchUserInfo()
		async function fetchUserInfo() {
			const userInfo = {
				isMobile: /Mobi/i.test(window.navigator.userAgent),
				isAuth: await authenticate(),
			};
			
			if (!userInfo.isAuth) {
				localStorage.clear()
			}

			console.log(userInfo)
			setUser(userInfo);
		}
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
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const packagesRef = useRef()

	return (
		<HashRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<ThemeContext.Provider value={{ theme, setTheme }}>
					<ToastContainer position="bottom-center" closeOnClick draggable={false} toastId="test" />
					<ContextMenu />
					<AnimatedRoutes />
				</ThemeContext.Provider>
			</UserContext.Provider>
		</HashRouter>
	);
}

export default App;
