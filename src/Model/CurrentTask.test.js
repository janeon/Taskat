import CurrentTask from './CurrentTask'

describe('CurrentTask', () => {
    it('constructor inits right', () => {
        const ct = new CurrentTask();
        expect(ct).not.toEqual(null);
        expect(ct.data).toEqual(null);
        expect(ct.subscribers).toEqual([]);
    });
});