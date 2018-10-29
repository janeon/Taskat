/* 
 * This defines how we want to display the tasks. 
 */
import React from 'react';
import "./TaskList.css";

// 'taskElementList' is a list of html elements that represent tasks. 
const View = ({taskTitleElementList}) => (
    <div id="tasklist_container">
            {taskTitleElementList}
    </div>
);

export default View;