import React, { Component } from 'react';
import './AddIllness.css';


export class AddIllness extends Component {
  state = {
    showInputField: false,
    tempIllnessName: ''
  }

  // toggle whether input field is shown
  toggleInputField = () => {
    this.setState({
      showInputField: !this.state.showInputField,
      tempIllnessName: ''
    })
  }

  // store input value in a temporary state variable
  updateTempIllnessName = (event) => {
    this.setState({
      tempIllnessName: event.target.value
    })
  }

  // save input value in App's state array and hide input field
  addIllnessName = () => {
    this.props.addIllnessName(this.state.tempIllnessName);
    this.toggleInputField();
  }

  // show input field if state variable is true
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
