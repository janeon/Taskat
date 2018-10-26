/* 
 * This is defines how we want to display the tasks. 
 */

import React from 'react';
import "./TaskList.css";

// 'taskElementList' is a list of html elements that represent tasks. 
const View = ({taskElementList}) => (
    <div id="tasklist_container">
            {taskElementList}
    </div>
);

export default View;