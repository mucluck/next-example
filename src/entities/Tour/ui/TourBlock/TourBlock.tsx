import { useEffect, useId, useState } from "react";

import { scriptLoader } from "@/shared/utils/scriptLoader";

const TourBlock = ({ settings }: { settings: any }) => {
	const id = useId();

	const [player, setPlayer] = useState(null);

	useEffect(() => {
		// First: Load player
		scriptLoader(`${settings.params?.base_path}pano2vr_player.js`, () => {
			// @ts-ignore
			if (typeof pano2vrPlayer !== "undefined") {
				// @ts-ignore
				setPlayer(new pano2vrPlayer(id));
			} else {
				throw new Error("pano2vrPlayer is undefined");
			}
		});
	}, []);

	useEffect(() => {
		// Second: Load skin
		const { params } = settings;

		scriptLoader(`${settings.params?.base_path}skin.js`, () => {
			// @ts-ignore
			if (typeof pano2vrSkin !== "undefined" && player) {
				// @ts-ignore
				new pano2vrSkin(player, params.base_path ?? "");

				try {
					// @ts-ignore
					player.readConfigUrl(params?.src ?? "");
					// @ts-ignore
					player.openNext(params?.init_hotspot ?? "");
				} catch {
					console.error("Error: pano.xml error");
				}
			}
		});

		scriptLoader(
			`${settings.params?.base_path}3rdparty/leaflet/leaflet.js`,
			() => {
				console.info("Leaflet loaded!");
			},
			() => {
				console.error("Leaflet is not loaded!");
			}
		);

		scriptLoader(
			`${settings.params?.base_path}webvr/three.min.js`,
			() => {
				console.info("Three.js loaded!");
			},
			() => {
				console.error("Three.js is not loaded!");
			}
		);

		scriptLoader(
			`${settings.params?.base_path}webvr/webvr-polyfill.min.js`,
			() => {
				console.info("webvr-polyfill loaded!");
			},
			() => {
				console.error("webvr-polyfill is not loaded!");
			}
		);
	}, [player]);

	return <div id={id} className={"tour-3d__container"} style={{ height: 500 }} />;
};

export default TourBlock;
