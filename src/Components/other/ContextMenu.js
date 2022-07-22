import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useContextMenu from "../../Hooks/useContextMenu";
import { AiOutlineReload } from "react-icons/ai";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { IoCopy, IoClose } from "react-icons/io5";
import { MdEdit, MdTab } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { RiWindowFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

// deprecated component for custom right click menu
const ContextMenu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { xPos, yPos, showMenu, func } = useContextMenu();

	const [style, setStyle] = useState({
		top: yPos,
		left: xPos,
	});

	const ref = useRef(null);
	let width = 0;
	let height = 0;

	useLayoutEffect(() => {
		if (ref.current) {
			width = ref.current.offsetWidth;
			height = ref.current.offsetHeight;
		}
	});

	useLayoutEffect(() => {
		let left = xPos;
		let top = yPos;
		if (xPos + width > window.innerWidth) {
			left = xPos - (xPos + width - window.innerWidth) - 8;
		}
		if (yPos + height > window.innerHeight + window.scrollY) {
			top = yPos - (yPos + height - window.innerHeight) + window.scrollY;
		}
		setStyle({
			top: top,
			left: left,
		});
	}, [xPos, yPos]);
	return showMenu ? (
		<>
			<div className="menu" key={(yPos, xPos)} style={style} ref={ref}>
				<ul>
					{(document.activeElement.className.toString().includes("nav-btn") ||
						document.activeElement.className.toString().includes("card-btn")) && (
						<>
							<li
								onClick={() => {
									window.open(func.link);
								}}
							>
								<MdTab />
								open link in new tab
							</li>
							<li
								onClick={() => {
									window.open(
										func.link,
										"",
										`width=${window.screen.width}, height=${window.screen.height}`
									);
								}}
							>
								<RiWindowFill />
								open link in new window
							</li>
						</>
					)}

					<li onClick={() => navigate(-1)} className="line">
						backward
						<IoMdArrowBack />
					</li>
					<li onClick={() => navigate(1)}>
						forward
						<IoMdArrowForward />
					</li>
					<li
						onClick={() => {
							window.location.reload();
						}}
					>
						reload
						<AiOutlineReload />
					</li>
					<li
						className={"line "}
						onMouseDown={() => {
							document.execCommand("copy");
						}}
					>
						copy
						<IoCopy />
					</li>
					{document.activeElement.type === "text" && (
						<li className="disabled">
							paste <span>(Ctrl + V)</span>
						</li>
					)}
					{(location.pathname === "/packages" || location.pathname === "/archive") && (
						<>
							<li className="line">
								add
								<HiPlus />
							</li>
							<li>
								edit <MdEdit />
							</li>
							<li>archive</li>
							<li>delete </li>
						</>
					)}
				</ul>
			</div>
		</>
	) : (
		<></>
	);
};

export default ContextMenu;
