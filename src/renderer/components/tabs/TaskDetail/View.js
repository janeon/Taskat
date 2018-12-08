import React from 'react';
import TaskDetail from "../TaskDetail"
import './taskDetail.css'

/*
 * Render the TaskDetail component, which allows for editing of a specific task.
 *
 * This passes down the information for the current task and the register for the
 * final state.
 */

const View = ({test, name, description, handleSubmit, handleDelete, handleNameChange, handleDescChange }) => {

  return (
    <div id="taskdetail">
      <h1>{name}</h1>
     	<form onSubmit={handleSubmit}>
	    		Task Name: <br/>
	    		<textarea id="nameArea" value={name} onChange={handleNameChange}/> <br/>
	    		Task Description: <br/>
	    		<textarea id="descArea" value={description} onChange={handleDescChange}/>
	  		<input className="button" type="submit" value="Save" />
		</form>
    <input className="deleteButton" type="delete" value="Task Complete!" onClick={handleDelete} readOnly/>
    </div>)}

export default View;
