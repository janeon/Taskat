import React from 'react';

import NewTabButton from './NewTabButton';
import "./TabList.css";

<<<<<<< HEAD
const View = ({tabElementList}) => (
=======
import NewTabButton from './NewTabButton';

const View = ({tabElementList, newTabButtonTabs, displayNewTabButton, addTabToTask, taskKey}) => (
>>>>>>> new-tab-button
    <div id="tab-list-container">
        <div id="tab-list">
            {tabElementList}
        </div>
<<<<<<< HEAD
        <div id="new-tab-button">

        </div>
=======
        { 
            displayNewTabButton ? 
            ( <NewTabButton 
                options={newTabButtonTabs} 
                addTabToTask={addTabToTask}
                taskKey={taskKey}/> )
            : 
            ( null ) 
        }
>>>>>>> new-tab-button
    </div>
);

export default View;