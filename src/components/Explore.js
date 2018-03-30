import React, { Component } from 'react'

import firebase from 'firebase'

var app = firebase.app();
var db = firebase.database(app);

export default class Explore extends Component {
	render () {
		return (
			<div>
				Explore.
			</div>
		)
	}
}
