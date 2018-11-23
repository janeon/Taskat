import React from 'react';

const View = ({value, entries, handleSubmit, handleChange, handleDelete}) => (
	<div className="journal">
		<form onSubmit={handleSubmit}>
	        <label>
	          <p>Write a new entry</p>
	          <textarea value={value} onChange={handleChange} />
	        </label>
	        <br /><div className="button" onClick={handleSubmit}> submit</div>
	      </form>
    	<div>

	      	<p>Journal entries:</p>
	      	<div>
                {(entries.length==0) &&
                        <p>You have no entries. Write a new one above!</p>}

                        {entries.map((txt, index) => <div key={index}>{txt} <p className="button" onClick={() => { handleDelete(txt)}}>delete</p></div>)}
               </div>
	   	</div>
     </div>
);

export default View;