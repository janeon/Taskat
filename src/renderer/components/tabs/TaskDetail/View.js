import React from 'react';
import TaskDetail from "../TaskDetail"
import './taskDetail.css'

/*
 * Render the TaskDetail component, which allows for editing of a specific task.
 *
 * This passes down the information for the current task and the register for the
 * final state.
 */

const View = ({name, description, handleSubmit, handleDelete, model }) => {

  return (
    <div id="taskdetail">
      <h1>Edit</h1>
      <input className="deleteButton" type="delete" value="Delete This Task" onClick={handleDelete}/>
	  		<label>
	    		Task Name:
	    		<input type="text" value={name} />
	  		</label>
	  		<label>
	    		Task Description:
	    		<input type="text" value={description} />
	  		</label>
	  		<input className="button" type="submit" value="Submit" />
    </div>)}

export default View;
