import React, { Component } from 'react';

import firebase from 'firebase';

import Clarifai from 'clarifai';

import {clarifAiPrivate, clarifAiModelId} from '../../config/';

var app = firebase.app();
var db = firebase.database(app);

console.log(clarifAiModelId);
var clarifAiApp = new Clarifai.App({apiKey: clarifAiPrivate});

class Dashboard extends Component {
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
                if (spotting.child('confirmed').val() !== true) {
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
                <h1>Feed</h1>
                <div>
                    {Object.entries(this.state.spottings).map((spotting) =>
                        <Spotting spotting={spotting[1]} key={spotting[1][0]} pkey={spotting[1][0]}/>
                    )}
                </div>
            </div>
        )
    }
}

class Spotting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            search: "Search Species/New",
            species: {},
            concepts: []
        };
        
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }
    
    componentDidMount () {
        db.ref('species').on('value', snapshot => {
            this.setState({
                species: snapshot.val()
            })
        });
        clarifAiApp.models.predict(clarifAiModelId, this.props.spotting.image).then(
            (response) => {
                var predictions = response.outputs[0].data.concepts;
                this.setState({
                    concepts: predictions
                })
            },
            (err) => {
                console.log(err);
                this.setState({
                    concepts: [{id: 0, name: "Error - see console"}]
                })
            }
        );
    }

    handleSearch(event) {
        console.log("Search query changed to:");
        this.setState({search: event.target.value});
        this.setState({value: "New"})
    }

    handleSelect(event) {
        console.log("Select area has changed to:");
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    handleConfirm(event) {
        console.log("Confirming...");
        var key;
        if (this.state.value === "") {
            console.log("No value!");
            return;
        } else if (this.state.value === "New") {
            // Create species
            console.log("Creating new species:");
            var ref = db.ref('species/').push();
            key = ref.key;
            console.log(key);
            
            ref.once('value', snapshot => {
                snapshot.ref.child('name').set(this.state.search);
                snapshot.ref.child('spottings').push().set(this.props.pkey);
                snapshot.ref.child('spottingCount').set(snapshot.child('spottingCount').val()+1);
            });
        } else {
            // Update species
            key = this.state.value;
            db.ref('species/' + this.state.value).once('value', snapshot => {
                console.log("[Species] Adding spotting to " + this.state.value);
                snapshot.ref.child('spottings').push().set(this.props.pkey);
                console.log("[Species] Adding one to spottingCount of" + this.state.value);
                snapshot.ref.child('spottingCount').set(snapshot.child('spottingCount').val()+1);
            });
        }
        // Update spotting
        db.ref('spottings/' + this.props.pkey).once('value', snapshot => {
            console.log("[Spotting] Marking " + this.props.pkey + " as confirmed");
            snapshot.ref.child('confirmed').set(true);
            snapshot.ref.child('species').set(key);
        });
        clarifAiApp.inputs.create({
            url: this.props.spotting.image,
            concepts: [
                {
                    id: this.state.search,
                    value: true
                }
            ]
        })
        clarifAiApp.models.train(clarifAiModelId).then(
            (response) => {
                console.log("Trained:");
                console.log(response);
            },
            (err) => {
                console.log(err);
            }
        )
    }

    render() {
        return (
            <div>
                <img src={this.props.spotting.image} alt="img of bird" width="60%"/>
                <br/>
                <button onClick={this.handleConfirm}>Confirm</button>
                <a>key: {this.state.value}</a>
                <br/>
                <input value={this.state.search} onChange={this.handleSearch}></input>
                <select onChange={this.handleSelect}>
                    <option value="New"></option>
                    {
                        // eslint-disable-next-line
                        Object.entries(this.state.species).map((species) =>
                            {
                                if (species[1].name.toLowerCase().startsWith(this.state.search.toLowerCase()) ||
                                this.state.search === "Search Species/New") {
                                    return(<option value={species[0]} key={species[0]}>{species[1].name}</option>);
                                }
                            }
                        )
                    }
                </select>
                <br/>
                <a>predictions: </a>
                <select>
                    {
                        this.state.concepts.map ((concept) => {
                            return(<option value={concept.name} key={concept.id}>{concept.name}</option>)
                        })
                    }
                </select>
            </div>
        )
    }
}

export default Dashboard;