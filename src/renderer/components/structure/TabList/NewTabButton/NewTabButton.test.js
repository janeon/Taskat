import React from 'react';
import NewTabButton from './index';
import {shallow, mount} from 'enzyme';
import { getMockEvent } from '../../../../test_resources/testutils';


describe("NewTabButton", () => {

    const test_opts = ["calendar", "analytics"];

    it("should render correct number of options", () => {
        const ntb = mount(<NewTabButton options={test_opts}/>);

        // they are hidden by default...
        ntb.instance().showOptions(getMockEvent());
        ntb.update();
        const options = ntb.find(".tab-option");

        expect(options.length).toEqual(test_opts.length);
    });  

    it("should attach options clicks", () => {
        const optionsClickListener = jest.fn();
        const ntb = mount(<NewTabButton taskKey={3}options={test_opts} addTabToTask={optionsClickListener}/>);
        
        ntb.instance().onOptionClick("journal");

        expect(optionsClickListener).toHaveBeenCalledWith(3, "journal");

    });

    // Also tests that options are hidden by default
    it("should display options on call to showOptions", () => {
        const ntb = mount(<NewTabButton options={test_opts}/>);

        const displayedOpts = ntb.find('.tab-option');

        expect(displayedOpts.length).toBe(0);

        ntb.instance().showOptions(getMockEvent());


    });

    it("should hide options on clicks outside the options dropdown", () => {
        const map = {};
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = (e) => cb({target: {className: "not-to"}});
        });

        const ntb = mount(<NewTabButton options={test_opts}/>);
        ntb.instance().showOptions(getMockEvent());

        map.click();

        ntb.update();

        expect(ntb.instance().state.showOptions).toBe(false);
    });

    it("should hide options on clicks inside dropdown", () => {
        // this is inadvertently tested in the last method, 
        // which verifies that all clicks after dropdown is displayed
        // will trigger 'hideOptions()', closing the menu.  
    });

    it("should add the document.eventListener when showOptions is invoked", () => {
        const map = {};
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });

        const ntb = mount(<NewTabButton options={test_opts}/>);

        expect(map.click).toEqual(undefined);

        ntb.instance().showOptions(getMockEvent());

        expect(map.click.toString()).toEqual(ntb.instance().hideOptions.toString());
    });

    it("should remove the document.eventListener when event outside clicks occur", () => {
        const map = {};
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        document.removeEventListener = jest.fn((event, cb) => {
            map[event] = undefined;
        });

        const ntb = mount(<NewTabButton options={test_opts}/>);
        // add listener...
        ntb.instance().showOptions(getMockEvent());

        const mockClickOutsideOptions = {
            target: {
                className: "not-tab-options"
            },
            preventDefault: () => {
                // don't do anything
            }
        };

        // remove listener
        ntb.instance().hideOptions(mockClickOutsideOptions);

        expect(map.click).toEqual(undefined);
    });

    it("should wrap tab options", () => {
        const options = ["journal", "calendar"];

        const ntbInst = shallow(<NewTabButton options={options}/>).instance();

        const wrappedOptions = ntbInst.wrapTabOptions(options);

        wrappedOptions.forEach(el => {
            expect(el.props.className).toEqual("tab-option");
            // it stores the 'text' in the div in the 'children' property. 
            expect(options.includes(el.props.children)).toEqual(true);
            expect(el.props.value).toEqual(el.props.children);
        });
    });

});