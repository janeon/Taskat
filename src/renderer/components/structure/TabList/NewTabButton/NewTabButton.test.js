import React from 'react';
import NewTabButton from './index';
import {shallow, mount} from 'enzyme';


describe("NewTabButton", () => {

    const test_opts = ["calendar", "analytics"];

    it("should render correct number of options", () => {
        const ntb = mount(<NewTabButton options={test_opts}/>);

        const options = ntb.find(".tab-option");

        expect(options.length).toEqual(test_opts.length);
    });  

    it("should wrap tab options", () => {
        const options = ["journal", "calendar"];

        const ntbInst = shallow(<NewTabButton options={options}/>).instance();

        const wrappedOptions = ntbInst.wrapTabOptions(options);

        const correct = options.map((option, index) => {
            return (<div className="tab-option" key={index} value={option}>{option}</div>);
        });

        expect(wrappedOptions).toEqual(correct);
    });
    
});