import React from 'react';
// import a css file if you need it
// import './ExTab.css'

/*
 * This is where you define how the component will render 
 */

// you can use argument(s) you passed in to View.... (but you have to call them the same thing you called 
// them when you passed them in from index.js's // return <View title={mytitle} />) //;
const View = ({title, data, onClick}) => (
    <div>
        <div className="ExTab">{title}</div>
        <div>{data}</div>
            <button className="exbutton" onClick={onClick}>Click Me!</button>
    </div>
);

export default View;