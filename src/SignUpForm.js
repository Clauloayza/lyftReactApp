

import React, {Component} from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	NavLink,
	Redirect
} from 'react-router-dom'
import './SignUpForm.css';



class SignUpForm extends Component {

	constructor (props) {
		super (props);
		this.state = {
			nextAv : false, 
			validation : false,
			next : false
		}
	}

	render () {
		const {model} = this.props;
		console.log('SignUpForm');

		const changeInput = (e) => {
			this.setState ({
				nextAv: e.target.checked
			});
		}

		const validations = () => {
			this.setState({
				validation : true
			});
			if (model.name === '' && model.lastname === '' && model.email === '' && !(/\S+@\S+\.\S+/.test(model.email))){
				this.setState({
					next: false
				});
			}else{
				this.setState({
					next: true
				});
			}
		}

		const Header=()=>{
			return(
				<div>
					<header>
						<div className="container">
							<div className="row">
								<div className="col-xs-3 text-center icono">
									<NavLink to="/signup" className="col-xs-3 text-center icono">
										<a><i className="glyphicon glyphicon-menu-left"></i></a> 
									</NavLink>
								</div>
								<div className="col-xs-9 text-center"> 
									<h3>Sign up</h3><br/>
									<small>Join now for free ride credit</small>
									<hr/>
								</div>
							</div>
						</div>
					</header>
				</div>
			)
		}

		return (
			<div>
				<div>{Header()}</div>
				
				<section className="form">
				<div className="row">
                <div className="col-xs-12">
                    <div className="inner container">
                        <input className="form-control" defaultValue='' onChange={e => model.name = e.target.value}  id="name" type="text" placeholder="First name"/>
                        <i className="glyphicon glyphicon-user"></i>
                    </div>
                    {model.name === '' && this.state.validation && <p className="error">Please enter a name</p>}
                    <br/>
					<div className="inner  container">
                        <input className="form-control" defaultValue='' onChange={e => model.lastname = e.target.value} id="lastname" type="text" placeholder="Last name"/>
                        <i className="glyphicon glyphicon-user"></i>
                    </div>
					{model.lastname === '' && this.state.validation && <p className="error">Please enter a last name</p>}
                   
                    <br/>
                    <div className="inner  container">
                        <input className="form-control" defaultValue=''
                        onChange={e => model.email = e.target.value} id="email" type="text" placeholder="Email"/>
                         <i className="glyphicon glyphicon-envelope"></i>
                    </div>
					{model.email === '' && this.state.validation && <p className="error">Please enter an email</p>}
					{model.email !== '' && !(/\S+@\S+\.\S+/.test(model.email)) && this.state.validation && <p className="error">Not a valid email</p>}
                   
				</div>
				</div>
				<br/>
				<center>
				<label className="form-check-label ">
					<input className="form-check-input text-center" id="agreeUser" type="checkbox" onChange={changeInput}/>
						I agree to Lyft's <a href="lyft.com"> Terms of Service</a>
				</label>
				</center>
					{
						this.state.nextAv ?
							<NavLink
								to={"/lyftmap"}
								className="btn btn-lg btn-block btn-lyft">Next</NavLink>
							:
							<button
								className={this.state.nextAv ? "btn btn-lg btn-block btn-lyft":"btn btn-lg btn-block btn-lyft disabled"} disabled={!this.state.nextAv} onClick={validations}>Next</button>

					}

				</section>
			</div>

		);
	}
}

export default SignUpForm;