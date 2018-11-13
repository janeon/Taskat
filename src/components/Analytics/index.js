import React, { Component } from 'react';
import View from './View';
import {Line} from 'react-chartjs-2';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValue: 0,
      labelValue: 'enter label',
      chartData : {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My data!',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            lineTension: 0.1
          }
        ]
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    this.setState({dataValue: event.target.dataValue});
    this.setState({labelValue: event.target.labelValue});
  }

  handleSubmit(event) {
    const dataToAdd = this.state.labelValue;
    const labelToAdd = this.state.labelValue;
    const data = this.state.chartData.datasets.data;
    const labels = this.state.chartData.labels;
    this.setState({
      dataValue: 'data entered.',
      labelValue: 'label entered.',
      data: data.concat(dataToAdd),
      labels: labels.concat(labelToAdd)
    })

  }

  render() {
        return <View dataValue={this.state.dataValue} labelValue={this.state.labelValue} chartData={this.state.chartData} handleSubmit={this.handleSubmit} handleChange = {this.handleChange}/>;

  }
}

export default Analytics;
