/*
 * Setting up testing environment
 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// configure adapter for enzyme
configure({ adapter: new Adapter() });

// 
window.alert = (msg) => {console.log(msg);} ;

window.require = (string) => {
    if (string === 'electron-store') {
        return Store;
    }
}

//jest.mock('react-chartjs2', () => 'Chart');

class Store {
    get() {
        console.log("reading");
    }

    set(data) {
        console.log("write");
    }

    clear() {
        console.log("clear");
    }
}