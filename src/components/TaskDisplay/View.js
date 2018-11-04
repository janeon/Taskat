import React from 'react';
import TabList from '../TabList';
import TabDisplay from '../TabDisplay';
import './TaskDisplay.css';
import Calendar from '../Calendar';
import BigCalendar from 'react-big-calendar-like-google';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

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
const View = props => {

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
