import React, { Component } from 'react';
import './IllnessDisplay.css';


export class IllnessDisplay extends Component {
  state = {
    tempNewRecord: ''
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
          <li>
            <input
              className="addRecord"
              value={this.state.tempNewRecord}
              onChange={this.updateTempNewRecord}
              placeholder="add note"
            />
          <a onClick={this.saveNewRecord}>add</a>
          </li>
        </ul>
        <div className="editDelete">
          (<a>edit</a>)
        </div>
      </div>
    );
  }
}
