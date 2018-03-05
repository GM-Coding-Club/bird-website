import React, { Component } from 'react';

import firebase from 'firebase'

import keys from '../../config/';

var app = firebase.initializeApp(keys);
var db = firebase.database(app);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spottings: []
        }
    }
    componentDidMount () {
        db.fetch('spottings', {
            context: this,
            asArray: true,
            queries: {
                orderByChild: 'confirmed',
                equalTo: false
            },
            then(data){
                console.log(data);
                this.setState({
                    spottings: data
                });
            }
        });
    }
    render() {
        return (
            <div>
                <h1>Sign In</h1>
                <div>
                    <input type="username" value="username" id="user"/>
                    <br/>
                    <input type="password" value="username" id="pass"/>
                </div>
                <h1>Feed</h1>
                <div>
                    {this.state.spottings.map((spotting) =>
                        <Spotting spotting={spotting} key={spotting.key}/>
                    )}
                </div>
            </div>
        )
    }
}

class Spotting extends Component {
    render() {
        return (
            <img src={this.props.spotting.image} alt="img of bird"/>
        )
    }
}

export {
    Dashboard
};