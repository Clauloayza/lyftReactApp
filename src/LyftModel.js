
import React from 'react';
import data from './data/Data';
import Utils from './Utils';

class LyftModel {
	constructor () {
		this.notify = null;
		this.userInfo = {
			name: null,
			surname : null,
			email : null,
			phone : null
		}
		this.properties = data.properties;
		this.activeProperty = data.properties[0]
		this.isRouting = false;
		this.targetPlace = null;
	}
	setUserInfo (info) {
		this.userInfo = info;
		//Utils.store('lyft', this.userInfo);
		this.notify();
	}

	subscribe (render) {
		this.notify = render;
	}
	setActiveProperty (property) {
		this.activeProperty = property;
		this.notify();
	}

	setTarget (targetPlace) {
		this.targetPlace  = targetPlace;
		this.notify();
	}

	setIsRouting ( ) {
		this.isRouting = true;
		this.notify();
	}
}

export default LyftModel;