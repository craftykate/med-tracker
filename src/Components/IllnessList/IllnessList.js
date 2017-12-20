import React, { Component } from 'react';
import './IllnessList.css';
import { Illness } from '../Illness/Illness';


export class IllnessList extends Component {
  // sorts illnesses by the object's name
  // This will make sure illnesses that start with the same name will be grouped together
  sortIllnesses = (illnesses) => {
    return illnesses.sort(function(a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  // get list of illnesses, sort them, render Illness Components
  renderIllnesses = () => {
    let illnesses = [...this.props.illnesses];
    illnesses = this.sortIllnesses(illnesses);
    return illnesses.map(illness =>
      <Illness
        key={illness.id}
        illness={illness}
        saveNewRecord={this.props.saveNewRecord}
        deleteIllness={this.props.deleteIllness}
        updateIllnessName={this.props.updateIllnessName}
        deleteRecord={this.props.deleteRecord}
      />
    )
  }

  render() {
    return (
      <div className="MedEventList">
        {this.renderIllnesses()}
      </div>
    );
  }
}
