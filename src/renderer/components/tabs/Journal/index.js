import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import View from './View';

export default class Journal extends Component {

	constructor(props) {
        super(props);
        this.state = {
            value: 'type a journal entry',
            entries: []
        }; 

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) { 
        const itemToAdd = this.state.value;
        const entries = this.state.entries;
        this.setState({
            value: "type a journal entry",
            entries: entries.concat(itemToAdd)
        });
      }

    handleDelete(txt) {        
        this.setState({
            entries: this.state.entries.filter(el => el !== txt)
        });
    }

    componentWillUnmount() {
        // this is where you record your final state to the model
        //this.recordFinalState("Journal", this.state);
        // this is commented out because I'm not passing in the register function yet :)
    }

    render() {
        return <View value={this.state.value} entries={this.state.entries} handleSubmit={this.handleSubmit} handleChange = {this.handleChange} handleDelete = {this.handleDelete}/>;
    }

}

