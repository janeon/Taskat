import React from 'react';

const View = (optionElements) => (
    <div id="new-tab-button">
        <button>Click Me!</button>
        <select>
            {optionElements}
        </select>
    </div>
);

export default View;