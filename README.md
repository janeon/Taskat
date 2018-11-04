/--------------------------------- THE TREE -----------------------------------/
 
 
```bash 
THE TREE... (structure of the html elements)

(Electron Window)
    --> App (this is where the reference to the model obj gets made and lives)
          -
          --> Frame (this is where the visible layout begins)
                -
                --> Task List (the list of tasks along the left side)
                - 
                --> TaskDisplay (this loads the information about the currently selected task)
                        -
                        --> TabList (the list of tabs associated with that task)
                        -
                        --> TabDisplay (this is the display for whichever tab has been clicked)
                                -
                                -> (whatever tab gets clicked.  Ex. <Calendar />, <Journal />, etc.)
```


    RENDERING FOR DEBUGGING:
        To render your component for debuggging/testing (see ExTab for an example component) you can go into TabDisplay (the component
    and replace <ExTab /> with your component (and pass it any dummy data you will need). 

/---------------------------------- MODEL ------------------------------------/

    Model: 
            The Model manages the interactions between components (mostly tabs) and all the data for the app (list of all tasks ('taskList'
        list of all task titles, paired with their 'key' ('titlesKeyPairs')), and the most recently clicked task ('currentTask')).  It handles updates to the data (add, edit, remove) in response to actions (clicks, form entries, etc.) that occur from anywhere in the app.

            What I think 'tasks' are: 
                task = {
                    title: "<what is it called?>",
                    key: <unique numeric identifier, related to the index when it is first read from the DB>,
                    attrs: { < general information, ie. notification level, settings, etc. > },
                    tabs: { < all information that the tabs need or have saved goes here > }
                }

            Components and the model:
                Basically, I don't think they should interact directly with the model, I think it is easier to test and manage if
            the components (tabs) get passed the single function that they need from the Model ('recordFinalState()'), rather than a reference to the entire thing.

                -> The TabDisplay component (who's role is rendering tabs based on tab clicks) that renders your component will pass
            in all the data from the currently selected task that has to do with your component, along with that task's 'key' property (a unique numeric identifier).  

                -> I think you should handle actions locally, meaning if a user wants to edit a journal entry, then record those changes in your local copy of the Journal info for the currently selected task in your component's 'state'.  Then in your component's 'componentWillUnmount()' method, pass the final version of that state, with all of its accumulated changes (or no
    changes if nothing changed) back to the Model, and it will update the appropriate task (via the Model's recordFinalState("<component's name>", this.state, key), which will be passed as a function into your component (again, through the 'props' argument in the 
            constructor)).  (the functional version of the this.setState() method will come in handy, as if you use it, React will automatically re-render your component with the appropriately updated state).

                *** I'll update ExTab to try and illustrate what I mean ***

                *** if you think this is bonkers, slack me, I am happy to make changes to try and make it easier :) ***
                        
                *** For now, just pretend that you have access to all of the data from the currentTask that has to do with your individual
            component, passed in through the 'props' argument in the constructor.  ***

/------------------------------- OTHER STUFF? -------------------------------/

