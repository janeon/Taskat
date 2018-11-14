/*
 * Definition of constants (so they only have one definition)
 */

/* --------------------------------- MESSAGES FOR USER INPUT ---------------------------------- */

// The message to output when the user enters an empty string as a task title. 
export const NO_EMPTY_TASK_TITLES = "a task's title needs to contain at least one character...";

// the message to output when the user tries to create a task with a duplicate title.
export const NO_DUPLICATE_TASK_TITLES = "a task with that title already exists...";

/* ----------------------------------- IPC COMMUNICATIONS ------------------------------------- */


export const READ_ALL_TASKS_REQUEST = "read-all-tasks-request";

export const READ_ALL_TASKS_RESPONSE = "read-all-tasks-response";

export const WRITE_ALL_TASKS_REQUEST = "write-all-tasks-request";

export const WRITE_ALL_TASKS_RESPONSE = "write-all-tasks-response";