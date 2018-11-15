import React from 'react';



const View = ({value, entries, handleSubmit, handleChange, handleDelete}) => (
	<div className="essay">
		<form onSubmit={handleSubmit}>
	        <label>
	          <p><h1>Enter a new journal entry:</h1></p>
	          <textarea value={value} onChange={handleChange} />
	        </label>
	        <div className="button" onClick={handleSubmit}> submit</div>
	      </form>
    	<div>
    		<p><h1>Journal entries:</h1></p>
	      	{(entries.length==0) &&
	      		<p>You have no entries. Write a new one above!</p>}

	      		{entries.map((txt, index) => <div key={index}>{txt} <p className="button" onClick={() => { handleDelete(txt)}}>delete</p></div>)}
	   	</div>
     </div>
);

export default View;