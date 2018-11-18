import Resources from './Resources';
import { getTestTaskListSmall, getTestTitleKeyListSmall, getNewTestTask } from '../test_resources/testutils';
import ObservableData from './ObservableData';

describe('Resources', () => {

    // This also verifies that it parses the titles correctly. 
    it('properly inits resources in constructor', () => {
        const res = new Resources(getTestTaskListSmall());

        expect(res.titleKeyList.getData()).toEqual(getTestTitleKeyListSmall());
    });

    it("should return task data on 'getTask()'", () => {
        const res = new Resources(getTestTaskListSmall());

        const key = 2;
        const correctTask = getTestTaskListSmall().filter(t => t.key === key)[0];

        expect(res.getTask(key)).toEqual(correctTask);
    });

    it("should update 'titleKeyList' on calls to 'refreshTitleKeyList'", () => {
        const res = new Resources(getTestTaskListSmall());

        const newTaskObs = new ObservableData();
        newTaskObs.updateData(getNewTestTask());
        
        res.taskList.push(newTaskObs);

        // should be the same length as it was, even though there is a new task
        expect(res.titleKeyList.getData().length).toEqual(getTestTaskListSmall().length);

        res.refreshTitleKeyList();

        // should be the new length now...
        expect(res.titleKeyList.getData().length).toEqual(getTestTaskListSmall().length + 1);
    });

    it("adds tasks", () => {
        const res = new Resources(getTestTaskListSmall());

        const newTask = getNewTestTask();

        res.addTask(newTask);

        const correctList = getTestTaskListSmall();
        correctList.push(newTask);

        expect(res.taskList.map(task => task.getData())).toEqual(correctList);
    });

    it("removes a task", () => {
        const res = new Resources(getTestTaskListSmall());

        const taskToRemove = getTestTaskListSmall()[2];

        res.removeTask(taskToRemove.key);

        expect(res.taskList.length).toEqual(getTestTaskListSmall().length - 1);
        expect(res.taskList.filter(task => task.key == taskToRemove.key)).toEqual([]);
    });

    it("edits tasks via 'updateTask' method", () => {
        const res = new Resources(getTestTaskListSmall());

        const editedTask = getTestTaskListSmall()[1];
        editedTask.tabs = editedTask.tabs.filter(tab => tab.title !== "analytics");

        res.updateTask(editedTask);

        expect(res.taskList.filter(taskObs => taskObs.getData().key === editedTask.key)[0].getData()).toEqual(editedTask);
    })

    it("should return the unwrapped tasklist", () => {
        const res = new Resources(getTestTaskListSmall());

        expect(res.getUnwrappedTaskList()).toEqual(getTestTaskListSmall());
    });
});