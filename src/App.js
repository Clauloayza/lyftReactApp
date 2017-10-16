import React, {Component} from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	NavLink,
	Redirect
} from 'react-router-dom'
import './App.css';

import Home from './Home';
import SignUp from './SignUp';
import SignCode from './SignCode';
import SignUpForm from './SignUpForm';
import LyftMap from './LyftMap';

const NotFound = (props) => {
	return (
		<div><h2> Error 404! </h2></div>
	);
}


class App extends Component{
	render(){
		const {model} = this.props;
		return(
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact path="/"
							render={() => <Redirect to= {'/home'}/>}/>
						<Route  path="/home" render={() => <Home model={model} />}/>
						<Route  path="/signup" render={() => <SignUp model={model} />}/>
						<Route path="/signcode" render={() => <SignCode model={model} />}/>
						<Route  path="/signup-form" render={() => <SignUpForm model={model} />}/>
						<Route  path="/lyftmap" render={() => <LyftMap model={model} />}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
