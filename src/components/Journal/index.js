import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import View from './View';

export default class Journal extends Component {

	constructor(props) {
        super(props);

        this.state = {
            value: 'enter ur entry',
            entries: ["this is my first entry", "this is a second entry", "i also wrote this lol"]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) { 
        const itemToAdd = this.state.value;
        const entries = this.state.entries;
        this.setState({
            value: "enter ur entryyyy",
            entries: entries.concat(itemToAdd)
        });
        console.log(entries.concat(itemToAdd));

      }

    componentWillUnmount() {
        // this is where you record your final state to the model
        this.recordFinalState("Journal", this.state);
        // this is commented out because I'm not passing in the register function yet :)
    }

    render() {
        console.log("rendering");
        console.log(this.state);
        return <View value={this.state.value} entries={this.state.entries} handleSubmit={this.handleSubmit} handleChange = {this.handleChange}/>;
    }

}

