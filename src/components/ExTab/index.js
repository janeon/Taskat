/*
 * This is the file where you write all your business logic, and it defines the class 
 * that will extend React.Component, and be rendered into the DOM.  
 * 
 * I would advise making a fake task in the constructor, which will later be replaced by 
 * a subscripting to the state of data in the model.  You can assume that any information 
 * you need will be included in the task-tab you create, and we'll figure out how to 
 * get it there when the rest of it render the way you want it to :) (it won't be hard, 
 * just more complicated than I can describe here).  
 * 
 * You can test this by adding <ExTab /> into the TabDisplay/View.js file (between the <div>'s)
 */
import React, { Component } from 'react';
import View from './View';

// this 'export default' is how we get it in other files, but it can also go at the end of the file (see 1.)
export default class ExTab extends Component {

    constructor(props) {
        // have to call this so we don't overwrite the general React.Component constructor
        super(props);
        /*
         * 'props' contains fields that correspond to the arguments passed into this object, for example, 
         * if TabDisplay's render method (defined in TabDisplay/View.js) created <ExTab title={mytitle} />, 
         * then ExTab's 'props' would have a property called 'props.title', with whatever value 'mytitle' was. 
         */

        // You have to provide an initial value for 'state' if you are going to use it. 
        this.state = {
            data: []
        }

        this.mytitle = "tomatoes, apples, big difference.";

        // If you leave this blank, you will get linter warnings about 'useless constructors'.

        // it's also a good spot to initialize the 'state' of this component.  
    }

    /*
     * This is a lifecycle method that gets called after this element gets loaded into the DOM. 
     */
    componentDidMount() {
        // it's where you want to subscribe to whatever data you need in the model
        // this.model.subscribe() THIS PROTOCOL IS PROBABLY GOING TO CHANGE
    }

    /*
     * Another lifecycle method that gets called 
     */
    componentWillUnmount() {
        // this is where you should '.unsubscribe(this)' from the model.  
    }

    /*
     * This function is what the model will call if the data it's subscribed to changes. 
     */
    onChange(updatedData) {
        // Set takes as an argument a function that takes the 'state' (and optionally the props)
        // and returns the newState.  
        this.setState((state) => {
            // how do you want to change this state based on the old state? 
            // 'state' is the old state, and you return the new state.  
            return state.data = updatedData;
        });
    }
    
    // This is the function that will actually return the html element that show up in the DOM.  
    render() {
        // pass this anything that it will need (for instance, I am going to pass a string)
        return <View title={this.mytitle}/>;
    }
}

// 1.  'export default Extab'

