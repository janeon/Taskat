/* 
 * This defines resources you can use for writing tests, 
 * fake tasks, data, etc. 
 * 
 * If you feel that you have a lot of recources to create, feel free to make 
 * another file in this directory. 
 */

// returns a (small) list of tasks 
export function getTestTaskListSmall() {
    return [ 
        { title: "get pizza", key: 0, tabs: [ { title: "analytics", info: "ooh buddy, that's a lot of pepperoni" }, { title: "journal", info: "pinapple, nice!" }]},
        {title: "go swimming", key: 1, tabs: [ { title: "journal", info: "the pool was lovely this evening" }, { title: "journal", info: "I look good in my new goggles" }]},
        {title: "pick up kid", key: 2, tabs: [ { title: "journal", info: "that was fun" }, { title: "journal", info: "time to put them back down" } ]},
        {title: "practice snorkeling", key: 3, tabs: [ { title: "analytics", info: "20 minutes"}, {calendar: "some dates"}]}
    ];
}

// returns the map of titles and keys from the other small list.  
export function getTestTitleKeyListSmall() {
    return getTestTaskListSmall().map((task, index) => {
        return {key: index, title: task.title};
    });;
}