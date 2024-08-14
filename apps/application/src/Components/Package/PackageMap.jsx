import React, { useState, useEffect, useRef, useContext } from "react";
import { GoogleMap, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { ThemeContext } from "../../App";
import mapStyle from "../../Styles/Components/Package/mapStyle";
import mapStylesDark from "../../Styles/Components/Package/mapStylesDark";
import axios from "axios";
import { Bezier } from "bezier-js";

const containerStyle = {
	width: "auto",
	height: "120px",
};

function PackageMap({ center, drawLines, zoom, transitHistory }) {
	const [style, setStyle] = useState(mapStyle);
	const { theme } = useContext(ThemeContext);
	useEffect(() => {
		if (theme === "light") {
			setStyle(mapStyle);
		} else {
			setStyle(mapStylesDark);
		}
	}, [theme]);

	const options = {
		styles: style,
		disableDefaultUI: true,
		tabIndex: -1,
	};
	const [path, setPath] = useState([]);
	const createPath = async () => {
		const path = [];
		if (!drawLines) {
			return;
		}
		for (let i = 0; i < transitHistory.length; i++) {
			let cur = transitHistory[i].location;
			const location = cur.city + " " + cur.state + " " + cur.state;
			const latLngData = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${location}}&key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}`
			);
			const latLng = {};

			// if the response status is OK return the lat and lng
			if (latLngData.data.status === "OK") {
				latLng.lat = latLngData.data.results[0].geometry.location.lat;
				latLng.lng = latLngData.data.results[0].geometry.location.lng;
			} else {
				return;
			}

			path.push(latLng);
		}

		// setPath(path);
		const curvedPath = [];
		for (let i = 0; i < path.length - 1; i++) {
			const latLngStart = path[i];
			const latLngEnd = path[i + 1];
			plot_curve(
				latLngStart.lat,
				latLngStart.lng,
				latLngEnd.lat,
				latLngEnd.lng
			);
		}

		function plot_curve(x1, y1, x2, y2) {
			const ang1 = 0.52;
			const ang2 = 0.5;
			const len = Math.hypot(x2 - x1, y2 - y1);
			const midPoint = { lat: (x1 + x2) / 2, lng: (y1 + y2) / 2 };
			const ax1 = Math.cos(ang1) * len * (1 / 3);
			const ay2 = Math.sin(ang2) * len * (1 / 3);

			const curve = new Bezier(
				{ x: x1, y: y1 },
				{ x: midPoint.lat + ax1, y: midPoint.lng + ay2 },
				{ x: x2, y: y2 }
			).getLUT(100);
			for (let i = 0; i < curve.length; i++) {
				delete Object.assign(curve[i], { ["lat"]: curve[i]["x"] })["x"];
				delete Object.assign(curve[i], { ["lng"]: curve[i]["y"] })["y"];
				curvedPath.push(curve[i]);
			}
		}

		setPath(curvedPath);
	};

	useEffect(() => {
		createPath();
	}, []);

	// loaded?
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	// map state
	const [map, setMap] = React.useState(null);

	// once loaded setMap to loaded map
	const onLoad = React.useCallback(function callback(map) {
		setMap(map);
	}, []);

	// on unmount set map to null
	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	const pathCoordinates = [
		center,
		{ lat: 36.2169884797185, lng: -112.056727493181 },
		{ lat: 41.881832, lng: -87.623177 },
	];

	return isLoaded ? (
		<div className="maps-wrapper">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={zoom}
				options={options}
				onLoad={onLoad}
				onUnmount={onUnmount}
				clickableIcons={false}
				keyboardShortcuts={false}
			>
				{/* Child components, such as markers, info windows, etc. */}
				{drawLines && (
					<Polyline
						path={path}
						geodesic={true}
						options={{
							strokeColor: "#20CD70",
							strokeOpacity: 0.75,
							strokeWeight: 2,
						}}
					/>
				)}
			</GoogleMap>
		</div>
	) : (
		<div className="maps-placeholder"></div>
	);
}

export default React.memo(PackageMap);
