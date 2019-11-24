import React, { Component } from 'react';
import './App.css';
import 'react-circular-progressbar/dist/styles.css';
import { Button } from 'semantic-ui-react'

import TruckStatus from './components/TruckStatus'
import BlockTracker from './components/BlockTracker'

import 'semantic-ui-css/semantic.min.css'

const TRUCK_STATUS = "TruckStatus"
const BLOCK_TRACKER = "BlockTracker"
function CurrentComponent(props) {
  if(props.component == TRUCK_STATUS) {
    return <TruckStatus />
  } else {
    return <BlockTracker />
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      component: TRUCK_STATUS
    };
    
  }
  handleClick = (e) => {
    console.log(e.target.innerHTML)
    if(e.target.innerHTML == TRUCK_STATUS) {
      this.setState({
        component: TRUCK_STATUS
      });
    } else {
      this.setState({
        component: BLOCK_TRACKER
      });
    }
  }
  render() {
    return (
      <div className="App">
        <div className="buttons">
          <Button.Group>
            <Button onClick={this.handleClick} positive = {this.state.component == BLOCK_TRACKER}>{BLOCK_TRACKER}</Button>
            <Button.Or />
            <Button onClick={this.handleClick} positive = {this.state.component == TRUCK_STATUS}>{TRUCK_STATUS}</Button>
          </Button.Group>
          <CurrentComponent component={this.state.component} />
        </div>
      </div>
    );
  }
}

export default App;