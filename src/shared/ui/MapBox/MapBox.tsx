// @ts-nocheck
import { useRef, useEffect } from "react";
import { Box, Paper } from "@mantine/core";
import mapboxgl from "mapbox-gl";

import config from "@/shared/config";

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = config.mapBoxAccessToken;

const MapBox = ({ height = 700, geoJSON = {}, center = [43.23060999999995, 55.03994251711408] }: any) => {
	const map = useRef(null);
	const mapContainer = useRef(null);

	useEffect(() => {
		if (map.current) return; // initialize map only once

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mucluck/clq2qa62v00dx01qs4q78gowa",
			// style: 'mapbox://styles/mapbox/outdoors-v12',
			center,
			zoom: 13,
			dragPan: false
		});

		map.current.on("load", () => {
			map.current.addSource("geo-json-p", {
				type: "geojson",
				data: geoJSON,
				cluster: true,
				clusterMaxZoom: 13,
				clusterRadius: 60,
			});

			map.current.addSource("geo-json", {
				type: "geojson",
				data: geoJSON,
			});

			map.current.addLayer({
				id: "polygons",
				type: "fill",
				source: "geo-json",
				paint: {
					"fill-color": "#3f2512",
					"fill-opacity": 0.2,
					"fill-outline-color": "rgba(0, 0, 0, 1)",
				},
				filter: ["==", "$type", "Polygon"],
			});

			map.current.addLayer({
				id: "points",
				type: "symbol",
				source: "geo-json-p",
				layout: {
					"icon-size": 1,
					"icon-image": "pin-filled",
					"icon-anchor": "bottom",
					"text-field": ["get", "title"],
					"text-offset": [0, 0.25],
					"text-anchor": "bottom",
					"text-size": 12,
					"text-variable-anchor": ["top"],
					// "icon-allow-overlap": true,
				},
				paint: {
					"text-color": "#3F2512",
					"text-halo-color": "#FFF",
					"text-halo-width": 1,
				},
				filter: ["all", ["==", "$type", "Point"]],
			});
			[
				{
					type: "mouseenter",
					callback: (event) => {
						map.current.getCanvas().style.cursor = "pointer";
					},
				},
				{
					type: "mouseleave",
					callback: () => {
						map.current.getCanvas().style.cursor = "";
					},
				},
			].forEach(({ type, callback }) => {
				map.current.on(type, "points", (event) => callback(event));
			});
			map.current.on("click", "points", (e) => {
				const coordinates = e.features[0].geometry.coordinates.slice();
				const features = map.current.queryRenderedFeatures(e.point, {
					layers: ["points"],
				});
				const title = e.features[0].properties.title;
				const image = e.features[0].properties.image;

				new mapboxgl.Popup({ offset: 20 })
					.setLngLat(coordinates)
					.setHTML(
						`
						<div>
							<div style="margin: 0; margin-bottom: 8px; font-size:12px; color: #3F2512; line-height: 14px; font-weight: 600; padding-right: 16px;">
								${title}
							</div>
							${!!image ? (
							`
										<div style="border-radius: 4px; overflow: hidden; min-width: 220px; height: 135px; ">
											<img alt="${title}" src="${image}" style="width: 100%; height: 100%; object-fit: cover;" />
										</div>
									`
						) : ""}
						</div >
	`
					)
					.addTo(map.current);

				console.log({ features });
				// const clusterId = features[0].properties.cluster_id;

				// map.current.getSource('geo-json-p').getClusterExpansionZoom(
				// 	clusterId,
				// 	(err, zoom) => {
				// 		if (err) return;

				// 		map.current.easeTo({
				// 			center: features[0].geometry.coordinates,
				// 			zoom
				// 		});
				// 	}
				// );
			});
			map.current.addLayer({
				id: "clusters",
				type: "circle",
				source: "geo-json-p",
				filter: ["has", "point_count"],
				paint: {
					// Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
					// with three steps to implement three types of circles:
					//   * Blue, 20px circles when point count is less than 100
					//   * Yellow, 30px circles when point count is between 100 and 750
					//   * Pink, 40px circles when point count is greater than or equal to 750
					"circle-color": ["step", ["get", "point_count"], "#C5873E", 10, "#988346", 20, "#3F2512"],
					"circle-radius": ["step", ["get", "point_count"], 15, 10, 25, 20, 35],
					"circle-stroke-width": 1,
					"circle-stroke-color": "#ffffff",
				},
			});
			map.current.addLayer({
				id: "cluster-count",
				type: "symbol",
				source: "geo-json-p",
				filter: ["has", "point_count"],
				layout: {
					"text-field": ["get", "point_count_abbreviated"],
					"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
					"text-size": 12,
				},
				paint: {
					"text-color": "#ffffff",
				},
			});
			map.current.on("mouseenter", "clusters", () => {
				map.current.getCanvas().style.cursor = "pointer";
			});
			map.current.on("mouseleave", "clusters", () => {
				map.current.getCanvas().style.cursor = "";
			});
			map.current.on("click", "clusters", (e) => {
				const features = map.current.queryRenderedFeatures(e.point, {
					layers: ["clusters"],
				});
				const clusterId = features[0].properties.cluster_id;

				map.current.getSource("geo-json-p").getClusterExpansionZoom(clusterId, (err, zoom) => {
					if (err) return;

					map.current.easeTo({
						center: features[0].geometry.coordinates,
						zoom,
					});
				});
			});
			map.current.addControl(new mapboxgl.NavigationControl());
			map.current.scrollZoom.disable();
			map.current.touchZoomRotate.enable();
			// map.current.fitBounds();
		});

		return () => {
			map.current.remove();
			map.current = null;
		};
	});

	return (
		<>
			<Paper sx={() => ({ overflow: "hidden" })}>
				<Box
					ref={mapContainer}
					sx={(theme) => ({
						height,
						// [theme.fn?.smallerThan("md")]: {
						// 	height: 450,
						// },
					})}
				/>
			</Paper>

			<style>
				{
					`
					.mapboxgl-popup-content {
						box-shadow: 1px 1px 3px #C5873E;
						padding: 8px;
						border-radius: 4px;
					}
					.mapboxgl-popup-close-button {
						font-size: 16px;
					}
				`
				}
			</style>
		</>
	);
};

export default MapBox;
