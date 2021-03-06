import React from 'react';
import {Line} from 'react-chartjs-2';
import {Radar} from 'react-chartjs-2';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './Analytics.css'

const View = ({
                xLabel, yLabel, chartType,
                type, dataXvalue, dataYvalue, labelValue,
                chartData, handleXDataChange, handleYDataChange,
                handleDelete, handleSubmit,
                handleXLabelChange, handleYLabelChange,
                isNewTab, handleDisplayChange,
                handleSelectChange,
                progress, progTotal,
                handleProgTotalChange, handleAddProgress,
                handleRemoveProgress,
              }) => (
/*<div id="displayContainer">*/
<div id="chartContainer">

  <div>
    { isNewTab
      ? (
          <div>
            <h1>Welcome</h1>
            <div>You have not yet recorded any analytics for this tab. Get started now!</div><br />
            <label>
              How would you like to graph your data?
              <select onChange={handleSelectChange}>
                <option value="select">Select a visualization type</option>
                <option value="line">Line Graph</option>
                <option value="progress">Progress Bar</option>
              </select>
            </label><br />


            <div>
              { chartType==="progress"
                ? (
                  <div className="box">
                    <p className="info">
                      <strong>Progress bars</strong> are useful if you want to repeat an action a certain
                      number of times. <br />
                      <strong>Example goals:</strong> read 20 books in the next month, eat veggies 7 times this week.
                    </p>
                    <label>
                      How many times would you like to complete an action?
                      <input type="number" value={progTotal} onChange={handleProgTotalChange} /><br />
                    </label>
                    <button className="button" onClick={handleDisplayChange}>Create your progress bar!</button>
                  </div>
                ) : ( null )
              }
              { chartType==="line"
                ? (
                  <div id="box" className="box">
                    <p className="info">
                      <strong>Line graphs</strong> are helpful if your task involves doing something for a certain amount
                      of time. <br />
                      <strong>Example goals:</strong> practice an instrument (record time practiced each session
                      ), reach a distance running goal (record miles run each day).
                    </p>
                    <label>
                      Set x label:
                      <input type="text" value={xLabel} onChange={handleXLabelChange} /><br />
                    </label>
                    <label>
                      Set y label:
                      <input type="text" value={yLabel} onChange={handleYLabelChange} /><br /><br />
                    </label>
                    <button className="button" onClick={handleDisplayChange}>Create your graph!</button>
                  </div>
                ) : ( null )
              }
            </div>
          </div>
      )
      : (
        <div>
          { chartType==="line"
            ? (
              <div>
              <h1>Good Work!</h1>
              <Line
                data={chartData}
                options = {{
                  legend: {
                    display: false,
                  },
                  tooltips: {
                    callbacks: {
                      label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                      }
                    }
                  },
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true,
                      fontColor: 'rgba(42,56,121,1)',
                    },
                    scaleLabel: {
                      display: true,
                      labelString: yLabel,
                      fontColor: 'rgba(42,56,121,1)',
                      fontStyle: 'bold',
                      fontSize: 15,
                    }
                  }],
                  xAxes: [{
                    ticks: {
                      fontColor: 'rgba(42,56,121,1)',
                    },
                    scaleLabel: {
                      display: true,
                      labelString: xLabel,
                      fontColor: 'rgba(42,56,121,1)',
                      fontStyle: 'bold',
                      fontSize: 14,
                    }
                  }],
                }
              }
              }
                redraw />

                <form onSubmit={handleSubmit}>
                  <label>
                    Enter y data:
                    <input type="number" value={dataYvalue} onChange={handleYDataChange} />
                  </label><br />
                  <label>
                    Enter x data label:
                    <input type="text" value={dataXvalue} onChange={handleXDataChange} />
                  </label>
                  <button className="button" onClick={handleSubmit}>submit</button>

                </form>
                <button className="button" onClick={handleDelete}>delete last point</button><br /><br />
                <label>
                  Change x Label:
                  <input type="text" value={xLabel} onChange={handleXLabelChange} /><br />
                </label>
                <label>
                  Change y Label:
                  <input type="text" value={yLabel} onChange={handleYLabelChange} /><br />
                </label>

              </div>
            ) :
            (
              <div>
              <h1> Good Work! </h1>
              <p>You are {progress}/{progTotal} of the way there!</p>
              <button className="button" onClick={handleAddProgress}>+</button>
              <button className="button" onClick={handleRemoveProgress}>-</button><br />
              <Progress id="pbar"
                type="circle"
                percent={((progress/progTotal)*100).toFixed(1)}
                strokeWidth={15}
                width={300} />
              </div>
            )
          }
        </div>
      )
    }
  </div>

</div>
/*</div>*/

);


export default View;

/*<form onSubmit={handleGraphConfig}>
  <button onClick={handleGraphConfig}>SubmitConfig</button>
</form>*/
