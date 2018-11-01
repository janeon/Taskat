/---------------------------- GENERAL INFORMATION ----------------------/

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

My understanding of the basic datastructures for the app (this can be changed however makes sense)....

    Model: 
            The model contains the single source of data for the app.  Anything that wants to access some part of the 
        data calls "model.subscribeTo(<reference to itself>, "tasktitles")" and passes it a reference to itself (generally 
        componentDidMount() or or the constructor is a good place to put this) with a string indicating which data source 
        it wants to know about (TaskList wants to know about the "task_titles").  The subscribing component needs to implement 
        an "onChange(newData)" method that describes what it should do with the new data (generally involving a call to 
        this.setState() ).  

            When a tab wants to change some part of the data, it calls "model.request(action)", and passes in an 'action' object, 
        which looks (something) like this, // action = {code: "task_analytics_update", data: { <whatever the model needs to do that> }} // 
        
            note - I think it would be easiest to track component specific changes within your component, and then send the resulting
        composite object (probably something like // action.data = {analytics: {all the data}}) // ) as a whole,rather than send actions to the model for each minor change as it occurs.  

    To render your component for debuggging/testing (see ExTab for an example component) you can go into TabDisplay (the component 
that renders whichever tab gets clicked) and add <YourComponent /> inside the ".displayContainer" div.  If you want to pass it test 
arguments, you can call it with  <YourComponent testData={reference to some test data}> and then in your constructor, you can access 
this data with 'props.testData'.  


/------------------------------- OTHER STUFF? -------------------------------/
