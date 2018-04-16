import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      dataCollection: []
    }

    this.getDataCollection = this.getDataCollection.bind(this);
    this.getData = this.getData.bind(this);
  }

  async getData() {
    const response = await fetch('/data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'getData', params: {}, id: 'test-application' }),
    credentials: 'include' })

    const data = await response.json()
    console.log(data)
    this.setState({ data })
  }

  async getDataCollection() {
      const response = await fetch('/dataCollection', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-ndjson'
      },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'getDataCollection', params: {}, id: 'test-application' }),
      credentials: 'include' })
  
      const dataCollection = await response.json()
      this.setState({ dataCollection })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">New delimited json Under json-rpc</h1>
        </header>
        <br />
        <div>
            <button onClick={this.getData}>Get Data</button>
            <pre>
              {JSON.stringify(this.state.data)}
            </pre>
        </div>
        <div>
          <button onClick={this.getDataCollection}>
              Get data collection
          </button>
          <ul>
            {this.state.dataCollection.map(data => 
              <li>{data}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
