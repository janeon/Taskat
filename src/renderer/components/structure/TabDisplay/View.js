
import React from 'react';
import Analytics from '../../tabs/Analytics';
import Calendar from '../../tabs/Calendar';
import Journal from '../../tabs/Journal';
import TaskDetail from '../../tabs/TaskDetail';
import ExTab from '../../tabs/ExTab';
// import ReactTooltip from 'react-tooltip'

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
      ret = <div ><Calendar
        model={props.model}
        registerFinalState={props.registerFinalState}
        previousState={props.tabInfo}
        taskKey={props.taskKey}/></div>
        ;
      break;
    case "journal":
      ret = <Journal
        registerFinalState={props.registerFinalState}
        previousState={props.tabInfo}
        taskKey={props.taskKey}/>;
      break;
    default:
      ret = <div> <TaskDetail
        model={props.model}
        taskKey={props.taskKey}
        currentTask={props.currentTask}/> </div>;
      break;
  }
  return (
        <div className="displayContainer" id="displayContainer" >
        {ret}

        </div>
)
}

export default View;
