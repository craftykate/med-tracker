import React, { Component } from 'react';
import './AddIllness.css';


export class AddIllness extends Component {
  state = {
    showInputField: false,
    tempIllnessName: ''
  }

  toggleInputField = () => {
    this.setState({
      showInputField: !this.state.showInputField,
      tempIllnessName: ''
    })
  }

  updateTempIllnessName = (event) => {
    this.setState({
      tempIllnessName: event.target.value
    })
  }

  addIllnessName = () => {
    this.props.addIllnessName(this.state.tempIllnessName);
    this.toggleInputField();
  }

  inputField = () => {
    if (this.state.showInputField) {
      return (
        <div>
          <input
            onChange={this.updateTempIllnessName}
            value={this.state.tempIllnessName}
            placeholder="Can't be empty"/>
          <a onClick={this.addIllnessName}>add</a>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <a className="addEvent" onClick={this.toggleInputField}>Add event to track</a>
        <p className="description">eg. Baby&#39;s flu</p>
        {this.inputField()}
      </div>
    );
  }

};
