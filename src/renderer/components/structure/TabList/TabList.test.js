import React from 'react';
import TabList from './index';
import {shallow, mount} from 'enzyme';
import { ALL_TABS } from '../../../utilities/constants';

describe('TabList', () => {

    const tabs = ["analytics", "journal", "calendar", "horoscope"];

    it('should inflate all tabs with title', () => {
        const tl = mount(<TabList tabList={tabs}/>);

        const allRenderedTabs = tl.find('.tab');

        // all tabs should be rendered
        expect(allRenderedTabs.length).toEqual(tabs.length);

        // all titles should be rendered
        allRenderedTabs.forEach( tabElement => {
            expect(tabs.includes(tabElement.text())).toEqual(true);
        });
    });

    it('should attach onClick methods', () => {
        const listener = new MockOnClickListener();
        const onClickMock = listener.onClick;

        const tl = mount(<TabList tabList={tabs} onTabClick={onClickMock}/>);

        const tabToClick = tl.findWhere((el) => el.text() === tabs[3]);

        tabToClick.simulate('click');

        expect(listener.currentTab).toEqual(tabs[3]);
    });

    it("should render new-tab-button", () => {

        const tl = mount(<TabList tabList={tabs}/>);

        const button = tl.find('#new-tab-button');

        expect(button.length).toEqual(1);
    });

    it("should parse options for newTabButton", () => {
        const tabs = ["analytics", "calendar"];

        const tlInst = shallow(<TabList tabList={tabs} />).instance();

        const correctOptions = ALL_TABS.filter(tab => ! tabs.includes(tab));

        expect(tlInst.parseTabOptions(tabs)).toEqual(correctOptions);
    });

    it("should wrap tab options", () => {
        const tabs = ["journal", "calendar"];

        const tlInst = shallow(<TabList tabList={tabs}/>).instance();

        const options = tlInst.parseTabOptions(tabs);

        const wrappedOptions = tlInst.wrapTabOptions(options);

        const correct = options.map(option => {
            return (<option className=".tab-option">{option}</option>);
        });

        expect(wrappedOptions).toEqual(correct);
    });

});

class MockOnClickListener {
    constructor() {
        this.onClick = this.onClick.bind(this);
        this.currentTab = "not yet set";
    }

    onClick(title) {
        this.currentTab = title;
    }
}