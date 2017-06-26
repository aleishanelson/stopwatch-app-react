import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const formatTime = (secs) => { // 754567(ms) -> "12:34.567"
          var h = String('0' + Math.floor(secs/(60*60))).slice(-2);
          var m = String('0' + Math.floor((secs/60) % 60)).slice(-2);
          var s = String('0' + secs % 60).slice(-2);
          return h + " : " + m + " : " + s;
        }

class App extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        elapsed: 0,
        lastClearedIncrement: null
      };
     this.increment = null;   //need this bc we want to cancel the interval when a user clicks reset
  }

handleStart(){
  this.increment = setInterval( () =>  //setInterval calls React.DOM.render() every second.
    this.setState({elapsed: this.state.elapsed + 1}), 1000);
}

handleStop(){
    clearInterval(this.increment);
    this.setState({lastClearedIncrement: this.increment}
    );
}

handleReset(){
      //clear the stopwatch interval and set secondselapsed back to 0
      clearInterval(this.increment);
      this.setState({elapsed: 0});
}

render() {
  return (
    <div className="wrapper">

        <div className="stopwatch">
            <h1 className="stopwatch-timer">{formatTime(this.state.elapsed)}</h1>
        </div>
        <div className="buttonStyle">

              {(this.state.elapsed === 0 || this.increment === this.state.lastClearedIncrement
                  ? <button className="toggleStyle" onClick={this.handleStart.bind(this)}>Start</button>
                    : <button className="toggleStyle" onClick={this.handleStop.bind(this)}>Stop</button>
              )}

              <button className="resetStyle" onClick={this.handleReset.bind(this)}>Reset</button>
        </div>
    </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
