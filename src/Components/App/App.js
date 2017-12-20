import React, { Component } from 'react';
import './App.css';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';


class App extends Component {
  state = {
    illnesses: [
      {
        id: 63790,
        name: `Baby's Flu`,
        records: [
          {
            id: 35890,
            info: 'temp 103.1',
            date: new Date(2017, 11, 17, 16, 0)
          },
          {
            id: 24567,
            info: 'tylenol',
            date: new Date(2017, 11, 18, 15, 15)
          }
        ]
      }
    ]
  }

  // gets illness name from sidebar's addillness component and saves it to array
  addIllnessNameHandler = (IllnessName) => {
    const illnessId = Math.floor(Math.random() * 89999) + 10000;
    const newIllness = {
      id: illnessId,
      name: IllnessName,
      records: []
    }
    // add new illness to existing array and save to new variable
    const updatedIllnesses = [...this.state.illnesses, newIllness];
    this.setState({
      illnesses: updatedIllnesses
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar
          addIllnessName={this.addIllnessNameHandler}/>
      </div>
    );
  }
}

export default App;
