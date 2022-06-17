import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Polyline, useJsApiLoader } from "@react-google-maps/api";
import mapStyle from "../../Styles/Components/Package/mapStyle";
import axios from "axios";

const containerStyle = {
	width: "auto",
	height: "120px",
};

function PackageMap({ center, drawLines, zoom, transitHistory }) {
	const [style, setStyle] = useState(mapStyle);
	const options = {
		styles: style,
		disableDefaultUI: true,
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
				`https://maps.googleapis.com/maps/api/geocode/json?address=${location}}&key=AIzaSyCKa3w9Ee5Kyfdy8qeUX_j__6hsyqkpkXo`
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
		setPath(path)
	};
	
	useEffect(() => {
		createPath()
	}, []);
	
	// loaded?
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyCKa3w9Ee5Kyfdy8qeUX_j__6hsyqkpkXo",
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

	const pathCoordinates = [center, { lat: 36.2169884797185, lng: -112.056727493181 }, { lat: 41.881832, lng: -87.623177 }];

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
		<>LOADING</>
	);
}

export default React.memo(PackageMap);
