import React from 'react';
import View from './View';
import './NewTabButton.css';
import ReactTooltip from 'react-tooltip'

export default class NewTabButton extends React.Component {

    constructor(props) {
        super(props);
        this.options = props.options;
        this.taskKey = props.taskKey;
        this.addTabToTask = props.addTabToTask;
        this.state = { showOptions: false };
        this.showOptions = this.showOptions.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
    }

    componentWillReceiveProps(props) {
        this.options = props.options;
        this.taskKey = props.taskKey;
        // again, don't need to refresh the addtab function.
        this.state.showOptions = false;
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
                            >{opt}</div>);
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

    /*
     * Hide the options when you don't need to see them.
     */
    hideOptions(e) {
        document.removeEventListener('click', this.hideOptions, false);

        // if the button isn't displayed, don't update its state
        if (e.target.className != "tab-option") {
            this.setState((state) => {
                state.showOptions = false;
                return state;
            });
        }
    }

    /*
     * Actually create the new tab.
     */
    onOptionClick(newTab) {
        //console.log(`adding ${newTab} to task: ${this.taskKey}`)
        this.addTabToTask(this.taskKey, newTab);
    }

    /*
     * Should I abstract this into its own DropdownButton component?
     */
    render() {
        const wrappedOptions = this.wrapTabOptions(this.options);

        return (
                <div id="new-tab-button-container-tab" data-tip="Click to add new tabs!">
                    <div id="new-tab-button" onClick={this.showOptions}>
                        + Tab
                    </div>
                    <ReactTooltip />

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
