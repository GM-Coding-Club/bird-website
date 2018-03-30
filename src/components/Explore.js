import React, { Component } from 'react'

import firebase from 'firebase'

var app = firebase.app();
var db = firebase.database(app);

export default class Explore extends Component {
	constructor(props) {
        super(props);
        this.state = {
            spottings: {}
        }
    }
    componentDidMount () {
        db.ref('spottings').on('value', snapshot => {
            var results = [];
            snapshot.forEach(spotting => {
                if (spotting.child('confirmed').val() === true) {
                    var result = spotting.val();
                    result[0] = spotting.key;
                    results.push(result);
                }
            });
            this.setState({
                spottings: results
            });
        });
        
    }
    render() {
        return (
            <div>
                <h1>Spottings</h1>
                <ul className="list-unstyled">
                    {Object.entries(this.state.spottings).map((spotting) =>
                        <Spotting spotting={spotting[1]} key={spotting[1][0]} pkey={spotting[1][0]}/>
                    )}
                </ul>
            </div>
        )
    }
}

class Spotting extends Component {
	constructor(props) {
        super(props);
        this.state = {
			speciesName: ""
        }
	}

	componentDidMount () {
		db.ref('species/' + this.props.spotting.species).on('value', snapshot => {
			this.setState ({
				speciesName: snapshot.val().name
			})
		})
	}
	
	render() {
		return (
			<li>
					<h1>
						<a href={"explore/spotting/"+this.props.pkey}>
							<img src={this.props.spotting.image} alt={this.props.spotting.species} width="20%" />
							{this.state.speciesName}
						</a>
					</h1>
			</li>
		);
	}
}