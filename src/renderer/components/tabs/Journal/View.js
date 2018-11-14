import React from 'react';



const View = ({value, entries, handleSubmit, handleChange, handleDelete}) => (
	<div>
		<form onSubmit={handleSubmit}>
	        <label>
	          Essay:
	          <textarea value={value} onChange={handleChange} />
	        </label>
	        <div onClick={handleSubmit}> submit</div>
	      </form>
    	<div>

	      	{entries.map((txt, index) => <div key={index}>{txt} <p onClick={() => { handleDelete(txt)}}>delete</p></div>)}
	   	</div>
     </div>
);

export default View;