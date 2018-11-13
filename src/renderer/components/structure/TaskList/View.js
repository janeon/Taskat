/* 
 * This defines how we want to display the tasks. 
 */
import React from 'react';
import "./TaskList.css";
import NewTaskButton from './NewTaskButton';

// 'taskElementList' is a list of html elements that represent tasks. 
const View = ({createTask, taskTitleElementList}) => (
    <div id="tasklist_container">
            <div className="task" id="newTaskButtonContainer">
                <NewTaskButton createTask={createTask}/>
            </div>
            <div id="tasklist">
                {taskTitleElementList}
            </div>
            
    </div>
);

export default View;