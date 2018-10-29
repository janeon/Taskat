import Model from './Model'
import { getTestTaskListSmall, getTestTaskListTitlesSmall } from '../TestResources/testutils.js'

describe('Model', () => {
    it('constructs a new Model', () => {
        const model = new Model();
        expect(model !== null);
    });

    it('returns list of titles on \'getAllTaskTitles()\'', () => {
        const model = new Model();
        model.allTasks.updateData(getTestTaskListSmall());

        const titles = model.getAllTaskTitles();
        const correctTitles = getTestTaskListTitlesSmall();

        expect(titles).toEqual(correctTitles)
    });

});