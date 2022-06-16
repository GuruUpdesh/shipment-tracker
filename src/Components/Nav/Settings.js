import React, { useState, useEffect, useRef } from "react";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import HelpIcon from "../other/HelpIcon";
import { IoMdExit, IoIosMoon } from "react-icons/io";
import { RiShareForwardFill } from "react-icons/ri";
import { IoSunny } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { BsQuestionLg, BsGithub, BsArchiveFill  } from "react-icons/bs";
import {AiFillHome} from "react-icons/ai"
import { useNavigate } from "react-router-dom";

const Settings = ({ settingsOpen, setSettingsOpen }) => {
	const navigate = useNavigate()

	const [playCloseAnimation, setPlayCloseAnimation] = useState(false);

	function closeSettingsMenu() {
		setPlayCloseAnimation(true);
		setTimeout(() => setSettingsOpen(false), 200);
	}

	const [theme, setTheme] = useState("light");
	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	useEffect(() => {
		setPlayCloseAnimation(!settingsOpen);
	}, [settingsOpen]);

	const settingsRef = useRef();
	useOnClickOutside(settingsRef, closeSettingsMenu);
	return (
		<div
			className={"nav-settings " + (playCloseAnimation ? "nav-settings-close" : "")}
			ref={settingsRef}>
			<div>
				<div className='settings-header'>
					<div className='image-container'></div>
					<div className='content-container'>
						<h2>settings & help</h2>
						<p>guruupdeshsingh@gmail.com</p>
					</div>
				</div>
				<ul>
					<li>
						<button onClick={() => {navigate('/')}}>
							home <AiFillHome />
						</button>
					</li>
					<li>
						<button>
							archive <BsArchiveFill />
						</button>
					</li>
					<li>
						<button>
							contact <MdPeopleAlt />
						</button>
					</li>
					<li>
						<button>
							github <BsGithub />
						</button>
					</li>
					<li>
						<button>
							share <RiShareForwardFill />
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
				<button className='logout'onClick={() => {navigate('/login')}} >
					logout
					<IoMdExit />
				</button>
				<div className='theme-toggler'>
					<div className='question'>
						<HelpIcon
							message={
								"Change the website colors to be light or dark depending on your preferences."
							}
						/>
						<p>Color Scheme</p>
					</div>
					<div className='theme-buttons'>
						<div
							className={
								"highlighter " +
								(theme === "light" ? " left-highlighter" : "right-highlighter")
							}></div>
						<button
							className={theme === "light" ? "active-theme" : ""}
							onClick={toggleTheme}>
							<IoSunny />
							light
						</button>
						<button
							className={theme === "dark" ? "active-theme" : ""}
							onClick={toggleTheme}>
							<IoIosMoon />
							dark
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
