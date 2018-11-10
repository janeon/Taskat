import Resources from './Resources';
import { getTestTaskListSmall, getTestTitleKeyListSmall, getNewTestTask } from '../test_resources/testutils';
import ObservableData from './ObservableData';

describe('Resources', () => {

    // This also verifies that it parses the titles correctly. 
    it('properly inits resources in constructor', () => {
        const res = new Resources(getTestTaskListSmall());

        expect(res.titleKeyList.getData()).toEqual(getTestTitleKeyListSmall());
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
});