import React, { Component } from 'react';
import View from './View';
import events from 'events'

class Calendar extends Component {
  constructor(...args) {
    super(...args)
    this.state = { events }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

    render() {
        return
        <View
        handleSelect = {this.handleSelect}
        />;
    }

}

export default Calendar;
