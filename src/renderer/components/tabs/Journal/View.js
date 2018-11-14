import React from 'react';


const View = ({value, entries, handleSubmit, handleChange}) => (
	<div>
		<form onSubmit={handleSubmit}>
	        <label>
	          Essay:
	          <textarea value={value} onChange={handleChange} />
	        </label>
	        <div onClick={handleSubmit}> submit</div>
	      </form>
    	<div>
	      {entries.map((txt, index) => <p key={index}>{txt}</p>)}
	   	</div>
     </div>
);

export default View;