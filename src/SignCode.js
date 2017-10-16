import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	NavLink,
	Redirect
} from 'react-router-dom';

import './SignCode.css';

class SignCode extends Component{
	constructor(props){
		super(props);

		this.currentCode = [];
		this.state ={
			showCode: false,
			next: false,
			checked: false,
			newCode: undefined
		}
	}

	changeInput = (e) => {
		this.currentCode.push(e.target.value);
		return this.currentCode;
	}

	getCode(){
		if(this.currentCode.length === 3){
			this.setState({
				checked: true
			});
			this.currentCode = parseInt(this.currentCode.join(''));
			this.setState({
				checked: true
			})
		}
	}

	checkCode(){
		if(this.currentCode === 123){
			this.setState({
				next:true
			})
		}else{
			this.setState({
				checked: false,
				next: false
			});
		}	
	}	
	render(){
		const Header =()=>{
			return(
				<div>
					<header>
					<div className="col-xs-3 text-center icono" >
						<NavLink to="/signup" className="col-xs-3 text-center icono">
							<a><i className="glyphicon glyphicon-menu-left"></i></a> 
						</NavLink>
					</div>
					<div className="col-xs-9 text-center"> 
					  <h3>Sign Check-code</h3><br/>
					  <h5>Join now for free ride credit</h5>
					  <hr/>
					  </div>
				</header>
				</div>
			)
		}

		const NextNav = () => {
			return(
				<div>
					{this.state.next && 
					<NavLink 
						to = {"/signup-form" }   
						className="btn btn-lg-12 btn-lyft btn-next" 
					    >
						  Next
					</NavLink>}
						
					{!this.state.next && <button 
					className={this.state.checked ? "btn btn-lg-12 btn-next btn-lyft": "btn btn-lg-12 btn-next anable disabled"} disabled={!this.state.checked} onClick={(e) => { this.checkCode(e) }} type="submit"
					>
					Next
					</button>}
				</div>
			)
		}

		return(
			<div>
				<div>{Header()}</div>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<div className="container">
					<p className="text-center">
						Your PIN number is: <span id="cod-lab"> LAB - 123</span>
					</p>
					<table>
						<tr>
							<th><strong>LAB</strong></th>
							<th><input type="number" className="text-center randomCode" maxLength="1"
										onKeyUp={(e) => { this.changeInput(e) }} /></th>
							<th><input type="number" className="text-center randomCode" maxLength="1"
										onKeyUp={(e) => { this.changeInput(e) }} /></th>
							<th><input type="number" className="text-center randomCode" maxLength="1"
										onKeyUp={(e) => { this.changeInput(e) }} onBlur={() => { this.getCode()}} /></th>
						</tr>
					</table>
					<div className="row text-center">
						Enter the code sent to <p id="prevPhoneNum"></p>
					</div>
				</div>
				<div className="container">{NextNav()}</div>
			</div>
		)
	}
}

export default SignCode;