import React from 'react'; // This begins as an empty container, but we will have a function that fills it on tab clicks.
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import './Calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import moment from 'moment'
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

/* The current version of big calendar implemented here is the most basic, the package also allows:
- event creation
- Localization
- show more via popup
- drag and drop
*see more here http://intljusticemission.github.io/react-big-calendar/examples/index.html
Q&A about big-calendar availale on Discord https://discordapp.com/channels/102860784329052160/424364360731852800
// https://github.com/intljusticemission/react-big-calendar/issues/234
*/
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

const View = props => {
  var event = props.Event;
  var eventAgenda = props.EventAgenda;
  var today = new Date();
  // console.log("this is the list of events", props.events);
  return (
    /*<div className="displayContainer">*/
      <div className="rbc-calendar">
      <DragAndDropCalendar
      selectable
      events={props.events}
      defaultView={BigCalendar.Views.MONTH}
      defaultDate={today}
      views={allViews}
      step={30}
      startAccessor='start'
      endAccessor='end'
      localizer={props.localizer}
      onEventDrop={props.onEventDrop}
      onSelectEvent={event => props.handleSelectToDelete(event)}
      onSelectSlot={event => props.handleSelectSlot(event)}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
      resizable
      onEventResize={event => props.onEventResize(event)}
      showMultiDayTimes
      components={{
        event: event,
        agenda: {event: eventAgenda}
      }}
      />
      {/*
              <BigCalendar
              selectable
              events={props.events}
              defaultView={BigCalendar.Views.DAY}
              views={allViews}
              step={30}
              startAccessor='start'
              endAccessor='end'
              localizer={props.localizer}
              defaultDate={today}
              onSelectEvent={event => props.handleSelectToDelete(event)}
              onSelectSlot={event => props.handleSelectSlot(event)}
              resizable
              onEventResize={props.onEventResize}
              showMultiDayTimes
              components={{
                event: event,
                agenda: {event: eventAgenda}
              }}
              />
              */}
              </div>
    /*</div>*/
)}








export default View;
