import React, { Component } from 'react';
import './IllnessEditDisplay.css';


export class IllnessEditDisplay extends Component {

  setDate = (recordDate) => {
    const date = recordDate;
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

  setTime = (recordDate) => {
    const date = recordDate;
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

  updateRecordDateTime = (event, recordId) => {
    const date = document.getElementById(`${recordId}_date`).value;
    const time = document.getElementById(`${recordId}_time`).value;
    const dateTime = new Date(date + " " + time);
    this.props.updateRecordInfo(dateTime, 'date', this.props.illness.id, recordId);
  }

  // render list of records
  renderRecords = () => {
    let recordList;
    if (this.props.illness.records) {
      recordList = this.props.illness.records.map(record => {
        const date = this.setDate(record.date);
        const time = this.setTime(record.date);
        return (
          <li key={record.id} className="editRecord">
            <input
              className="medRecord"
              value={record.info}
              onChange={(event) => this.props.updateRecordInfo(event, 'name', this.props.illness.id, record.id)}
              />
            <a
              className="delRecord"
              onClick={() => this.props.deleteRecord(this.props.illness.id, record.id)}>
              del
            </a>
            <input
              type="date"
              name="recordDate"
              id={`${record.id}_date`}
              defaultValue={date}
              onChange={(event) => this.updateRecordDateTime(event, record.id)}
              />
            <input
              type="time"
              name="recordDate"
              id={`${record.id}_time`}
              defaultValue={time}
              onChange={(event) => this.updateRecordDateTime(event, record.id)}
              />
          </li>
        )
      })
    }
    return recordList;
  }

  render() {
    return (
      <div className="popup">
        <div className="MedEvent popup_inner editIllness">
          <input
            className="name"
            value={this.props.illness.name}
            onChange={(event) => this.props.updateIllnessName(event, this.props.illness.id)}
            />
          <ul>
            {this.renderRecords()}
          </ul>
          <div className="editDelete">
            <span>
              <button onClick={this.props.removeEditBox}>Done</button>
            </span>
            (<a onClick={() => this.props.deleteIllness(this.props.illness.id)}>
              delete {this.props.illness.name}
            </a>)
          </div>
        </div>
      </div>
    );
  }
}
