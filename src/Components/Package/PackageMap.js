import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import mapStyle from "../../Styles/Components/Package/mapStyle";

const containerStyle = {
	width: "auto",
	height: "120px",
};

function PackageMap({ center }) {
	const [style, setStyle] = useState(mapStyle);
	const options = {
		styles: style,
		disableDefaultUI: true,
	};

	// loaded?
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyCKa3w9Ee5Kyfdy8qeUX_j__6hsyqkpkXo",
	});

	// map state
	const [map, setMap] = React.useState(null);

	// once loaded setMap to loaded map
	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		setMap(map);
	}, []);

	// on unmount set map to null
	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);
	return isLoaded ? (
		<div className="maps-wrapper">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				options={options}
				onLoad={onLoad}
				onUnmount={onUnmount}
				clickableIcons={false}
			>
				{/* Child components, such as markers, info windows, etc. */}
				<></>
			</GoogleMap>
		</div>
	) : (
		<>LOADING</>
	);
}

export default React.memo(PackageMap);
