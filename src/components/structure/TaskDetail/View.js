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
      {task, registerFinalState}/> 
     <form onSubmit={handleSubmit}>
  	<label>
    	Task Name:
    	<input type="text" value={taskName} onChange={handleChange} />
  	</label>
  	<label>
    	Task Description:
    	<input type="text" value={taskName} onChange={handleChange} />
  	</label>
  <input type="submit" value="Submit" />
</form>
    </div>)}

export default View;