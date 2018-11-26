import React from 'react';
import "./TabList.css"

/*
 * Render the TaskDetail component, which allows for editing of a specific task. 
 *
 * This passes down the information for the current task and the register for the 
 * final state.
 */

const View = ({task, registerFinalState}) => {

  return (
    <div id="taskdetail">
      {task} 
      {registerFinalState}/>  
    </div>)}

export default View;