import React from 'react';

const loadMaps = (cb) => {
	// window.google.maps script loading garbage
	const KEY = 'AIzaSyCsIUMjCPmZCK_CrP-7mTXPBQRZMNeYaU4'
	const URL = `https://maps.googleapis.com/maps/api/js?key=${KEY}&callback=_mapsLoaded&libraries=places`
	window._mapsLoaded = cb
	const script = document.createElement('script')
	script.src = URL
	document.body.appendChild(script)

}


 class GoogleMaps extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			markers: []
		};
		this.autocompleteDestino = null;
	}

	componentWillMount() {
		if (!window.google) {
			loadMaps(() => {
				this.forceUpdate();
				console.log ('_mapsLoaded', window.google);
			})
		}
	}

	componentDidMount() {
		const { properties, activeProperty } = this.props;
		const { latitude, longitude } = activeProperty;

		this.map = new window.google.maps.Map(this.refs.map, {
			//center: { lat: latitude, lng: longitude },
			//center: {lat:-16.1191427,lng: -71.0349046},
			zoom: 15,
			mapTypeControl: false
		});

		this.directionsService = new window.google.maps.DirectionsService;
		this.directionsDisplay = new window.google.maps.DirectionsRenderer;
		this.directionsDisplay.setMap(this.map);

		this.createMarkers(properties);
		this.findMe();
	}


	findMe( ) {
		if(window.navigator.geolocation){
			window.navigator.geolocation.getCurrentPosition((posicion) => {

				const latitud = posicion.coords.latitude;
				const longitud = posicion.coords.longitude;

				this.sourceMarker.setPosition(new window.google.maps.LatLng(latitud, longitud));
				this.map.setCenter({lat:latitud,lng:longitud});
				this.map.setZoom(17);


				let geocoder = new window.google.maps.Geocoder();
				geocoder.geocode({'latLng': this.sourceMarker.getPosition()},  (results, status) => {
					if (status == window.google.maps.GeocoderStatus.OK) {

						//lyft.origin=results[0]['formatted_address'];

						this.sourceMarker.iw.setContent ('<div><strong>'+ results[0]['formatted_address'] +'</strong><br>')

						this.sourceMarker.iw.open( this.map, this.sourceMarker);

						//lyft.detailOrigin.setContent('<div><strong>'+lyft.origin+'</strong><br>');


					}
				});

			},  function(error) {
				alert("Tenemos un problema para encontrar tu ubicación");
			});
		}
	}

	findTargetPlace (place) {

		this.marcarUbicacion(place, this.targetMarker.iw, this.targetMarker);
	}

	marcarUbicacion(place, detalleUbicacion, marker) {
		if (!place.geometry) {
			// Error si no encuentra el lugar indicado
			window.alert("No encontramos el lugar que indicaste: '" + place.name + "'");
			return;
		}
		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) {
			this.map.fitBounds(place.geometry.viewport);
		} else {
			this.map.setCenter(place.geometry.location);
			this.map.setZoom(17);
		}

		marker.setPosition(place.geometry.location);
		marker.setVisible(true);

		var address = '';
		if (place.address_components) {
			address = [
				(place.address_components[0] && place.address_components[0].short_name || ''),
				(place.address_components[1] && place.address_components[1].short_name || ''),
				(place.address_components[2] && place.address_components[2].short_name || '')
			].join(' ');
		}

		detalleUbicacion.setContent('<div><strong>' + place.name + '</strong><br>' + address);
		detalleUbicacion.open( this.map, marker);
	}



	showInfoWindow(index) {
		const { markers } = this.state;
		markers[index] && markers[index].iw.open(this.map, markers[index]);
	}

	componentWillReceiveProps(nextProps) {
		const { activeProperty, filteredProperties, isFiltering } = nextProps;
		const { index } = activeProperty;

		// Hide all the other info boxes
		this.hideAll();

		// SHow info window of new active property
		if (isFiltering && filteredProperties.length === 0) {
			this.hideAll();
		} else {
			this.hideAll();
			this.showInfoWindow(index);
		}
	}

	componentDidUpdate() {
		const { filteredProperties, isFiltering, isRouting } = this.props;
		const { markers } = this.state;

		if (markers) {
			markers.forEach((marker) => {
				const { property } = marker; // Return associated property
				if (property){
					if (isFiltering) {
						// show markers of filtered properties and hide other markers
						if (filteredProperties.includes(property)) {
							markers[property.index].setVisible(true);
						} else {
							// Hide all the other markers
							markers[property.index].setVisible(false);
						}
					} else {
						// show all markers
						markers[property.index].setVisible(true);
					}
				}
			});
		}
		if (isRouting) {
			console.log ('this.sourceMarker', this.sourceMarker.getPosition());
			console.log ('this.targetMarker', this.targetMarker.getPosition());

			this.drawPath(this.directionsService, this.directionsDisplay, this.sourceMarker.getPosition(), this.targetMarker.getPosition());
		}
	}

	drawPath(directionsService, directionsDisplay, origin, destination) {
		if(destination != "" && origin != "") {
			directionsService.route({
					origin: origin,
					destination: destination,
					travelMode: "DRIVING"
				},
				function(response, status) {
					if (status === "OK") {
						directionsDisplay.setDirections(response);
					} else {
						alert("No ingresaste un origen y un destino validos");
					}
				});
		}
	}

	createMarkers(properties) {
		const { setActiveProperty, activeProperty } = this.props;
		const activePropertyIndex = activeProperty.index;
		const { markers } = this.state;

		const createMarker = (property) => {
			const { latitude, longitude, index, address } = property;
			const iw = new window.google.maps.InfoWindow( {});

			let icono = {
				url: 'https://image.flaticon.com/icons/png/128/75/75780.png',
				size: new window.google.maps.Size(71, 71),
				origin: new window.google.maps.Point(0, 0),
				anchor: new window.google.maps.Point(17, 34),
				scaledSize: new window.google.maps.Size(35, 35)
			};

			this.marker = new window.google.maps.Marker({
				map: this.map,
				label: {
					color: '#0F0',
					text: `${index + 1}`,
				},
				icon:  icono,
				animation: window.google.maps.Animation.DROP,
				anchorPoint: new window.google.maps.Point(0, -29)
			});

			this.marker.iw = iw;

			this.marker.addListener('click', () => {
				// Hide all markers
				this.hideAll();
				// Set active property, scroll to active property in list
				setActiveProperty(property, true);
			});

			// Push marker on to state
			markers.push(this.marker);

			//this.showInfoWindow(activePropertyIndex);
			return this.marker;
		};

		this.sourceMarker = createMarker(properties[0]);
		this.targetMarker = createMarker(properties[1]);
	}

	hideAll() {
		const { markers } = this.state;

		markers.forEach((marker) => {
			marker.iw.close();
		});
	}

	render() {
		if (this.props.model.targetPlace) {
			this.findTargetPlace(this.props.model.targetPlace);
		}
		return (
			<div className="mapContainer">
				<div id="map" ref="map"></div>

			</div>
		);
	}
}

export default GoogleMaps;
