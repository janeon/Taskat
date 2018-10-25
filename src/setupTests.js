// Creating the adapter that Enzyme needs to 
// run tests.  

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });