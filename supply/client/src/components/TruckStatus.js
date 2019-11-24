import React, { Component } from 'react';
import '../App.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Segment, Icon, Input } from 'semantic-ui-react'


import StatusButton from './StatusButton'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
const STATUS_CANCELLED = "cancelled"
const STATUS_PASSED = "passed"
const STATUS_NOT_DETERMINED = "notDetermined"
const percentage = 66;

const notDetermined = {
  loading: true,
  color: "white"
}

const passed = {
  loading: false,
  color: "green"
}

const cancelled = {
  loading: false,
  color: "red"
}

const statusList = {
  "cancelled": cancelled,
  "notDetermined": notDetermined,
  "passed": passed
}

class TruckStatus extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      temperature: 100,
      dispatchStatus: notDetermined,
      warehouseOneStatus: notDetermined,
      warehouseTwoStatus: notDetermined,
      deliveryStatus: notDetermined
    };
  }
  componentDidMount() {
    // setInterval(() => {
    //   axios.get('/nothing?key=%5B%221%22%5D').then((result) => {
    //     this.setState({
    //       color: result.data.critical ? 'red' : 'green'
    //     })
    //   })
    // }, 10000);
    //  setInterval(() => {
    //   axios.get('/getDeliveryStatus').then((res) => {
    //     this.setState({
    //       dispatchStatus: statusList[res.data.dispatchStatus],
    //       warehouseOneStatus: statusList[res.data.warehouseOneStatus],
    //       warehouseTwoStatus: statusList[res.data.warehouseTwoStatus],
    //       deliveryStatus: statusList[res.data.deliveryStatus]
    //     })
    //   })
    // }, 3000);
  }
  render() {
    return (
      <div className="App">
        <div id="container">
          <div id="left"><StatusButton text="dispatched" status={this.state.dispatchStatus}/></div>
          <div id="middleOne"><StatusButton text="warehouse 1" status={this.state.warehouseOneStatus}/></div>
          <div id="middleTwo"><StatusButton text="warehouse 2" status={this.state.warehouseTwoStatus}/></div>
          <div id="right"><StatusButton text="delivered" status={this.state.deliveryStatus}/></div>
        </div>
        <div class="center">
          <div id="temperature">
            <CircularProgressbar value={this.state.temperature} text={`${this.state.temperature}\`C`} />;
          </div>
        </div>
       
      </div>
    );
  }
}

export default TruckStatus;