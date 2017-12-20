import React, { Component } from 'react';
import './App.css';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { IllnessList } from '../IllnessList/IllnessList';


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

  // add info to record for illness
  saveNewRecordHandler = (newRecordInfo, illnessId) => {
    const recordToAdd = {
      id: Math.floor(Math.random() * 89999) + 10000,
      info: newRecordInfo,
      date: new Date()
    }
    // find index of illness to update
    const illnessIndex = this.returnIllnessIndex(illnessId);
    // get illness to update
    const illnessToUpdate = {...this.state.illnesses[illnessIndex]};
    // make new array of existing records plus new record
    const updatedRecords = [...illnessToUpdate.records, recordToAdd];
    // update illness' records with updated records
    illnessToUpdate.records = updatedRecords;
    // get copy of existing illnesses
    const illnesses = [...this.state.illnesses];
    // update illness in array
    illnesses[illnessIndex] = illnessToUpdate;
    // update array of records with new record
    this.setState({
      illnesses: illnesses
    })
  }

  updateIllnessNameHandler = (event, illnessId) => {
    const illnessIndex = this.returnIllnessIndex(illnessId);
    const illness = {...this.state.illnesses[illnessIndex]}
    illness.name = event.target.value;
    const illnesses = [...this.state.illnesses];
    illnesses[illnessIndex] = illness
    this.setState({
      illnesses: illnesses
    })
  }

  // delete illness from state array
  deleteIllnessHandler = (illnessId) => {
    const illnessIndex = this.returnIllnessIndex(illnessId);
    const illnesses = [...this.state.illnesses];
    illnesses.splice(illnessIndex, 1);
    this.setState({
      illnesses: illnesses
    })
  }

  deleteRecordHandler = (illnessId, recordId) => {
    const illnessIndex = this.returnIllnessIndex(illnessId);
    const illnesses = [...this.state.illnesses]
    const illness = {...this.state.illnesses[illnessIndex]}
    const recordIndex = illness.records.findIndex(record => {
      return record.id === recordId;
    });
    illness.records.splice(recordIndex, 1);
    illnesses[illnessIndex] = illness;
    this.setState({
      illnesses: illnesses
    })
  }

  returnIllnessIndex = (illnessId) => {
    return this.state.illnesses.findIndex(illness => {
      return illness.id === illnessId;
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar
          addIllnessName={this.addIllnessNameHandler}/>
        <IllnessList
          illnesses={this.state.illnesses}
          saveNewRecord={this.saveNewRecordHandler}
          deleteIllness={this.deleteIllnessHandler}
          updateIllnessName={this.updateIllnessNameHandler}
          deleteRecord={this.deleteRecordHandler}
        />
      </div>
    );
  }
}

export default App;
