import Model from './Model';
import { getTestTaskListSmall, getTestTitleKeyListSmall } from '../test_resources/testutils.js';
import { InitialTask } from '../utilities/general_content.js';

describe('Model', () => {
    it('constructs a new Model', () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());
        expect(model.resources !== null);
    });

    it('allows subscription to task title/key list', () => { 
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());

        var obs = new MockObserver();
            
        model.subscribeTo(obs, "title_key_list");

        // should be equal to the title key list
        expect(obs.data).toEqual(getTestTitleKeyListSmall());
    });

    it('allows subscription to current task', () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());
        model.resources.currentTask.updateData(new InitialTask());
        
        var obs = new MockObserver();

        model.subscribeTo(obs, "current_task");

        expect(obs.data).toEqual(new InitialTask());
    });

    it('unsubscribes observers from resources with \'unsubscribeFrom()\'', () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());

        model.resources.currentTask.updateData(new InitialTask());

        var obs = new MockObserver();

        model.subscribeTo(obs, "current_task");

        model.unsubscribeFrom(obs, "current_task");

        expect(model.resources.currentTask.subscribers.length).toEqual(0);
    });

    it("updates recorded state on 'registerFinalState()'", () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());

        const testTask = model.resources.taskList[2].getData();

        // usually you don't grab tabs by index...
        const tab = testTask.tabs[0];
        // creating alternate state... (also know as the tab's 'info')
        const newState = {label: "new_state"};
        tab.info = newState;
        model.registerFinalState(tab.title, tab.info, testTask.key);

        expect(model.resources.taskList[2].getData().tabs[0].info).toEqual(newState);
    });

});

/*
 * Mock implementation of an observer object
 */
class MockObserver {
    constructor() {
        this.data = [];
    }

    onChange(newData) {
        this.data = newData;
    }
}