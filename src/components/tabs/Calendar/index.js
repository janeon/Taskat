import React, { Component } from 'react';
import View from './View';
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
      this.handleSelectSlot = this.handleSelectSlot.bind(this);
      this.handleSelectToDelete = this.handleSelectToDelete.bind(this);
  }

  addRecurringEvents(start,end) {
    console.log("Start", start);
    console.log("Start + 1", start+1);
    console.log("End", end);
    var frequency = window.prompt("Would you like for these to repeat daily, weekly, or monthly? (please type your selection exactly as the options appears)", "daily");
    if (frequency) {
      switch (frequency.toString()) {
        case "daily":
          frequency = "day";
          break;
        case "weekly":
          frequency = "week";
          break;
        case "monthly":
          frequency = "month"
          break;
        default:
      }
    }
    if (!frequency) window.alert("Please select from the available units of time for repeated events")
    else {
      const every = !window.confirm("Every " + frequency +"?");
      var gap = '';
      if (every) gap = window.prompt("How many " + frequency + "s in between?", "2");
      if (gap === '') window.prompt("For how many " + frequency + "s?", "10");
      else {
        const timesRepeating = window.prompt("Every " + gap + " " + frequency + "s, " + "how many times?", "10");
      }
    }

  }

  handleSelectSlot = ({ start, end }) => {
    //create an event
    const title = window.prompt('New Event name');
    var desc; var repeat;
    if (title != null) {
      desc = window.prompt('Event description', title);
      repeat = window.confirm("Would you like for this to become a repeating event?");
    }


    if (repeat) {
      // handling recurring events
      this.addRecurringEvents(start,end);
    }

    if (title && !repeat) {
      this.setState({ events: this.state.events.concat({startDate: start, endDate: end, title: title, desc:desc}) });
    }
  }

  handleSelectToDelete = (pEvent) => {
   const r = window.confirm("Event description: " +pEvent.desc + "\nWould you like to remove this event?")
   if(r === true){
     this.setState((prevState, props) => {
       const events = [...prevState.events]
       const idx = events.indexOf(pEvent)
       events.splice(idx, 1);
       return { events };
     });
   }
 }

    render() {
        return(
        <View
        handleSelectSlot = {this.handleSelectSlot}
        handleSelectToDelete = {this.handleSelectToDelete}
        Event = {this.Event}
        EventAgenda = {this.EventAgenda}
        events = {this.state.events}
        localizer = {localizer}
        />
    )
  }
}
export default Calendar;
