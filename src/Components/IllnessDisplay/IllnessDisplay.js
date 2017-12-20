import React, { Component } from 'react';
import './IllnessDisplay.css';


export class IllnessDisplay extends Component {
  state = {
    tempNewRecord: ''
  }

  componentDidMount() {
    this.setDate();
  }

  updateTempNewRecord = (event) => {
    this.setState({
      tempNewRecord: event.target.value
    })
  }

  saveNewRecord = () => {
    this.props.saveNewRecord(this.state.tempNewRecord, this.props.illness.id);
    this.setState({
      tempNewRecord: ''
    })
  }

  setDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (month < 10) month = "0" + month;
    // add one to month since javascript starts at 0
    month += 1;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    // round minutes down to last multiple of 5 for readability
    minute = Math.floor(minute/5)*5;
    if (minute < 10) minute = "0" + minute;
    // put it all together
    const today = year + "-" + month + "-" + day + "T" + hour + ":" + minute;
    // add to date picker
    const dateControl = document.querySelector('input[type="datetime-local"]');
    dateControl.value = today;
  }

  // make date readable
  formatDate = (date) => {
    const hour = ((date.getHours() + 11) % 12 + 1);
    let minutes = date.getMinutes();
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
              placeholder="add note"
            />
            <input
              type="datetime-local"
              name="recordDate"
              className="recordDate"
            />
            <a onClick={this.saveNewRecord}>add</a>
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
