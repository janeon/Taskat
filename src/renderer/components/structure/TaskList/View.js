/*
 * This defines how we want to display the tasks.
 */
import React from 'react';
import "./TaskList.css";


// 'taskElementList' is a list of html elements that represent tasks.
const View = ({taskTitleElementList,deleteButton, newTaskButton}) => (
    <div id="tasklist-container">
            {newTaskButton}
            <div id="task-list">
                {taskTitleElementList}
            </div>

    </div>
);

export default View;