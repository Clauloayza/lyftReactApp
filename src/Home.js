import React, {Component} from 'react';
import {
	NavLink,
} from 'react-router-dom'
import './Home.css'

const Home = ( {model} ) => {

	return (
		<div className="home">
			<div className="header">
				<center>
					<img src="./image/gio.png" className="logo text-center"/>
				</center>
			
			<div className="container">
				<div className="row  btns">
					<div className="col-xs-6 col-md-6">
						<NavLink to={"/lyftmap"} className="btn btn-lyft btn-lg btn-block btn-signUp">
							Log In
						</NavLink>
					</div>
					<div className="col-xs-6 col-md-6">
						<NavLink to={"/signup"} className="botonPink btn btn-lyft btn-lg btn-block btn-signUp">
							Sign Up
						</NavLink>
					</div>
				</div>	
			</div>
			</div>	
		</div>
	);
}

export default Home;