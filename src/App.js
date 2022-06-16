import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./Styles/styles.css"

function App() {
	return (
		<BrowserRouter>
				<Routes>
					<Route path='*' element={<NotFound />} />
					<Route path='/' element={<HomePage />} />
					<Route path='/packages' element={<MainPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
		</BrowserRouter>
	);
}

export default App;
