import React, { Component } from 'react';
import View from './View';
// import events from 'events'
import BigCalendar from 'react-big-calendar';
import moment from 'moment'
const localizer = BigCalendar.momentLocalizer(moment)

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  )
}

var events = [
    {
      endDate: new Date('November 12, 2018 20:00:00'),
      startDate: new Date('November 10, 2018 06:00:00'),
      title: 'Dummy event title',
      desc: 'Big conference for important people'
    }
];

class Calendar extends Component {
  /*
  TODO: Things to fix
  - be able to store event start and end times into localizer
  = be able to add reoccuring events
  https://www.reddit.com/r/reactjs/comments/8ig9q3/using_reactbigcalendar_is_there_an_easy_way_to/
  */

  constructor(props)
  {
      super(props);
      this.state = { events : events } ;
      this.handleSelect = this.handleSelect.bind(this);
  }


  handleSelect = ({ start, end }) => {
    //create an event
    const title = window.prompt('New Event name')
    if (title) {
      this.setState({ events: this.state.events.concat({startDate: start, endDate: end, title: title}) });
    }
  }

    render() {
        return(
        <View
        handleSelect = {this.handleSelect}
        Event = {this.Event}
        EventAgenda = {this.EventAgenda}
        events = {this.state.events}
        localizer = {localizer}
        />
    )
  }
}
export default Calendar;
