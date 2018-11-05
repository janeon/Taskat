import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import View from './View';

export default class Journal extends Component {

	constructor(props) {
        super(props);

        this.state = {
            value: 'enter ur entry',
            entries: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
        this.state.entries.push(this.state.value);
      }

    componentWillUnmount() {
        // this is where you record your final state to the model
        // ex --> this.recordFinalState("ex_tab", this.state);
        // this is commented out because I'm not passing in the register function yet :)
    }

    render() {
        return <View value={this.state.value} entries={this.state.entries} handleSubmit={this.handleSubmit} handleChange = {this.handleChange}/>;
    }

}

