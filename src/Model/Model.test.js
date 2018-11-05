import Model from './Model';
import { getTestTaskListSmall, getTestTitleKeyListSmall } from '../TestResources/testutils.js';

describe('Model', () => {
    it('constructs a new Model', () => {
        const model = new Model(true, getTestTaskListSmall());
        expect(model.resources !== null);
    });

    it('allows subscription and updates on task title list', () => { 
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());

        var obs = {
            taskTitles: [],
            onChange: (newTitles) => {
                obs.taskTitles = newTitles;
            }
        };

        model.subscribeTo(obs, "title_key_list");

        expect(obs.taskTitles).toEqual(getTestTitleKeyListSmall());
    });

});