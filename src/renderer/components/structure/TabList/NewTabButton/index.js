import React from 'react';
import View from './View';
import './NewTabButton.css';

export default class NewTabButton extends React.Component {

    constructor(props) {
        super(props);

        this.options = props.options;

        this.state = {
            showOptions: false,
        };

        this.showOptions = this.showOptions.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
    }

    componentWillReceiveProps(props) {
        this.options = props.options;
    }

    /*
     * These two listeners are for closing the menu on clicks outside
     *
     *  see citation[1].
     */
    componentWillMount() {
        
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.onButtonClick, false);
    }

    /*
     * Convert 'options' to html elements.  
     */
    wrapTabOptions(options) {
        return options.map((opt, index) => {
            return (<div className="tab-option" 
                            key={index} 
                            value={opt}
                            onClick={(e) => this.onOptionClick(opt)}
                            > {opt} </div>);
        });
    }

    /*
     * Display the options when the button gets clicked, and remember which option is clicked
     */
    showOptions(e) {
        e.preventDefault();
        document.addEventListener('click', this.hideOptions, false);
    
        this.setState((state) => {
            state.showOptions = ! state.showOptions;
            return state;
        });
    }

    hideOptions(e) {
        if (e.target.className != "tab-option") {
            document.removeEventListener('click', this.hideOptions, false);
            this.setState((state) => {
                state.showOptions = false;
                return state;
             });
        } else {
            // let the option click handle it...
        }
    }

    /*
     * Actually create the new tab.  
     */
    onOptionClick(newTab) {
        console.log(newTab);
    }

    /*
     * Should I abstract this into its own DropdownButton component? 
     */
    render() {
        const wrappedOptions = this.wrapTabOptions(this.options);
        
        return (
                <div id="new-tab-button-container tab">
                    <div id="new-tab-button" onClick={this.showOptions}>
                        + Tab
                    </div>
                    { 
                        this.state.showOptions ? 
                        ( <div id="new-tab-button-option-list">
                            {wrappedOptions}
                        </div> ) : 
                        (null)
                    }
                </div>
        );
    }

}