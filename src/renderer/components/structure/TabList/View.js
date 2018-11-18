import React from 'react';
import "./TabList.css"

import NewTabButton from './NewTabButton';

const View = ({tabElementList, newTabButtonTabs, displayNewTabButton, addTabToTask, taskKey}) => (
    <div id="tab-list-container">
        <div id="tab-list">
            {tabElementList}
        </div>
        { 
            displayNewTabButton ? 
            ( <NewTabButton 
                options={newTabButtonTabs} 
                addTabToTask={addTabToTask}
                taskKey={taskKey}/> )
            : 
            ( null ) 
        }
    </div>
);

export default View;