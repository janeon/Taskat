/*
 * This is where you define how the component will render 
 */
import React from 'react';
// import a css file if you need it
// import './ExTab.css'

// you can use argument you passed in to View.... (but you have to call them the same thing as you called 
// them when you passed them in from index.js's return <View title={mytitle} />);
const View = ({title}) => (
    <div className="ExTab">
        {title}
    </div>
);

export default View;

