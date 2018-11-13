import React from 'react';
import ExTab from '../../tabs/ExTab';
import Calendar from '../../tabs/Calendar';
import Analytics from '../../Analytics';
import Journal from '../../Journal';
/* IMPORTANT: as I am committing, I have just been commenting out the line where we've been putting
 *
 * our code to debug/render it :)
 */
/*
 * TAB IMPORTS:
/*
 * This begins as an empty container, but we will have a function that fills it
 * on tab clicks.
 */

var View = props => {
  // console.log("Tabtype",props.tabToDisplay); // testing what props look like as passed from tabdisplay
  var ret;
  switch (props.tabToDisplay) {
    case "analytics":
      ret = <Analytics/>;
      break;
    case "calendar":
      ret = <Calendar/>;
      break;
    case "journal":
      ret = <Journal/>;
      break;
    default:
      ret = <ExTab/>;
  }
  return (
    <div className="displayContainer">
        {ret}
    </div>
)
}

export default View;
