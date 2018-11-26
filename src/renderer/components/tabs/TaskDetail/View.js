import React from 'react';
import TaskDetail from "../TaskDetail"

/*
 * Render the TaskDetail component, which allows for editing of a specific task. 
 *
 * This passes down the information for the current task and the register for the 
 * final state.
 */

const View = ({name, description,registerFinalState, handleSubmit, value, handleChange, }) => {

  return (
    <div id="taskdetail"> 
     	<form onSubmit={handleSubmit}>
	  		<label>
	    		Task Name:
	    		<input type="text" value={name} />
	  		</label>
	  		<label>
	    		Task Description:
	    		<input type="text" value={description} />
	  		</label>
	  		<input type="submit" value="Submit" />
		</form>
    </div>)}

export default View;