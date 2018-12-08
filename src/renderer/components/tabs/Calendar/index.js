import React, {
  Component
} from 'react';
import View from './View';
import BigCalendar from 'react-big-calendar';
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
const smalltalk = require('smalltalk');
const tryToCatch = require('try-to-catch');

//const DragAndDropCalendar = withDragAndDrop(BigCalendar)

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
  - make sure resize events without allowing it to impact other events
  -
  https://www.reddit.com/r/reactjs/comments/8ig9q3/using_reactbigcalendar_is_there_an_easy_way_to/
  */
  constructor(props) {
    super(props);
    this.state = props.previousState;
    // this.state.events = events;
    this.registerFinalState = props.registerFinalState;
    this.taskKey = props.taskKey;
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSelectToDelete = this.handleSelectToDelete.bind(this);
    this.addRecurringEvents = this.addRecurringEvents.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);
    this.moveEvent = this.moveEvent.bind(this);
    // this.Event = this.Event.bind(this);
    // this.EventAgenda = this.EventAgenda.bind(this);
  }

  componentWillUnmount() {
    this.registerFinalState("calendar", this.state, this.taskKey);
  }

  Event({ event }) {
      return (
          <span>
        <strong>
        {event.title}
        </strong>
              { event.desc && (':  ' + event.desc)}
      </span>
      )
  }

  EventAgenda({ event }) {
      return <span>
      <em style={{ color: 'magenta'}}>{event.title}</em>   <p>{ event.desc }</p>
    </span>
  }

  resizeEvent ({ event, start, end }) {
    const { events } = this.state
    const nextEvents = events.map(existingEvent => {
      return this.state.events.indexOf(existingEvent) === this.state.events.indexOf(event)
        ? { ...existingEvent, start, end }
        : existingEvent
    })
    this.setState({
      events: nextEvents,
    })

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  moveEvent({event, start, end, isAllDay: droppedOnAllDaySlot}) {
    const {events} = this.state
    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) allDay = true
    else if (event.allDay && !droppedOnAllDaySlot) allDay = false

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    // console.log("events", events);
    // console.log("spliced next events", nextEvents);
    // console.log("updated Event", updatedEvent);
    this.setState({
      events: nextEvents,
    })
  }

  addRecurringEvents(start, end, title, desc, frequency, gap, timesRepeating) {
    var i;
    var newStart;
    var newEnd;
    switch (frequency) {
      case "minute":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime());
          newEnd = new Date(end.getTime());
          newStart.setMinutes(newStart.getMinutes() + i * gap);
          newEnd.setMinutes(newEnd.getMinutes() + i * gap);
          this.setState({
            events: this.state.events.concat({
              start: newStart,
              end: newEnd,
              title: title,
              desc: desc
            })
          });
        }
        break;
      case "hour":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime());
          newEnd = new Date(end.getTime());
          newStart.setHours(newStart.getHours() + i * gap);
          newEnd.setHours(newEnd.getHours() + i * gap);
          this.setState({
            events: this.state.events.concat({
              start: newStart,
              end: newEnd,
              title: title,
              desc: desc
            })
          });
        }
        break;
      case "day":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime());
          newEnd = new Date(end.getTime());
          newStart.setDate(newStart.getDate() + i * gap);
          newEnd.setDate(newEnd.getDate() + i * gap);
          this.setState({
            events: this.state.events.concat({
              start: newStart,
              end: newEnd,
              title: title,
              desc: desc
            })
          });
        }
        break;
      case "week":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime());
          newEnd = new Date(end.getTime());
          newStart.setDate(newStart.getDate() + i * gap * 7);
          newEnd.setDate(newEnd.getDate() + i * gap * 7)
          this.setState({
            events: this.state.events.concat({
              start: newStart,
              end: newEnd,
              title: title,
              desc: desc
            })
          });
        }
        break;
      case "month":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime());
          newEnd = new Date(end.getTime());
          newStart.setMonth(newStart.getMonth() + i * gap);
          newEnd.setMonth(newEnd.getMonth() + i * gap);
          this.setState({
            events: this.state.events.concat({
              start: newStart,
              end: newEnd,
              title: title,
              desc: desc
            })
          });
        }
        break;
      case "year":
        for (i = 0; i < timesRepeating; i++) {
          newStart = new Date(start.getTime());
          newEnd = new Date(end.getTime());
          newStart.setFullYear(newStart.getFullYear() + i * gap);
          newEnd.setFullYear(newEnd.getFullYear() + i * gap);
          this.setState({
            events: this.state.events.concat({
              start: newStart,
              end: newEnd,
              title: title,
              desc: desc
            })
          });
        }
        break;
      default:
    }
  }

  async handleSelectSlot({start, end}) {
    /*creates an event*/
    var title = await tryToCatch(smalltalk.prompt, '', 'New event name');
    if (title.length < 2) return;
    else title = title[1];
    var repeat; // getting description and whether event repeats
    var desc = await tryToCatch(smalltalk.prompt, '', 'Give your event some description', title);
    if (desc.length < 2) return;
    else desc = desc[1];
    var result = await tryToCatch(smalltalk.confirm, 'Question', 'Repeat this event over time?', {
      buttons: {
        ok: 'Repeat',
        cancel: 'Do not repeat',
      }
    });
    repeat = (result.length === 2) ? 1 : 0;
    if (repeat) {
      // handling recurring events
      var frequency = await tryToCatch(smalltalk.prompt,
        'Repeat hourly, daily, weekly, monthly, or annually?',
        "Please type your selection exactly as the options appears)", "daily");
      if (frequency.length < 2) return;
      else frequency = frequency[1].toString();

      // minutely option currently ommitted since events css does not support such specificity and you can input non-integral hours
      switch (frequency) {
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

      var gap = 1;
      var timesRepeating = 1;
      // if (!frequency) window.alert("Please select from the available units of time for repeated events")

      if (frequency !== "") { // if we are repeating events
        var result = await tryToCatch(smalltalk.confirm, '', 'Every ' + frequency + "?", {
          buttons: {
            ok: 'Every ' + frequency ,
            cancel: 'Customize frequency',
          }
        });
        const every = (result.length === 2) ? 1: 0;

        if (!every) {
          gap = await tryToCatch(smalltalk.prompt,
          "How many " + frequency + "s in between each repeat?", "", "0");
          if (gap.length < 2) return;
          else gap = gap[1];
          // console.log("the gap", (gap));
          if (gap > 10) {
            window.alert("Please try a smaller interval of time between each of your events "+String.fromCodePoint("U+1F601"));
            return;
          }
        }

        if (gap === 1) {
          // window.prompt("For how many " + frequency + "s?", "10");
          result = await tryToCatch(smalltalk.prompt,
            "For how many " + frequency + "s?","", "10");
          if (result.length < 2) return;
          else timesRepeating = result[1].toString();
        }

        else {
          if (gap > 1) {
            // timesRepeating = window.prompt("Once every " + gap.toString() + " " + frequency.toString() + "s, how many times?", "10")
            timesRepeating = await tryToCatch(smalltalk.prompt,
              "Once every " + gap.toString() + " " + frequency.toString() + "s, how many times?","", "10");
            if (timesRepeating.length < 2) return;
            else timesRepeating = timesRepeating[1].toString();
          }
          else {
            // timesRepeating = window.prompt("Once every " + frequency + ", how many times?", "10");
            timesRepeating = await tryToCatch(smalltalk.prompt,
              "Once every " + frequency + ", repeat how many times?","", "10");
            timesRepeating = timesRepeating[1].toString();
          }
        }
      }
      this.addRecurringEvents(start, end, title, desc, frequency, gap, timesRepeating);
    }
    else {
      this.setState({
        events: this.state.events.concat({
          start: start,
          end: end,
          title: title,
          desc: desc
        })
      });
    }
  }

  async handleSelectToDelete(pEvent) {
    // const r = window.confirm("Event description: " + pEvent.desc + "\nWould you like to remove this event?")
    var r = await tryToCatch(smalltalk.confirm, 'Would you like to remove this event?', "Event description: " + pEvent.desc , {
      buttons: {
        ok: 'Remove',
        cancel: 'Do not remove',
      }
    });

    if (r.length === 2) {
      this.setState((prevState, props) => {
        const events = [...prevState.events]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        return {
          events
        };
      });
    }
  }

  render() {
    return ( <
      View handleSelectSlot = {
        this.handleSelectSlot
      }
      handleSelectToDelete = {
        this.handleSelectToDelete
      }
      Event = {
        this.Event
      }
      EventAgenda = {
        this.EventAgenda
      }
      events = {
        this.state.events
      }
      localizer = {
        localizer
      }
      addRecurringEvents = {
        this.addRecurringEvents
      }
      onEventResize = {
        this.resizeEvent
      }
      onEventDrop = {
        this.moveEvent
      }
      />
    )
  }
}
export default Calendar;
