import Model from './Model';
import { getTestTaskListSmall, getTestTitleKeyListSmall, getNewTestTask } from '../test_resources/testutils.js';
import { InitialTask } from '../utilities/general_content.js';
import ObservableData from './ObservableData';
import { NO_DUPLICATE_TASK_TITLES } from '../utilities/constants';

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

    it("updates 'current_task' with updateCurrentTask function", () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());

        const obs = new MockObserver();

        model.subscribeTo(obs, "current_task");

        expect(obs.data.key).toEqual(-1);

        model.updateCurrentTask(1);

        expect(obs.data).toEqual(model.resources.currentTask.getData());
    });

    it("should find maxkey from titlekeylist", () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());

        expect(model.findMaxKey(getTestTitleKeyListSmall())).toEqual(3);
    });

    it("should allow tasks to be added", () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());

        const newTask = "new task";

        model.createTask(newTask);

        const correctList = getTestTaskListSmall();

        // this is what the correctly init'd task should look like.  
        correctList.push({title: "new task", key: 4, tabs: [{title: "menu", info: []}]});

        expect(model.resources.taskList.map(task => task.getData())).toEqual(correctList);
    });

    it("should filter duplicate titles when adding a task", () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());

        const duplicateTitle = getTestTaskListSmall()[2].title;

        expect(model.createTask(duplicateTitle)).toEqual(false);
    });

    it("remove deleted tasks from titlekeylist", () => {
        // and deletion should also change current task back to the welcome task
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());

        const keyToRemove = 2;

        model.deleteTask(keyToRemove);

        const resultingTitleKeyList = model.resources.titleKeyList.getData();

        expect(resultingTitleKeyList.length).toEqual(getTestTaskListSmall().length - 1);
        expect(resultingTitleKeyList.filter(tk => tk.key === keyToRemove)).toEqual([]);
    });

    it("should reset current task to the InitialTask on deletion", () => {
        const testing = true;


    });

    it("should edit tasks", () => {
        const model = new Model(true, getTestTaskListSmall());

        const task = getTestTaskListSmall()[1];

        // remove the calendar tab
        task.tabs = task.tabs.filter(tab => tab.title !== "calendar");

        model.updateTask(task);

        expect(model.resources.taskList.filter(taskObs => taskObs.getData().key === 1)[0].getData()).toEqual(task);
    });

    it("should add tabs to task", () => {
        const model = new Model(true, getTestTaskListSmall());

        // 'get pizza', it doesn't have a calendar
        const task = getTestTaskListSmall()[0];

        model.addTabToTask(task.key, "calendar");

        const correctTabs = getTestTaskListSmall()[0].tabs.map(tab => tab.title);
        correctTabs.push("calendar");

        expect(model.resources.getTask(task.key).tabs.map(tab => tab.title)).toEqual(correctTabs);
    });

    it("should remove tabs from task", () => {
        const model = new Model(true, getTestTaskListSmall());

        // 'get pizza' has a 'journal' tab
        const task = getTestTaskListSmall()[0];

        model.removeTabFromTask(task.key, "journal");

        const correctTabs = getTestTaskListSmall()[0].tabs.filter(tab => tab.title != "journal");

        expect(model.resources.getTask(task.key).tabs).toEqual(correctTabs);
    })

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