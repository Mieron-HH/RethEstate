"use client";

import { useEffect, useMemo, useRef } from "react";
import "./_map.scss";
import { motion } from "framer-motion";
import { Loader } from "@googlemaps/js-api-loader";

// ANIMATIONS
import { mapAnim } from "@/libs/animations";

const Map = () => {
	const mapRef = useRef(null);

	useEffect(() => {
		const loader = new Loader({
			apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
			version: "weekly",
			libraries: ["places"],
		});

		loader
			.load()
			.then(async () => {
				const { Map } = (await google.maps.importLibrary(
					"maps"
				)) as google.maps.MapsLibrary;

				const map = new Map(mapRef.current! as HTMLElement, {
					center: { lat: 40.7505, lng: -73.9934 },
					zoom: 13,
				});

				const geocoder = new window.google.maps.Geocoder();
				geocoder.geocode(
					{ address: "2004 Kennedy Av, Baltimore, MD" },
					(results, status) => {
						if (status === "OK" && results && results[0]) {
							const location = results[0].geometry.location;
							map.setCenter(location);
							new window.google.maps.Marker({
								map,
								position: location,
							});
						}
					}
				);
			})
			.catch((e) => {
				// do something
			});
	}, []);

	return (
		<motion.div
			ref={mapRef}
			className="map__component"
			variants={mapAnim}
			initial="hidden"
			animate="show"
			viewport={{ once: true }}
		></motion.div>
	);
};

export default Map;
