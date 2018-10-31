import React from 'react';
import TabList from '../TabList';
import TabDisplay from '../TabDisplay';
import './TaskDisplay.css';
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
  return (
    <div id="taskdisplay">
      <TabList />
      <TabDisplay />
      <div className="rbc-calendar">
              <BigCalendar
              events={myEventsList}
              views={allViews}
              startAccessor='startDate'
              endAccessor='endDate'
              localizer='localizer'
              />
              </div>

    </div>)}

export default View;
