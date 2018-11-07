import Resources from './Resources'
import { getTestTaskListSmall, getTestTitleKeyListSmall } from '../test_resources/testutils'

describe('Resources', () => {

    // This also verifies that it parses the titles correctly. 
    it('properly inits resources in constructor', () => {
        const res = new Resources(getTestTaskListSmall());

        expect(res.titleKeyList.getData()).toEqual(getTestTitleKeyListSmall());
    });
});