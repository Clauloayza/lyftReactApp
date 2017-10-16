import React, {Component} from 'react';
import GoogleMaps from './GoogleMaps';
import ReactGoogleAutocomplete from './ReactGoogleAutocomplete';
 import {
	BrowserRouter,
	Route,
	Switch,
	NavLink,
	Redirect
} from 'react-router-dom'

class Header extends Component{
	constructor(props){
		super(props);
		this.state={
			show:false
		}
	}
	render(){
		const {model}=this.props;
		const open=()=>{
			this.setState({
				show:true
			})
		}
		const close=()=>{
			this.setState({
				show:false
			})
		}

		return(
			<header>
			<img className="img-responsive" id='usuario_logo' onClick={open} alt="" />
			<img className="img-responsive" alt="" />
			<span className="fa-stack fa-lg fa-2x">
				<i className="fa fa-circle fa-stack-2x"></i>
				<i className="fa fa-gift fa-stack-1x fa-inverse"></i>
			</span>
			<div id="mySidenav" className="sidenav" style={{ width: this.state.show ? '250px' : 0 }}>
				<a href="javascript:void(0)" className="closebtn" onClick={close}>&times;</a>
				<div id="datos_usuario">
					<div><strong>Name: </strong>{model.name}</div>
					<div><strong>Surname: </strong>{model.lastname}</div>
					<div><strong>Phone: </strong>{model.phone}</div>
					<div><strong>Email: </strong>{model.email}</div>
				</div>
			</div>
		</header>
		);
		}
}


const Price=({model})=>{
	return(
		<div>
		<div>
			<div className="well precio">
				<img  alt="carro" />
				<span><h4>Lyft</h4><p>Fast ride 4 seats</p></span>
			</div>
			<div className="well precio">
				<div className="text-center">
					<p id="precio">{model.precio}</p>
					<p>Price stimated</p>
				</div>
			</div>

		</div>
		<NavLink to={"/nextTrip"} type="button" className="btn btn-lg" id="solicitar">Request Lyft</NavLink>
		</div>
	)
}

const MapSetPickup=({model})=>{
	
	return(
		<div>
			<ReactGoogleAutocomplete onPlaceSelected={(place)=>{
				model.setTarget(place);
			}}
			componentRestrictions={{country:'pe'}}
			id='destino' className="form-control"/>
			<button type="button" className="btn" id="ruta" onClick={onPathBtnClick}>Set pickut</button>
		</div>
	);
}

const MapForm = ({model}) => {
	return (
		<div className="container">
			<div className="row">
				<div id="menu_mapa" className="col-sm-12 col-xs-12">
					{model.isRouting ?
						<Price model={model} /> :
						<MapSetPickup model={model} />

					}
				</div>
			</div>
		</div>
	);
}

const LyftMap = ({model}) => {

	const state = {
		properties: model.properties,
		activeProperty: model.activeProperty,
		filterIsVisible: false,
		filteredProperties: [],
		isFiltering: false,
		isRouting: model.isRouting
	};
	const {
		properties,
		activeProperty,
		filterIsVisible,
		filteredProperties,
		isFiltering,
		isRouting
	} = state;
	const propertiesList = isFiltering ? filteredProperties : properties;

	const setActiveProperty = (property, scroll) => {
		//this.setState({
		//	activeProperty: property,
		//});
		model.setActiveProperty(property);

		const {index} = property;

		// Scroll to active property
		if (scroll) {
			const target = `#card-${index}`;
			//jump(target, {
			//	duration: 800,
			//	easing: easeInOutCubic,
			//});
		}
	}
	const onPathBntClick = () => {
		model.setIsRouting();
	}

	return (<div>

		<h2>LyftMap </h2>

		<div className="col-md-3 col-sm-3">
			<div className="form-group">
				<label htmlFor="destino"> Destino </label>
				<ReactGoogleAutocomplete
					onPlaceSelected={(place) => {

						console.log (place);
						model.setTarget (place);

					}}
					componentRestrictions={{country: "pe"}}
				/>
			</div>
		</div>
		<div className="col-md-3 col-sm-3">
			<button id="ruta" className="btn btn-success" onClick={onPathBntClick}>
				<i className="fa fa-bicycle" aria-hidden="true"></i>
				Ruta
			</button>
		</div>
		<GoogleMaps
			model = {model}
			properties={properties}
			activeProperty={activeProperty}
			setActiveProperty={setActiveProperty}
			filteredProperties={filteredProperties}
			isFiltering={isFiltering}
			isRouting={isRouting}
		/>



	</div>);
}


export default LyftMap;