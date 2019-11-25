import React, { Component } from 'react';
import './Components.css';
import 'react-circular-progressbar/dist/styles.css';
import { Segment, Icon, Input, List } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'

class BlockTracker extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
        blockId: "1",
        timeStamp: "",
        temperature: "",
        blockFound: false,
        value: ""
    }
    
  }
  searchBlock = (e) => {
    console.log("searched" + e.target.value)
    this.setState({
        value: e.target.value
    })
    axios.get('/block?block_no=' + e.target.value).then((result) => {
        if(result.data.blockFound) {
            console.log(result.data);
            this.setState({
                blockId: result.data.blockId,
                timeStamp: result.data.timestamp,
                temperature: result.data.taapman,
                blockFound: true
            }) 
        } else {
            this.setState({
                blockFound: false
            })
        }
    })
  }
  render() {
    return (
      <div className="Block">
        <Segment inverted>
            <Input
                icon={<Icon name='book' inverted circular link />}
                placeholder='Enter Block Number...'
                onChange={this.searchBlock}
                value={this.state.value}
            />
            { this.state.blockFound > 0 ? (
            <List>
                <List.Item>
                    <List.Icon name='users' />
                    <List.Content>{"Block ID: " + this.state.blockId}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='users' />
                    <List.Content>{"TimeStamp: " + this.state.timeStamp}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='users' />
                    <List.Content>{"Temperature: " + this.state.temperature}</List.Content>
                </List.Item>
            </List>
            ) : (
                <h1>No Relevant Data</h1>
            )}
        </Segment>
      </div>
    );
  }
}

export default BlockTracker;