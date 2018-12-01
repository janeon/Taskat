import React from 'react';
import { NO_EMPTY_TASK_TITLES, NO_DUPLICATE_TASK_TITLES} from '../../../../utilities/constants';

export default class NewTaskButton extends React.Component {

    constructor(props) {
        super(props);
        this.createTask = props.createTask;

        this.state = this.initialState();
        // what to show when nothing has been enetered.
        this.hint = "+ new task";
    }

    /*
     * Returns the initial value of state.
     */
    initialState() {
        return { value: '' }
    }

    /*
     * Update value to be whatever has been typed into the input box.
     */
    handleChange(e) {
        // see 'SyntheticEvents' as to why this is necessary...
        e.persist();
        this.setState((state) => {
            state.value = e.target.value;
            return state;
        });
    }

    /*
     * Try and create a task, if succesful, refresh the button's state,
     * otherwise show an alert and don't do anything.
     */
    handleSubmit(e) {
        e.persist();
        e.preventDefault();

        // grabbing title
        const newTitle = this.state.value;

        // check that input is ok
        if (this.filterInput(newTitle)) {
            // Try and create the task
            const taskCreated = this.createTask(newTitle);

            if (taskCreated) {
                // reset state...
                this.setState((state) => {
                    return this.initialState();
                });
            } else {
                alert(NO_DUPLICATE_TASK_TITLES);
            }
        } else {
            // output handled by filterInput()
        }
    }

    /*
     * Check that the input is not the empty string...
     */
    filterInput(newTitle) {
        if (newTitle === "") {
            alert(NO_EMPTY_TASK_TITLES);
            return false;
        } else {
            return true;
        }
    }

    /*
     * this would usually be in the 'View.js', but it felt like such a small
     * component, it made more sense to leave it in here.
     */
    render() {
        return (
            <div id="new-task-button">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        id="new-task-input"
                        type="text"
                        autoComplete="false"
                        ref="NewTabButtonInput"
                        placeholder={this.hint}
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}/>
                </form>
            </div>
        );
    }

}
