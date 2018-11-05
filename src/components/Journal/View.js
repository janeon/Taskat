import React from 'react';



const View = ({value, entries, handleSubmit, handleChange}) => (
	<div>
		<form onSubmit={handleSubmit}>
	        <label>
	          Essay:
	          <textarea value={value} onChange={handleChange} />
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
    	<div>
	      {entries}
	   	</div>
     </div>
);

export default View;