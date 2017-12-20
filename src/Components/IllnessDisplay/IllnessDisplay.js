import React, { Component } from 'react';
import './IllnessDisplay.css';


export class IllnessDisplay extends Component {
  state = {
    tempNewRecord: '',
    dateTimeFields: false,
    date: new Date(),
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

  saveNewRecord = () => {
    const date = document.getElementById(`${this.props.illness.id}_date`).value;
    const time = document.getElementById(`${this.props.illness.id}_time`).value;
    const dateTime = new Date(date + " " + time);
    this.props.saveNewRecord(this.state.tempNewRecord, dateTime, this.props.illness.id);
    this.setState({
      tempNewRecord: '',
      dateTimeFields: false
    })
  }

  setDate = () => {
    let day = this.state.date.getDate();
    let month = this.state.date.getMonth();
    const year = this.state.date.getFullYear();

    if (month < 10) month = "0" + month;
    // add one to month since javascript starts at 0
    month += 1;
    if (day < 10) day = "0" + day;
    // put it all together
    const today = year + "-" + month + "-" + day;
    // add to date picker
    // const dateControl = document.querySelector('input[type="date"]');
    // dateControl.value = today;
    return today;
  }

  setTime = () => {
    let hour = this.state.date.getHours();
    let minute = this.state.date.getMinutes();

    if (hour < 10) hour = "0" + hour;
    // round minutes down to last multiple of 5 for readability
    minute = Math.floor(minute/5)*5;
    if (minute < 10) minute = "0" + minute;
    // put it all together
    const today = hour + ":" + minute;
    // add to date picker
    // const dateControl = document.querySelector('input[type="time"]');
    // dateControl.value = today;
    return today;
  }

  // make date readable
  formatDate = (date) => {
    let hour = date.getHours();
    if (hour > 12) hour -= 12;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    minutes = minutes === 0 ? '' : `:${minutes}`;
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
    if (this.props.illness.records) {
      recordList = this.props.illness.records.map(record => {
        return (
          <li className="medRecord" key={record.id}>
            {record.info} at {this.formatDate(record.date)}
          </li>
        )
      })
    }
    return recordList;
  }

  render() {
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
          <a onClick={this.saveNewRecord}>add</a>
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
              placeholder="add note"
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
