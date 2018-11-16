import React from 'react';
import "./TabList.css"

import NewTabButton from './NewTabButton';

const View = ({tabElementList, newTabButtonTabs}) => (
    <div id="tab-list-container">
        <div id="tab-list">
            {tabElementList}
        </div>
        <NewTabButton options={newTabButtonTabs}/>
    </div>
);

export default View;