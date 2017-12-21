import React, { Component } from 'react';
import './IllnessDisplay.css';


export class IllnessDisplay extends Component {
  state = {
    tempNewRecord: '',
    dateTimeFields: false,
    day: '',
    time: ''
  }

  updateTempNewRecord = (event) => {
    this.setState({
      tempNewRecord: event.target.value
    })
  }

  showDateTimeFields = () => {
    this.setState({
      dateTimeFields: true,
      day: this.setDate(),
      time: this.setTime()
    })
  }

  closeDateTimeFields = () => {
    this.setState({
      dateTimeFields: false
    })
  }

  saveNewRecord = () => {
    const date = document.getElementById(`${this.props.illness.id}_date`).value;
    const time = document.getElementById(`${this.props.illness.id}_time`).value;
    const dateTime = new Date(date + "T" + time);
    this.props.saveNewRecord(this.state.tempNewRecord, dateTime, this.props.illness.id);
    this.setState({
      tempNewRecord: '',
      dateTimeFields: false
    })
  }

  setDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();

    month += 1;
    if (month < 10) month = "0" + month;
    // add one to month since javascript starts at 0
    if (day < 10) day = "0" + day;
    // put it all together
    const today = year + "-" + month + "-" + day;
    return today;
  }

  setTime = () => {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (hour < 10) hour = "0" + hour;
    // round minutes down to last multiple of 5 for readability
    minute = Math.floor(minute/5)*5;
    if (minute < 10) minute = "0" + minute;
    // put it all together
    const today = hour + ":" + minute;
    return today;
  }

  // make date readable
  formatDate = (givenDate) => {
    const date = new Date(givenDate);
    let hour = date.getHours();
    if (hour > 12) hour -= 12;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    minutes = minutes === "00" ? '' : `:${minutes}`;
    const ampm = date.getHours() < 12 ? 'a' : 'p';
    const timeFormatted = `${hour}${minutes}${ampm}`;

    const month = date.getMonth() + 1;
    const day = date.getDate();

    let dateString = `${timeFormatted} ${month}/${day}`;
    return dateString;
  }

  // render list of records
  renderRecords = () => {
    let recordList;
    if (this.props.sortedRecords) {
      recordList = this.props.sortedRecords.map(record => {
        return (
          <li className="medRecord" key={record.id}>
            {record.info}
            <span className="dateTime"> [{this.formatDate(record.date)}]</span>
          </li>
        )
      })
    }
    return recordList;
  }

  render() {
    this.props.updateStorage();
    let dateTimeFields = null;
    if (this.state.dateTimeFields) {
      dateTimeFields = (
        <div>
          <input
            type="date"
            name="recordDate"
            id={`${this.props.illness.id}_date`}
            defaultValue={this.state.day}
            />
          <input
            type="time"
            name="recordTime"
            id={`${this.props.illness.id}_time`}
            defaultValue={this.state.time}
            />
          <a className="addRecordButton" onClick={this.saveNewRecord}>add</a>
          <a onClick={this.closeDateTimeFields}>(close)</a>
        </div>
      )
    }
    return (
      <div className="MedEvent">
        <h1>{this.props.illness.name}</h1>
        <ul className="records">
          {this.renderRecords()}
          <li className="addRecordSpan">
            <input
              className="addRecord"
              value={this.state.tempNewRecord}
              onChange={this.updateTempNewRecord}
              onFocus={this.showDateTimeFields}
              placeholder="add note, temp, dose, symptom, etc"
            />
            {dateTimeFields}
          </li>
        </ul>
        <div className="editDelete">
          (<a onClick={this.props.editIllness}>
            edit {this.props.illness.name}
          </a>)
        </div>
      </div>
    );
  }
}
