import React, { Component } from 'react';

const moment = require('moment');

import firebase from 'firebase';

var app = firebase.app();
var db = firebase.database(app);

export default class Explore extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            spotting: {},
            concepts: [],
            species: {},
            date: ""
        }
    }

    componentDidMount () {
        db.ref('spottings/' + this.state.id).on ('value', (snapshot) => {
            this.setState({
                spotting: snapshot.val(),
                concepts: snapshot.val().concepts
            })
            db.ref('species/'+this.state.spotting.species).on ('value', (snapshot) => {
                this.setState({
                    date: moment.unix(Math.round(this.state.spotting.time)).format("MMMM Do YYYY, h:mm:ss a"),
                    species: snapshot.val()
                })
            });
        });
    }

	render () {
		return (
			<div>
                <h1>{this.state.species.name + " - " + this.state.date}</h1>
                <img src={this.state.spotting.image} alt="this.state.species.name" width="50%"/>
                <br/>
                location: {this.state.spotting.location} id: {this.state.id}
                <br/>
                predictions: {
                    <select>
                        {
                            this.state.concepts.map ((concept) => {
                                console.log(concept);
                                return(<option value={concept.value} key={concept.id}>{concept.name + " - " + concept.value}</option>)
                            })
                        }
                    </select>
                }
			</div>
		)
	}
}