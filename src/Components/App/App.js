import React, { Component } from 'react';
import './App.css';
import { Header } from '../Header/Header';


// Home of the Illness info
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

  render() {
    return (
      <Header />
    );
  }
}

export default App;
