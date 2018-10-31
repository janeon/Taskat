import React, { Component } from 'react';
import View from './View';

export default class Journal extends Component {

	constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.mytitle = "tomatoes, apples, big difference."; // to initialize
    }

    componentDidMount() {
        // it's where you want to subscribe to whatever data you need in the model
        // this.model.subscribe() THIS PROTOCOL IS PROBABLY GOING TO CHANGE
    }
    componentWillUnmount() {
        // this is where you should '.unsubscribe(this)' from the model.  
    }

    onChange(updatedData) {
        this.setState((state) => {
            // how do you want to change this state based on the old state? 
            // 'state' is the old state, and you return the new state.  
            return state.data = updatedData;
        });
    }

    render() {
        return <View title={this.mytitle}/>;
    }

}

export default Journal;