import React, { Component } from 'react';

import firebase from 'firebase'

var app = firebase.app();
var db = firebase.database(app);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spottings: {}
        }
    }
    componentDidMount () {
        db.ref('spottings').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({
                spottings: snapshot.val()
            });
        });
    }
    render() {
        return (
            <div>
                <h1>Feed</h1>
                <div>
                    {Object.entries(this.state.spottings).map((spotting) =>
                        <Spotting spotting={spotting[1]} key={spotting[0]}/>
                    )}
                </div>
            </div>
        )
    }
}

class Spotting extends Component {
    render() {
        return (
            <div>
                <img src={this.props.spotting.image} alt="img of bird" width="60%"/>
                <br/>
                <button>Confirm</button>
            </div>
        )
    }
}

export default Dashboard;