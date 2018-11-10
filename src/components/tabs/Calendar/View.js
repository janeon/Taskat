import React, { Component } from 'react'; // This begins as an empty container, but we will have a function that fills it on tab clicks.
import BigCalendar from 'react-big-calendar';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import events from 'events'
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
  const event = props.Event;
  const eventAgenda = props.EventAgenda;
  // console.log("this is the list of events", props.events);
  var myEventsList = props.events;
  const localizer = props.localizer;
  return (
    <div className="displayContainer">
      <div className="rbc-calendar">
              <BigCalendar
              selectable
              events={myEventsList}
              defaultView={BigCalendar.Views.DAY}
              views={allViews}
              step={30}
              startAccessor='startDate'
              endAccessor='endDate'
              localizer={localizer}
              defaultDate={new Date(2018, 10, 6)}
              onSelectEvent={event => alert(event.title)}
              onSelectSlot={props.handleSelect}
              showMultiDayTimes
              components={{
                event: event,
                agenda: {
                event: eventAgenda
             }
}}
              />
              </div>
    </div>
)}








export default View;
