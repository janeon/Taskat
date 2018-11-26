import React, { Component } from 'react';
import View from './View';

class Analytics extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.state = {
      date: date,
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

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleDataChange(event) {
    this.setState({dataValue: event.target.value});
    console.log("handling data change: " + event.target.value);
  }

  handleDelete(event) {
    const data = this.state.chartData.datasets[0].data;
    const labels = this.state.chartData.labels;
    this.setState({
      data: data.pop(),
      labels: labels.pop()
    });
  }

  handleSubmit(event) {
    const dataToAdd = this.state.dataValue;
    const labelToAdd = this.state.date;
    const data = this.state.chartData.datasets[0].data;
    const labels = this.state.chartData.labels;

    this.setState({
      data: data.push(parseInt(dataToAdd)),
      labels: labels.push(labelToAdd)
    });
    event.preventDefault();
  }

  render() {
        return <View value={this.state.value}
        dataValue={this.state.dataValue}
        labelValue={this.state.labelValue}
        chartData={this.state.chartData}
        handleSubmit={this.handleSubmit}
        handleDataChange = {this.handleDataChange}
        handleDelete = {this.handleDelete} />;

  }
}

export default Analytics;



/*dataValue: 'data entered.',
labelValue: 'label entered.',*/
