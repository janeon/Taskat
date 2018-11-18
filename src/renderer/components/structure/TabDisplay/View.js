
import React from 'react';
import Analytics from '../../tabs/Analytics';
import Calendar from '../../tabs/Calendar';
import Journal from '../../tabs/Journal';
import ExTab from '../../tabs/ExTab';


const View = props => {
  // console.log("Props for TabDisplay",props.tabToDisplay); // testing what props look like as passed from tabdisplay
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
        {/* <ExTab /> */}
        {/* <Calendar /> */}
        {ret}
    </div>
)
}

export default View;
