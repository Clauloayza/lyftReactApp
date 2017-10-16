import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	NavLink,
	Redirect
} from 'react-router-dom';
import './SignUp.css';

import peru from './img/pe.png';
import chile from './img/cl.png';
import mexico from './img/mx.png';


class SignUp extends Component {
	constructor(props) {	
	  super(props);
		this.flags =[
			{country:'Perú', src:peru, cod:'+51', length: 9 },
			{country: 'Chile', src:chile, cod: '+56', length: 9 },
      {country: 'Mexico', src:mexico, cod: '+52', length: 10 }
		];
		
		this.state = {
			currentFlag: 0,
      checked: false,
      next: false
			}
		}
		
	  changeFlag(num) {
			this.setState({
				currentFlag: num,
				checked: false
			});
		}

	render() {
	  const {model} = this.props;
  
	  const onInputChange =(e)=> {
			if (e.target.value.length === this.flags[this.state.currentFlag].length) {
        this.setState({
					checked: true,
					next: true
				});
      } else {
        this.setState({
          checked: false
        });
      }
		}
		
		const Header = () => {
			return (
				<div>
					<header>
					  <div className="col-xs-3 text-center icono" >
						  <NavLink to="/home" className="col-xs-3 text-center icono">
						  	<a><i className="glyphicon glyphicon-menu-left"></i></a> 
						  </NavLink>
					  </div>
					  <div className="col-xs-9 text-center"> 
						<h3>Sign up</h3><br/>
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
							to = {"/signcode" }   
							className="btn btn-lg-12 btn-lyft btn-next" 
						  >
						  Next
						  </NavLink>}
						
						  {!this.state.next && <button 
							className={this.state.checked ? "btn btn-lg-12 btn-next btn-lyft": "btn btn-lg-12 btn-next anable disabled"} disabled={!this.state.checked} type="submit"
							>
							Next
						  </button>}
				</div>
			)
		}
		
	  return (
		  <div>
			  <section className="container form text-center">
				  <div>{Header()}</div>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>
				  <div className="text-center">
					<div className="row">
						<div className="col-lg-12 col-xs-12">
							<div className="input-group">
								<div className="input-group-btn">
									<a type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
										<img className="img-responsive peru" id="peruFlag" src={this.flags[this.state.currentFlag].src} alt='peru'/> 
										<span className="caret"></span>
									</a>
									<ul className="dropdown-menu">
                    {this.flags.map((a, index) => {
                      return <li><a><img className="img-responsive" src={a.src} alt='peru' onClick={() => this.changeFlag(index)} /> {a.country}</a></li>
                    })}
                  </ul>
								</div>
								<span className="code"><input id="codeNumber" value={this.flags[this.state.currentFlag].cod}/></span>
								<input id="number" minLength='9' maxLength='10' type="number" className="form-control" placeholder="1122334455"
									 onKeyUp={onInputChange}
								/>
							</div>
							<br/>
							<div className="text-center"><h5>We'll send a text to verify your phone</h5></div>
						</div>
					</div>
					<div>{NextNav()}</div>
				</div>
            </section>
		  </div>
	  );
	 
	}
  }
 export default SignUp;