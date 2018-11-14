import React from 'react';
import {Line} from 'react-chartjs-2';

/*<button onClick={this.addData}>Change data!</button>*/
/*{this.addData()}*/
/*<Line data={this.data} />*/
const View = ({value, dataValue, labelValue, chartData, handleDataChange, handleDelete, handleSubmit}) => (
<div id="displayContainer" className="displayContainer">
<div id="chartContainer">

<select>
  <option value="line">Radar</option>
  <option value="radar">Line</option>
</select>

<Line data={chartData} redraw />

<form onSubmit={handleSubmit}>
  <label>
    Data for today:
    <input type="number" value={dataValue} onChange={handleDataChange} />

  </label>
  <button onClick={handleSubmit}>Submit</button>
</form>
<button onClick={handleDelete}>Delete</button>
</div>
</div>

);

export default View;
/*<input type="text" value={value} onChange={handleLabelChange} />*/
/*<div onClick={handleDelete}>Delete</div>*/
