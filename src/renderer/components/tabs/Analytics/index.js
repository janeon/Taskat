import React, { Component } from 'react';
import View from './View';

class Analytics extends Component {
  constructor(props) {
    super(props);

    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate();

    this.state = props.previousState;
    this.state.date = date;

    /*
    this.state = {
      progress: 0,
      progTotal: 10,
      isNewTab: true,
      chartType: 'select',
      type: 'Line',
      xLabel: 'x-axis',
      yLabel: 'y-axis',
      date: date,
      dataValue: 0,
      labelValue: 'enter label',
      chartData : {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            label: 'My data!',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            lineTension: 0.1
          }
        ]
      }
    }; */

    this.registerFinalState = props.registerFinalState;
    this.taskKey = props.taskKey;

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleXLabelChange = this.handleXLabelChange.bind(this);
    this.handleYLabelChange = this.handleYLabelChange.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleProgTotalChange = this.handleProgTotalChange.bind(this);
    this.handleAddProgress = this.handleAddProgress.bind(this);
    this.handleRemoveProgress = this.handleRemoveProgress.bind(this);
  };

  componentWillUnmount() {
    this.registerFinalState("analytics", this.state, this.taskKey);
  }

  handleDataChange(event) {
    this.setState({dataValue: event.target.value});
    console.log("handling data change: " + event.target.value);
  }

  handleXLabelChange(event) {
    this.setState({xLabel: event.target.value});
    console.log("handling xLabel change: " + event.target.value);
  }

  handleYLabelChange(event) {
    this.setState({yLabel: event.target.value});
    console.log("handling yLabel change: " + event.target.value);
  }

  handleProgTotalChange(event) {
    this.setState({progTotal: parseInt(event.target.value)});
    console.log("progTotal: " + parseInt(event.target.value));
  }

  handleAddProgress(event) {
    if (this.state.progress < this.state.progTotal) {
      this.setState({progress: this.state.progress + 1});
    }
    console.log("progress: " + parseInt(this.state.progress));
  }

  handleRemoveProgress(event) {
    if (this.state.progress > 0) {
      this.setState({progress: this.state.progress - 1});
    }
    console.log("progress rem: " + parseInt(this.state.progress));
  }

  handleDelete(event) {
    const data = this.state.chartData.datasets[0].data;
    const labels = this.state.chartData.labels;
    this.setState({
      data: data.pop(),
      labels: labels.pop()
    });
  }

  handleDisplayChange(event) {
    event.persist();
    this.setState({isNewTab: false});
    console.log("isNewTab: " + this.state.isNewTab);
    event.preventDefault();
  }

  handleSelectChange(event) {
    event.persist();
    console.log("targetValue: " + event.target.value);
    this.setState({chartType: event.target.value});
    console.log("chartType: " + this.state.chartType);
    event.preventDefault();
  }

  handleSubmit(event) {
    event.persist();
    const dataToAdd = this.state.dataValue;
    const labelToAdd = this.state.date;
    const data = this.state.chartData.datasets[0].data;
    const labels = this.state.chartData.labels;

    console.log(parseFloat(dataToAdd));
    console.log(labelToAdd);

    this.setState({
      data: data.push(parseFloat(dataToAdd)),
      labels: labels.push(labelToAdd)
    });
    console.log(this.state.chartData.datasets[0].data);
    console.log(this.state.chartData.labels);
    event.preventDefault();
  }

  render() {
    return <View type={this.state.type}
    dataValue={this.state.dataValue}
    labelValue={this.state.labelValue}
    chartData={this.state.chartData}
    handleSubmit={this.handleSubmit}
    handleDataChange={this.handleDataChange}
    xLabel={this.state.xLabel}
    yLabel={this.state.yLabel}
    handleXLabelChange={this.handleXLabelChange}
    handleYLabelChange={this.handleYLabelChange}
    handleDelete={this.handleDelete}
    isNewTab={this.state.isNewTab}
    handleDisplayChange={this.handleDisplayChange}
    handleSelectChange={this.handleSelectChange}
    chartType={this.state.chartType}
    handleProgTotalChange={this.handleProgTotalChange}
    handleAddProgress={this.handleAddProgress}
    handleRemoveProgress={this.handleRemoveProgress}
    progress={this.state.progress}
    progTotal={this.state.progTotal}
  />;
}
}


export default Analytics;
