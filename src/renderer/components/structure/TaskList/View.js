/* 
 * This defines how we want to display the tasks. 
 */
import React from 'react';
import "./TaskList.css";
import NewTaskButton from './NewTaskButton';

// 'taskElementList' is a list of html elements that represent tasks. 
const View = ({createTask, taskTitleElementList}) => (
    <div id="task-list-container">
            <div className="task" id="new-task-button-container">
                <NewTaskButton createTask={createTask}/>
            </div>
            <div id="task-list">
                {taskTitleElementList}
            </div>
            
    </div>
);

export default View;