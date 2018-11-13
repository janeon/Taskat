import React, { Component } from 'react';
import View from './View';
import BigCalendar from 'react-big-calendar';
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

const localizer = BigCalendar.momentLocalizer(moment)
var events = [
    {
      end: new Date('November 11, 2018 20:00:00'),
      start: new Date('November 11, 2018 06:00:00'),
      title: 'Happy 11/11',
      desc: 'Big conference for important people'
    }
];

class Calendar extends Component {
  /*
  TODO: Things to fix
  - be able to store event start and end times into model via registerFinalStateFunc
  */

  constructor(props)
  {
      super(props);
      this.state = { events : events } ;
      this.handleSelectSlot = this.handleSelectSlot.bind(this);
      this.handleSelectToDelete = this.handleSelectToDelete.bind(this);
      this.addRecurringEvents = this.addRecurringEvents.bind(this);
      this.resizeEvent = this.resizeEvent.bind(this);
      this.moveEvent = this.moveEvent.bind(this)
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    console.log("events", events);
    console.log("spliced next events", nextEvents);
    console.log("updated Event", updatedEvent);
    this.setState({
      events: nextEvents,
    })
  }

  addRecurringEvents(start, end, title, desc, frequency, gap, timesRepeating) {
    var i; var newStart; var newEnd;
    switch (frequency) {
      case "minute":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime()); newEnd = new Date(end.getTime());
          newStart.setMinutes(newStart.getMinutes()+i*gap); newEnd.setMinutes(newEnd.getMinutes()+i*gap);
          this.setState({ events: this.state.events.concat({start: newStart, end: newEnd, title: title, desc:desc}) });
        }
        break;
      case "hour":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime()); newEnd = new Date(end.getTime());
          newStart.setHours(newStart.getHours()+i*gap); newEnd.setHours(newEnd.getHours()+i*gap);
          this.setState({ events: this.state.events.concat({start: newStart, end: newEnd, title: title, desc:desc}) });
        }
        break;
      case "day":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime());newEnd = new Date(end.getTime());
          newStart.setDate(newStart.getDate()+i*gap); newEnd.setDate(newEnd.getDate()+i*gap);
          this.setState({ events: this.state.events.concat({start: newStart, end: newEnd, title: title, desc:desc}) });
        }
        break;
      case "week":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime()); newEnd = new Date(end.getTime());
          newStart.setDate(newStart.getDate()+i*gap*7); newEnd.setDate(newEnd.getDate()+i*gap*7)
          this.setState({ events: this.state.events.concat({start: newStart, end: newEnd, title: title, desc:desc}) });
        }
        break;
      case "month":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime()); newEnd = new Date(end.getTime());
          newStart.setMonth(newStart.getMonth()+i*gap); newEnd.setMonth(newEnd.getMonth()+i*gap);
          this.setState({ events: this.state.events.concat({start: newStart, end: newEnd, title: title, desc:desc}) });
        }
        break;
      case "year":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime()); newEnd = new Date(end.getTime());
          newStart.setFullYear(newStart.getFullYear()+i*gap); newEnd.setFullYear(newEnd.getFullYear()+i*gap);
          this.setState({ events: this.state.events.concat({start: newStart, end: newEnd, title: title, desc:desc}) });
        }
        break;
      default:
    }
  }

  handleSelectSlot = ({ start, end }) => {
    // console.log("Start date", start);
    //create an event
    const title = window.prompt('New Event name');
    var desc = ""; var repeat;
    if (title != null) {
      desc = window.prompt('Give your event some description', "describe " + title);
      repeat = window.confirm("Repeat this event? (Press cancel to add single, nonrepeated event)");
    }


    if (repeat) {
      // handling recurring events
      var frequency = window.prompt("Repeat hourly, daily, weekly, monthly, or annually? \n (please type your selection exactly as the options appears)", "daily");
      // minutely option currently ommitted since events css does not support such specificity and you can input non-integral hours
      if (frequency) {
        switch (frequency.toString()) {
          case "minutely":
            frequency = "minute";
            break;
          case "hourly":
            frequency = "hour";
            break;
          case "daily":
            frequency = "day";
            break;
          case "weekly":
            frequency = "week";
            break;
          case "monthly":
            frequency = "month"
            break;
          case "annually":
            frequency = "year"
            break;
          default:
        }
      }
      var gap = 1; var timesRepeating = 1;
      if (!frequency) window.alert("Please select from the available units of time for repeated events")

      else {
        const every = !window.confirm("Every " + frequency +"? \n (Select cancel to add " + frequency + "s between each repeated event)");
        if (every) gap = window.prompt("How many " + frequency + "s in between each repeat?", "2");
        if (gap === '') window.prompt("For how many " + frequency + "s?", "10");
        else {
          (gap > 1) ? timesRepeating = window.prompt("Once every " + gap.toString() + " " + frequency.toString() + "s, how many times?", "10")
          : timesRepeating = window.prompt("Once every " + frequency +  ", how many times?", "10");
        }
      }
      this.addRecurringEvents(start, end, title, desc, frequency, gap, timesRepeating);
    }

    if (title && !repeat) {
      this.setState({ events: this.state.events.concat({start: start, end: end, title: title, desc:desc}) });
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
        addRecurringEvents = {this.addRecurringEvents}
        onEventResize = {this.resizeEvent}
        onEventDrop = {this.moveEvent}
        />
    )
  }
}
export default Calendar;
