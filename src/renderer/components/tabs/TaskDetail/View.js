import React from 'react';
import TaskDetail from "../TaskDetail"
import './taskDetail.css'

/*
 * Render the TaskDetail component, which allows for editing of a specific task.
 *
 * This passes down the information for the current task and the register for the
 * final state.
 */

const View = ({test, name, description, handleSubmit, handleDelete, model, handleNameChange, handleDescChange }) => {

  return (
    <div id="taskdetail">
      <h1>{name}</h1>
      <input className="deleteButton" type="delete" value="Delete This Task" onClick={handleDelete}/>
     	<form onSubmit={handleSubmit} >
	    		Task Name : <br/>
	    		<textarea id="nameArea" value={name} onChange={handleNameChange}>
	    		DEFAULT NAME
	    		</textarea>
		<br/>
	    		Task Description: <br/>
	    		<textarea id="descArea" value={description} onChange={handleDescChange}>
	    		DEFAULT DESCRIPTION
	    		</textarea>
	  		<input className="button" type="submit" value="Submit" />
		</form>
    </div>)}

export default View;
