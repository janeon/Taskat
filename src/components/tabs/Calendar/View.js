import React, { Component } from 'react'; // This begins as an empty container, but we will have a function that fills it on tab clicks.
import BigCalendar from 'react-big-calendar';
import moment from 'moment'
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
/* The current version of big calendar implemented here is the most basic, the package also allows:
- event creation
- Localization
- show more via popup
- drag and drop
*see more here http://intljusticemission.github.io/react-big-calendar/examples/index.html
Q&A about big-calendar availale on Discord https://discordapp.com/channels/102860784329052160/424364360731852800
// https://github.com/intljusticemission/react-big-calendar/issues/234
*/
const localizer = BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
const View = props => {
  const myEventsList = [
    {
      allDay: false,
      end: new Date('November 01, 2018 11:15:00'),
      start: new Date('November 01, 2018 11:13:00'),
      title: 'hi',
    },
    {
      allDay: true,
      end: new Date('December 09, 2017 11:13:00'),
      start: new Date('December 09, 2017 11:13:00'),
      title: 'All Day Event',
    },
  ];
  return (
    <div className="displayContainer">
      <div className="rbc-calendar">
              <BigCalendar
              selectable
              events={myEventsList}
              defaultView={BigCalendar.Views.DAY}
              views={allViews}
              startAccessor='startDate'
              endAccessor='endDate'
              localizer={localizer}
              defaultDate={new Date(2018, 10, 6)}
              onSelectEvent={event => alert(event.title)}
              onSelectSlot={props.handleSelect}
              />
              </div>
    </div>
)}








export default View;
