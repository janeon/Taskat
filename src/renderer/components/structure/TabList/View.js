import React from 'react';

import NewTabButton from './NewTabButton';
import "./TabList.css";

const View = ({tabElementList}) => (
    <div id="tab-list-container">
        <div id="tab-list">
            {tabElementList}
        </div>
        <div id="new-tab-button">

        </div>
    </div>
);

export default View;