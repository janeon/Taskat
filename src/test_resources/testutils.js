/*
 * This defines resources you can use for writing tests, like
 * fake tasks, data, etc.
 *
 * If you feel that you have a lot of test recources to create, feel free to make
 * another file in this directory.
 *
 * These do not reflect the way that tabs 'info' needs to look.
 */

// returns a (small) list of tasks
export function getTestTaskListSmall() {
    return [
        { title: "get pizza", key: 0, tabs: [ { title: "analytics", info: "ooh buddy, that's a lot of pepperoni" }, { title: "journal", info: "pinapple, nice!" }]},
        {title: "go swimming", key: 1, tabs: [ { title: "analytics", info: {laptimes: [40, 35, 36] } }, { title: "journal", info: "I look good in my new goggles" }]},
        {title: "pick up kid", key: 2, tabs: [ { title: "analytics", info: {label: "duration", data: [15, 11, 16 ]} }, { title: "journal", info: "time to put them back down" } ]},
        {title: "practice snorkeling", key: 3, tabs: [ { title: "analytics", info: {label: "duration", data: [15, 11, 20]}}, {title: "calendar", info: "some dates"}]}
    ];
}

// returns the map of titles and keys from the other small list.
export function getTestTitleKeyListSmall() {
    return getTestTaskListSmall().map((task, index) => {
        return {key: index, title: task.title};
    });
}

export function getNewTestTask() {
    return {
        title: "finish that potatoe", key: 4,
        tabs: [
            { title: "analytics", info: [4, 11, 10, 8, 12, 13] },
            { title: "journal", info: "this is the only journal"},
            { title: "calendar", info: {events: [1, 2, 3, 4]}
        }]
    };
}
/*
 * Returns a mock event for manipulating forms.
 */
export function getMockEvent(initialValue) {
    return {
        target: { value: initialValue},
        persist() {
            // don't do anything...
        },
        preventDefault() {
            // don't do anything...
        }
    }
}
