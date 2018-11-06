import React, { Component } from 'react';
import View from './View';
import Events from 'events'
import moment from 'moment';

class Calendar extends Component {
  /*
  TODO: Things to fix
  - be able to store event start and end times into localizer
  */
  constructor(props)
  {
      super(props);
      this.state = {events: Events};
  }


  handleSelect = ({ start, end }) => {
    //create an event
    const title = window.prompt('New Event name')
    if (title)
      console.log("Your new event name", title);
      // this.state.events.push({start: start, end: end, title: title});
      this.setState({});
  }

    render() {
        return(
        <View
        handleSelect = {this.handleSelect}
        />
    )
  }
}
export default Calendar;
