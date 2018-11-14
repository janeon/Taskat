import React, { Component } from 'react';
import View from './View';

/*
 * This is the file where you write all your business logic, and it defines the class 
 * that will extend React.Component, and be rendered into the DOM.  
 * 
 * I would advise making a fake copy of all the info you need from the task in the constructor, which will later be 
 * replaced be supplied by TabDisplay.  You can assume that any information 
 * you need will be included in the tab/component you create, and we'll figure out how to 
 * get it there when the rest of it renders the way you want it to :) (it won't be hard, 
 * just more complicated than I can describe here).  
 * 
 * You can test this by adding <ExTab /> into the TabDisplay/View.js file (between the <div>'s)
 */

// this 'export default' is how we get it in other files, but it can also go at the end of the file (see 1.)
export default class ExTab extends Component {

    constructor(props) {
        // have to call this so we don't overwrite the general React.Component constructor, 
        // and it you don't, you will get an error that 'this' is not defined. 
        super(props);
        /*
         * 'props' contains fields that correspond to the arguments passed into this object, for example, 
         * if TabDisplay's render method (defined in TabDisplay/View.js) created <ExTab title={mytitle} />, 
         * then ExTab's 'props' would have a property called 'props.title', with whatever value 'mytitle' was. 
         */

        

        // This is a good spot to initialize the 'state' of this component. 
        // You have to provide an initial value for 'state' if you are going to use it, it will probably be passed in via 
        // the 'props'.  
        this.state = {
            data: 0
        }

        this.mytitle = "tomatoes, apples, big difference.";

        // You have to bind functions you are going to pass so that when they get called, they know what 'this' is
        this.onClick = this.onClick.bind(this);

        this.key = props.taskKey;

        this.deleteTask = props.deleteTaskOnClick;
        
    }

    componentWillReceiveProps(newProps) {
        this.key = newProps.taskKey
        console.log(this.key)
    }

    /*
     * lifecycle method that gets called when the component is being removed from the DOM 
     */
    componentWillUnmount() {
        // this is where you record your final state to the model
        // ex --> this.recordFinalState("ex_tab", this.state);
        // this is commented out because I'm not passing in the register function yet :)
    }

    // defining the click method to pass to the button
    onClick() {
        /* this.setState((state) => {
            state.data += 1;
            return state;
        }); */
        
        this.deleteTask(this.key);
    }
    
    // This is the function that will actually return the html element that shows up in the DOM.  
    render() {
        // pass this anything that it will need (for instance, I am going to pass a string)
        return <View title={this.mytitle} data={this.state.data} onClick={this.onClick}/>;
    }
}



