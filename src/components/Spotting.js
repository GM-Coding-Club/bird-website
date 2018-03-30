import React, { Component } from 'react';

import Clarifai from 'clarifai'

import firebase from 'firebase';
import { clarifAiPublic, clarifAiModelId } from '../config';

var app = firebase.app();
var db = firebase.database(app);

var clarifaiApp = new Clarifai.App({'apiKey': clarifAiPublic});

export default class Explore extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: props.match.params.id
        }
    }

	render () {
		return (
			<div>
				id: {this.state.id}
			</div>
		)
	}
}