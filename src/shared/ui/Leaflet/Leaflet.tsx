// @ts-nocheck
import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { makeUrl } from './helpers';
import mapMarker from './icons/marker.svg';
import './styles/leaflet.fullscreen.css';
import './styles/MarkerCluster.css';
import './styles/MarkerCluster.default.css';


export default class Leaflet extends Component {
	static propTypes = {
		mapId: PropTypes.string.isRequired,
		items: PropTypes.array.isRequired,
		icon: PropTypes.string,
		showPolygon: PropTypes.bool,
		className: PropTypes.string,
		style: PropTypes.object,
		useSlug: PropTypes.bool,
	};

	static defaultProps = {
		mapId: 'map',
		items: [],
		icon: 'marker',
		showPolygon: false,
		className: '',
		style: {
			height: 450,
		},
		useSlug: false,
	};

	constructor(props) {
		super(props);

		this.map = null;
		this.markerCluster = {};
	}

	makeIcon(type, src) {
		if (typeof window !== 'undefined') {
			const L = require('leaflet');
			const marker = new L.Icon({
				iconUrl: src || mapMarker,
				iconAnchor: [50, 70],
				iconSize: [100, 100],
				popupAnchor: [0, -70],
				className: 'custom-map__icon'
			});

			if (type === 'marker') {
				return marker;
			}
			return {};

		}
	}

	componentDidMount() {
		if (typeof window !== 'undefined') {
			const L = require('leaflet');
			require('./Fullscreen/Leaflet.fullscreen.min.js');

			const { items, icon, showPolygon } = this.props;

			if (!this.map) {
				this.map = L.map(this.mapComponent, {
					dragging: !isMobile,
					scrollWheelZoom: false,
					zoomControl: false,
				}).setView([55, 55], 13);

				L.control.zoom({ zoomInTitle: 'Увеличить', zoomOutTitle: 'Уменьшить' }).addTo(this.map);

				this.map.addControl(
					new L.Control.Fullscreen({
						title: {
							false: 'Полноэкранный режим',
							true: 'Выйти из полноэкранного режима',
						},
					})
				);

				this.makeMarkers(items, icon, showPolygon);
			}
		}
	}

	slugMaker(item) {
		const makeURI = {
			belltower: makeUrl.belltower(item),
			cathedral: makeUrl.cathedral(item),
			chapel: makeUrl.chapel(item),
			church: makeUrl.church(item),
			city: makeUrl.city(item),
			hermitage: makeUrl.hermitage(item),
			monastery: makeUrl.monastery(item),
			museum: makeUrl.museum(item),
			saint: makeUrl.saint(item),
			shrine: makeUrl.shrine(item),
			temple: makeUrl.temple(item),
			well: makeUrl.well(item),
		};

		return makeURI[item.type];
	}

	makeMarkers(items, icon, showPolygon) {
		const bounds = [];

		if (items && !!items.length) {
			const LC = require('leaflet.markercluster');

			this.markerCluster = new LC.MarkerClusterGroup();

			items.forEach((item, idx) => {
				let point = [];
				let polygon;
				if (get(item, 'location_object.features', []).length > 0) {
					point = item.location_object.features.filter(
						feature => get(feature, 'geometry.type', '') == 'Point'
					);
					if (showPolygon) {
						polygon = item.location_object.features.filter(
							feature => get(feature, 'geometry.type', '') == 'Polygon'
						);

						if (polygon && polygon[0]) {
							const polyCoordinates = polygon[0].geometry.coordinates[0].map(item => [item[1], item[0]]);
							if (polyCoordinates && polyCoordinates[0]) {
								const f = L.polygon([polyCoordinates]).addTo(this.map);
							}
						}
					}
				}

				if (point && point[0]) {
					const coordinates = point[0].geometry.coordinates;
					const title = item.title_full || item.title_short;

					const custom3dModel = get(item, 'settings.3dModel.src', '');
					let marker = {};

					if (custom3dModel) {
						marker = new L.Marker(
							new L.LatLng(coordinates[1], coordinates[0]), {
							icon: this.makeIcon(icon, custom3dModel),
						}
						);
					} else {
						marker = L.marker(new L.LatLng(coordinates[1], coordinates[0]));
					}

					const slug = this.slugMaker(item);

					marker.bindPopup(
						`<div class="${this.props.useSlug ? 'popup-img-wrapper' : ''
						}" id="popup-${slug}-${idx}" data-url="${slug}" style="color: #3f2512">
								<img class="map-preview-img" src="${get(item, 'settings.3dModel.src', '') || get(item, 'main_image.src', '')
						}" alt="${title}"/>
							<p>${title}</p>
						</div>`
					);
					this.markerCluster.addLayer(marker);

					bounds.push([coordinates[1], coordinates[0]]);
				}
			});
		}

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

		if (items && !!items.length) {
			this.map.addLayer(this.markerCluster);
		}

		if (this.props.useSlug) {
			this.map.addEventListener('popupopen', () => {
				document.querySelector('[id*=popup-]').addEventListener('click', this.myNavigate);
			});

			this.map.addEventListener('popupclose', () => {
				document.querySelector('[id*=popup-]').removeEventListener('click', this.myNavigate);
			});
		}

		if (bounds.length) { this.map.fitBounds(bounds); }
	}

	myNavigate(event) {
		// navigate(event.currentTarget.dataset["url"]);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { items, icon, showPolygon } = nextProps;

		if (nextProps.items.length !== this.props.items.length) {
			this.map.removeLayer(this.markerCluster);
			this.makeMarkers(items, icon, showPolygon, true);
		}
	}

	render() {
		const { className, style } = this.props;

		return (
			<div style={{ height: 650 }}>
				<div
					className={`custom-map ${className}`}
					ref={map => (this.mapComponent = map)}
					style={Object.assign({}, style, {
						width: '100%',
						height: '100%',
						zIndex: 0
					})}
				/>
			</div>
		);
	}
}

export const LeafletWithRouter = (props) => {
	const router = useRouter()

	return <Leaflet {...props} router={router} />
}
