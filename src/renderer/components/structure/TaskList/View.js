/*
 * This defines how we want to display the tasks.
 */
import React from 'react';
import "./TaskList.css";


// 'taskElementList' is a list of html elements that represent tasks.
const View = ({taskTitleElementList,deleteButton, newTaskButton}) => (
    <div id="tasklist-container">
     <button className="deleteButton" onClick={createTask}> Delete Task </button>
            <div className="task" id="new-task-button-container">
                <NewTaskButton createTask={createTask}/>
            </div>
            <div id="task-list">
                {taskTitleElementList}
            </div>

    </div>
);

export default View;
