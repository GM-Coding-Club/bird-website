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
            var results = [];
            snapshot.forEach(spotting => {
                if (spotting.child('confirmed').val() !== true) {
                    results.push(spotting.val());
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
                        <Spotting spotting={spotting[1]} key={spotting[0]}/>
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
            species: {}
        };
        
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }
    
    componentDidMount () {
        db.ref('species').on('value', snapshot => {
            console.log(snapshot.val());
            this.setState({
                species: snapshot.val()
            })
        });
    }

    handleSearch(event) {
        console.log("Search query changed");
        this.setState({search: event.target.value});
        this.setState({value: "New"})
    }

    handleSelect(event) {
        console.log("Select area has changed");
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    handleConfirm(event) {
        console.log("Confirming...");
        if (this.state.value === "") {
            console.log("No value!");
        } else if (this.state.value === "New") {
            console.log("Created new species:");
            db.ref('species/').push().set({
                'name': this.state.search,
                'spottingCount': 1
            })
        } else {
            db.ref('species/' + this.state.value).once('value', snapshot => {
                console.log("Adding one to " + this.state.value);
                snapshot.ref.child('spottingCount').set(snapshot.child('spottingCount').val()+1);
            })
        }
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
            </div>
        )
    }
}

export default Dashboard;