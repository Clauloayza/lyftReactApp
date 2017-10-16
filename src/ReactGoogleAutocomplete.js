import React from 'react';

import PropTypes from 'prop-types';



export default  class ReactGoogleAutocomplete extends React.Component {
	static propTypes = {
		onPlaceSelected: PropTypes.func,
		types: PropTypes.array,
		componentRestrictions: PropTypes.object,
		bounds: PropTypes.object,
	}

	constructor(props) {
		super(props);
		this.autocomplete = null;

		console.log('Autocomplete');

	}
	componentDidMount() {
		const { types=['(cities)'], componentRestrictions, bounds, } = this.props;
		const config = {
			types,
			bounds,
		};

		if (componentRestrictions) {
			config.componentRestrictions = componentRestrictions;
		}
		console.log('window.google.maps', window.google.maps);
		console.log('window.google.maps.places', window.google.maps.places);

		this.autocomplete = new window.google.maps.places.Autocomplete(this.refs.input, config);

		this.autocomplete.addListener('place_changed', this.onSelected.bind(this));
	}

	onSelected() {
		if (this.props.onPlaceSelected) {
			this.props.onPlaceSelected(this.autocomplete.getPlace());
		}
	}

	render() {
		const {onPlaceSelected, types, componentRestrictions, bounds, ...rest} = this.props;

		return (
			<div>
				<input
					ref="input"
					{...rest}
				/>
			</div>
		);
	}
}