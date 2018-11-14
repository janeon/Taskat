import React from 'react';
import {Line} from 'react-chartjs-2';

/*<button onClick={this.addData}>Change data!</button>*/
/*{this.addData()}*/
/*<Line data={this.data} />*/
const View = ({dataValue, labelValue, chartData, handleChange, handleSubmit}) => (
<div id="displayContainer" className="displayContainer">
<div id="chartContainer">

<Line data={chartData} />

<form onSubmit={handleSubmit}>
  <label>
    Data for today:
    <input type="number" value={dataValue} onChange={handleChange} />
    <input type="text" value={labelValue} onChange={handleChange} />
  </label>
  <input type="submit" value="Submit" />
</form>
</div>
</div>

);

export default View;
