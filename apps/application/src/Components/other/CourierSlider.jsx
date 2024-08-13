import React, { useState, useRef, useEffect, Fragment } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const CourierSlider = () => {
	const slides = [
		{
			title: "fedex",
			content: () => <div className="image" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/courier-images/fedex.png)`}} />,
		},
		{
			title: "dhl",
			content: () => <div className="image" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/courier-images/dhl.png)`}} />,
		},
		{
			title: "ups",
			content: () => <div className="image" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/courier-images/ups.png)`}} />,
		},
		{
			title: "usps",
			content: () => <div className="image" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/courier-images/usps.png)`}} />,
		},
	];

	const speed = 3000;

	const [stateSlides, setStateSlides] = useState(slides);

	useEffect(() => {
		const slideCopy = [...slides];
		for (let n = 0; n < 5; n++) {
			for (let i = 0; i < slides.length; i++) {
				slideCopy.push(slides[i]);
			}
		}

		setStateSlides(slideCopy);
	});

	return (
		<div className="courier-slider-container">
			<h3>supported couriers</h3>
			<div className="slider">
				{/* <div className="courier-images">
					<div className="slidesContainer">
						<div
							id="slides"
							className={`slides transition`}
						>
							{stateSlides.map((slide, index) => {
								return (
									<div key={index} className="slide">
										<div className="slideInner">{slide.content()}</div>
									</div>
								);
							})}
						</div>
					</div> */}
				<div className="courier-images">
					{stateSlides.map((slide, index) => {
						return <div key = {index}>{slide.content()}</div>;
					})}
				</div>
			</div>
		</div>
	);
};

export default CourierSlider;
