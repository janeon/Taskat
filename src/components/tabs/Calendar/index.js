import React, { Component } from 'react';
import View from './View';
import events from 'events'
import 'react-big-calendar/lib/css/react-big-calendar.css';


class Calendar extends Component {
  constructor(...args) {
    super(...args)
    this.state = { events };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      console.log("Your new event name", title);
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
