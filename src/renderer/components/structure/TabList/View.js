import React from 'react';
import NewTabButton from './NewTabButton';
import "./TabList.css";

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
                taskKey={taskKey}
                /> )
            :
            ( null )
        }
    </div>
);

export default View;
