
import React from 'react';
import Analytics from '../../tabs/Analytics';
import Calendar from '../../tabs/Calendar';
import Journal from '../../tabs/Journal';
import TaskDetail from '../../tabs/TaskDetail';
import ExTab from '../../tabs/ExTab';


const View = props => {
  var ret;
  switch (props.tabToDisplay) {
    case "analytics":
      ret = <Analytics
        registerFinalState={props.registerFinalState}
        previousState={props.tabInfo}
        taskKey={props.taskKey}/>;
      break;
    case "calendar":
      ret = <Calendar
        registerFinalState={props.registerFinalState}
        previousState={props.tabInfo}
        taskKey={props.taskKey}/>;
      break;
    case "journal":
      ret = <Journal
        registerFinalState={props.registerFinalState}
        previousState={props.tabInfo}
        taskKey={props.taskKey}/>;
      break;
    default:
      ret = <TaskDetail 
        model={props.model} 
        taskKey={props.taskKey}
        currentTask={props.currentTask}/>;
      break;
  }
  return (
    <div className="displayContainer" id="displayContainer">
        {ret}
        </div>
)
}

export default View;
