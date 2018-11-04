import React from 'react';
// This begins as an empty container, but we will have a function that fills it on tab clicks.
import BigCalendar from 'react-big-calendar-like-google';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
// https://github.com/intljusticemission/react-big-calendar/issues/234
/* The current version of big calendar implemented here is the most basic, the package also allows:
- event creation
- Localization
- show more via popup
- drag and drop
*see more here http://intljusticemission.github.io/react-big-calendar/examples/index.html
Q&A about big-calendar availale on Discord https://discordapp.com/channels/102860784329052160/424364360731852800
*/
const localizer = BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

const View = props => {
  const myEventsList = [
    {
      allDay: false,
      end: new Date('December 10, 2017 11:13:00'),
      start: new Date('December 09, 2017 11:13:00'),
      title: 'hi',
    },
    {
      allDay: true,
      end: new Date('December 09, 2017 11:13:00'),
      start: new Date('December 09, 2017 11:13:00'),
      title: 'All Day Event',
    },
  ];
  /*
  TODO: Things to fix
  - vertical overflow in views other than month
  - align vertical location of back and forward buttons for month views
  - fix horizonal squishing in all non-month views
  - be able to add an event based on start and end times
  */
  return (
    <div className="displayContainer">
      <div className="rbc-calendar">
              <BigCalendar
              events={myEventsList}
              views={allViews}
              startAccessor='startDate'
              endAccessor='endDate'
              localizer='localizer'
              />
              </div>
    </div>
)}

export default View;
