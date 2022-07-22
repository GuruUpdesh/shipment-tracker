import React, { useState, useEffect, useRef, useContext } from "react";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import HelpIcon from "../other/HelpIcon";
import { IoMdExit, IoIosMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { BsQuestionLg, BsGithub, BsArchiveFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import logout from "../../features/authentication/services/logout";
import useUser from "../../context/useUser";

const Settings = ({ settingsOpen, setSettingsOpen }) => {
	const navigate = useNavigate();

	const [playCloseAnimation, setPlayCloseAnimation] = useState(false);

	function closeSettingsMenu() {
		setPlayCloseAnimation(true);
		setTimeout(() => setSettingsOpen(false), 200);
	}

	const { theme, setTheme } = useContext(ThemeContext);
	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
		document.documentElement.setAttribute("data-theme", theme === "light" ? "dark" : "light");
	}

	useEffect(() => {
		setPlayCloseAnimation(!settingsOpen);
	}, [settingsOpen]);

	const settingsRef = useRef();
	useOnClickOutside(settingsRef, closeSettingsMenu);

	const {user, setUser} = useUser()
	return (
		<div className={"nav-settings " + (playCloseAnimation ? "nav-settings-close" : "")} ref={settingsRef}>
			<div className="content-wrapper">
				<div>
					<div className="settings-header">
						<div className="image-container">
							<h1>{localStorage.getItem("email") && localStorage.getItem("email")[0].toUpperCase()}</h1>
						</div>
						<div className="content-container">
							<h2>settings & help</h2>
							<p>{localStorage.getItem("email")}</p>
						</div>
					</div>
					<ul>
						<li>
							<button
								onClick={() => {
									navigate("/");
								}}
							>
								home <AiFillHome />
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									navigate("/archive");
								}}
							>
								archive <BsArchiveFill />
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									window.open("https://github.com/GuruUpdesh", "_blank").focus();
								}}
							>
								github <BsGithub />
							</button>
						</li>
						<li>
							<button>
								help <BsQuestionLg />
							</button>
						</li>
					</ul>
				</div>
				<div>
					<button
						className="logout"
						onClick={() => {
							logout(user, setUser)
							navigate("/login");
						}}
					>
						logout
						<IoMdExit />
					</button>
					<div className="theme-toggler">
						<div className="question">
							<HelpIcon
								message={"Change the website colors to be light or dark depending on your preferences."}
							/>
							<p>Color Scheme</p>
						</div>
						<div className="theme-buttons" onClick={toggleTheme}>
							<div
								className={"highlighter " + (theme === "light" ? " left-highlighter" : "right-highlighter")}
							></div>
							<button className={theme === "light" ? "active-theme" : ""} onClick={toggleTheme}>
								<IoSunny />
								light
							</button>
							<button className={theme === "dark" ? "active-theme" : ""} onClick={toggleTheme}>
								<IoIosMoon />
								dark
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
