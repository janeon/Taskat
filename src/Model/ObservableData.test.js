import ObservableData from './ObservableData';

describe('ObservableData', () => {
    it('constructor inits correctly', () => {
        const od = new ObservableData();
        expect(od).not.toEqual(null);
        expect(od.data).toEqual(null);
        expect(od.subscribers).toEqual([]);
    });

    it('notifies observers of update to data', () => {
        const od = new ObservableData();
        const obs = new MockObserver();

        od.updateData(2);

        od.subscribe(obs);  

        od.updateData(4);

        expect(obs.internalState).toEqual(1);
        expect(od.subscribers.length).toEqual(1);
    });

    it('updates the data on \'updateData(newData)\' calls', () => {
        const od = new ObservableData();

        od.updateData(11);
        
        expect(od.data).toBe(11);

        od.updateData(9);

        expect(od.data).toBe(9);
    });

    it('notifies multiple observers of updates to data', () => {
        const od = new ObservableData();
        const obs1 = new MockObserver();
        const obs2 = new MockObserver();
        const obs3 = new MockObserver();
        
        od.updateData(11);

        od.subscribe(obs1);
        od.subscribe(obs2);
        od.subscribe(obs3);

        od.updateData(11);

        expect(obs1.internalState).toEqual(1);
        expect(obs2.internalState).toEqual(1);
        expect(obs3.internalState).toEqual(1);
    });

    it('removes obs on \'unsubscribe(obs)\'', () => {
        const od = new ObservableData();
        const obs = new MockObserver();
        const obs2 = new MockObserver();

        od.updateData(2);
        
        od.subscribe(obs);
        od.subscribe(obs2);

        od.updateData(3);

        od.unsubscribe(obs2);
        
        od.updateData(4);

        expect(od.subscribers.length).toEqual(1);
        expect(obs.internalState).toEqual(2);
    });

    it('calls \'obs.onChange(newData)\' with a shallow copy of data when data is a primitive', () => {
        const od = new ObservableData();
        var originalTitle = "tomatoes";
        var data = originalTitle;

        od.updateData(data);

        var obs = new MockObserver();

        od.subscribe(obs);

        expect(obs.data).toEqual(originalTitle);
        obs.data = "new title";
        expect(od.data).toEqual(originalTitle);
    });

    it('call \'obs.onChange(newData)\' with a shallow copy of data when data is an object', () => {
        const od = new ObservableData();
        var originalData = {
            title: "tomatoes",
            list: [1, 2, 3, 4]
        }

        od.updateData(originalData);

        var obs = new MockObserver();
        od.subscribe(obs);

        expect(obs.data).toEqual(originalData);
        obs.data.title = "different data!";
        obs.data.list[2] = 6;
        expect(od.data).toEqual(originalData);
    });
});    

class MockObserver {
    constructor() {
        this.internalState = -1;
        this.data= "init title";
    }

    onChange(newData) {
        this.internalState += 1;
        this.data = newData;
    }
}