import React from 'react';
import {Line} from 'react-chartjs-2';

/*<button onClick={this.addData}>Change data!</button>*/
/*{this.addData()}*/
/*<Line data={this.data} />*/
const View = ({value, dataValue, labelValue, chartData, handleDataChange, handleLabelChange, handleSubmit}) => (
<div id="displayContainer" className="displayContainer">
<div id="chartContainer">

<Line data={chartData} redraw />

<form onSubmit={handleSubmit}>
  <label>
    Data for today:
    <input type="number" value={dataValue} onChange={handleDataChange} />

  </label>
  <div onClick={handleSubmit}>Submit</div>
</form>

</div>
</div>

);

export default View;
/*<input type="text" value={value} onChange={handleLabelChange} />*/
/*<div onClick={handleDelete}>Delete</div>*/
