/* 
 * This defines resources you can use for writing tests, 
 * fake tasks, data, etc. 
 * 
 * If you feel that you have a lot of recources to create, feel free to make 
 * another file in this directory. 
 */



// returns a list of tasks 
export function getTestTaskList() {
    return [ 
        { title: "get pizza", key: 0, tabs: [ { analytics: "ooh buddy, that's a lot of pepperoni" }, { journal: "pinapple, nice!" }]},
        {title: "go swimming", key: 1, tabs: [ { journal: "the pool was lovely this evening" }, { journal: "I look good in my new goggles" }]},
        {title: "pick up kid", key: 2, tabs: [ { journal: "that was fun" }, { analytics: "time to put them back down" } ]},
        {title: "practice snorkeling", key: 3, tabs: [ { analytics: "20 minutes"}, {calendar: "some dates"}]}
    ];
}
