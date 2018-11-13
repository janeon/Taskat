import React from 'react';
// import ExTab from '../../tabs/ExTab';
import Calendar from '../../tabs/Calendar';
/* IMPORTANT: as I am committing, I have just been commenting out the line where we've been putting
 *
 * our code to debug/render it :)
 */

/*
 * TAB IMPORTS:
 *  import ExTab from '../ExTab/';
 *  import Calendar from '../../tabs/Calendar';
 */


/*
 * This begins as an empty container, but we will have a function that fills it
 * on tab clicks.
 */

const View = props => {
  // console.log("Props for TabDisplay",props); // testing what props look like as passed from tabdisplay
  return (
    <div className="displayContainer">
        {/* <ExTab /> */}
        <Calendar />
    </div>
)
}

export default View;
